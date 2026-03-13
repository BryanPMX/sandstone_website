import "server-only";

import type {
  PropertyCard,
  PropertyDetail,
  PropertyDetailSpecs,
  PropertyMetadataItem,
  PropertyMetadataSection,
} from "@/types";
import {
  getSparkAccessToken,
  getSparkActiveListingsFilter,
  getSparkApiBaseUrl,
  getSparkListingsPageSize,
  getSparkListingsPath,
  getSparkMyListingsFilter,
  getSparkMyListingsPath,
} from "@/config";

type UnknownRecord = Record<string, unknown>;
type PathSegment = string | number;
type SparkPagination = {
  currentPage?: number;
  totalPages?: number;
  totalRows?: number;
};
type SparkPropertyCardsPage = {
  properties: PropertyCard[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
};
type SparkLookupTarget = "active" | "my";
type SparkCollectionRequest = {
  path: string;
  filter?: string;
  page?: number;
  limit?: number;
  includePagination?: boolean;
  expand?: string[];
};
type SparkFetchOptions = {
  fresh?: boolean;
};
type SparkListingLookupOptions = SparkFetchOptions & {
  preferredTarget?: SparkLookupTarget;
  preferDirectLookup?: boolean;
  restrictToPreferredTarget?: boolean;
  identifierHint?: "listing-id" | "spark-id";
};

const SPARK_REVALIDATE_SECONDS = 300;
const REPLICATION_SPARK_API_BASE_URL = "https://replication.sparkapi.com";
const SPARK_MAX_API_PAGE_SIZE = 25;
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_LOCATION = "El Paso, TX";
const MAX_SPARK_PAGES = 400;
const COLLECTION_EXPANSIONS = ["PrimaryPhoto"];
// Some Spark accounts reject _expand on listing detail endpoints (Code 1053).
// Keep detail lookups expansion-free and enrich images via the /photos fallback.
const DETAIL_EXPANSIONS: string[] = [];
const PHOTO_URL_PATHS: PathSegment[][] = [
  ["Uri2048"],
  ["Uri1600"],
  ["Uri1280"],
  ["Uri1024"],
  ["Uri800"],
  ["Uri640"],
  ["Uri300"],
  ["UriLarge"],
  ["Uri"],
  ["MediaURL"],
  ["StandardFields", "Uri2048"],
  ["StandardFields", "Uri1600"],
  ["StandardFields", "Uri1280"],
  ["StandardFields", "Uri1024"],
  ["StandardFields", "Uri800"],
  ["StandardFields", "Uri640"],
  ["StandardFields", "Uri300"],
  ["StandardFields", "UriLarge"],
  ["StandardFields", "Uri"],
  ["StandardFields", "MediaURL"],
  ["url"],
  ["StandardFields", "url"],
];

function getRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function readPath(value: unknown, path: PathSegment[]): unknown {
  let current = value;

  for (const segment of path) {
    if (Array.isArray(current)) {
      const index =
        typeof segment === "number" ? segment : Number.parseInt(segment, 10);

      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        return undefined;
      }

      current = current[index];
      continue;
    }

    const record = getRecord(current);

    if (!record) {
      return undefined;
    }

    current = record[String(segment)];
  }

  return current;
}

function pickFirst(value: unknown, ...paths: PathSegment[][]): unknown {
  for (const path of paths) {
    const candidate = readPath(value, path);

    if (candidate !== undefined && candidate !== null) {
      return candidate;
    }
  }

  return undefined;
}

function asString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  }

  if (typeof value === "number" || typeof value === "bigint") {
    return String(value);
  }

  const record = getRecord(value);

  if (record) {
    return (
      asString(record.Value) ??
      asString(record.value) ??
      asString(record.Amount) ??
      asString(record.amount) ??
      asString(record.Text) ??
      asString(record.text)
    );
  }

  return undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/,/g, "").trim();

    if (!normalized) {
      return undefined;
    }

    const parsed = Number(normalized);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  const record = getRecord(value);

  if (record) {
    return (
      asNumber(record.Value) ??
      asNumber(record.value) ??
      asNumber(record.Amount) ??
      asNumber(record.amount)
    );
  }

  return undefined;
}

function formatPrice(value: unknown): string {
  const numeric = asNumber(value);

  if (numeric == null) {
    return asString(value) ?? "$—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numeric);
}

function formatSqft(value: unknown): string | undefined {
  const numeric = asNumber(value);

  if (numeric != null) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(numeric);
  }

  return asString(value);
}

function normalizeSparkImageUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  try {
    const url = new URL(trimmed);

    if (
      url.protocol === "http:" &&
      /(^|\.)spark(api|platform)\.com$/i.test(url.hostname)
    ) {
      url.protocol = "https:";
      return url.toString();
    }

    return url.toString();
  } catch {
    if (
      trimmed.startsWith("/") ||
      trimmed.startsWith("./") ||
      trimmed.startsWith("../") ||
      trimmed.includes("/")
    ) {
      try {
        return new URL(trimmed, getSparkApiBaseUrl()).toString();
      } catch {
        return trimmed;
      }
    }
  }

  return trimmed;
}

function buildSparkUrl({
  path,
  filter,
  page,
  limit,
  includePagination = false,
  expand = COLLECTION_EXPANSIONS,
}: SparkCollectionRequest): string {
  const baseUrl = new URL(getSparkApiBaseUrl());

  if (baseUrl.protocol !== "https:") {
    throw new Error("SPARK_API_BASE_URL must use https.");
  }

  const url = new URL(path, baseUrl);
  url.searchParams.set("_limit", String(resolveSparkRequestLimit(limit)));
  if (expand.length > 0) {
    url.searchParams.set("_expand", expand.join(","));
  }

  if (filter) {
    url.searchParams.set("_filter", filter);
  }

  if (includePagination) {
    url.searchParams.set("_pagination", "1");
  }

  if (page && page > 1) {
    url.searchParams.set("_page", String(page));
  }

  return url.toString();
}

function resolveSparkRequestLimit(limit?: number): number {
  const requested = limit ?? getSparkListingsPageSize();
  return Math.min(Math.max(1, requested), SPARK_MAX_API_PAGE_SIZE);
}

function buildSparkListingDetailPath(path: string, id: string): string {
  const basePath = path.replace(/\/$/, "");
  return `${basePath}/${encodeURIComponent(id)}`;
}

function getSparkPathForTarget(target: SparkLookupTarget): string {
  return target === "active" ? getSparkListingsPath() : getSparkMyListingsPath();
}

function getSparkLookupPaths(
  preferredTarget?: SparkLookupTarget,
  restrictToPreferredTarget = false
): string[] {
  if (preferredTarget && restrictToPreferredTarget) {
    return [getSparkPathForTarget(preferredTarget)];
  }

  const orderedTargets: SparkLookupTarget[] = preferredTarget
    ? [preferredTarget, preferredTarget === "active" ? "my" : "active"]
    : ["active", "my"];

  return [...new Set(orderedTargets.map(getSparkPathForTarget))];
}

function usesReplicationHost(url: string): boolean {
  return new URL(url).hostname === new URL(REPLICATION_SPARK_API_BASE_URL).hostname;
}

function rewriteSparkUrlBase(url: string, baseUrl: string): string {
  const current = new URL(url);
  const targetBase = new URL(baseUrl);

  current.protocol = targetBase.protocol;
  current.hostname = targetBase.hostname;
  current.port = targetBase.port;

  return current.toString();
}

function shouldRetryWithReplication(response: Response, bodyText: string, url: string): boolean {
  if (response.status !== 403 || usesReplicationHost(url)) {
    return false;
  }

  return bodyText.includes("\"Code\":1021") || bodyText.includes("replication.sparkapi.com");
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true" || normalized === "yes" || normalized === "1") {
      return true;
    }

    if (normalized === "false" || normalized === "no" || normalized === "0") {
      return false;
    }
  }

  return undefined;
}

function formatDate(value: unknown): string | undefined {
  const raw = asString(value);

  if (!raw) {
    return undefined;
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatMetadataValue(value: unknown): string | undefined {
  const stringValue = asString(value);

  if (stringValue) {
    return stringValue;
  }

  const numeric = asNumber(value);

  if (numeric != null) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(numeric);
  }

  const booleanValue = asBoolean(value);

  if (booleanValue != null) {
    return booleanValue ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => formatMetadataValue(item))
      .filter((item): item is string => Boolean(item));

    if (items.length > 0) {
      return items.join(", ");
    }

    return undefined;
  }

  const record = getRecord(value);

  if (!record) {
    return undefined;
  }

  const truthyKeys = Object.entries(record)
    .filter(([, item]) => asBoolean(item) === true)
    .map(([key]) => key.replace(/([a-z0-9])([A-Z])/g, "$1 $2"));

  if (truthyKeys.length > 0) {
    return truthyKeys.join(", ");
  }

  const pairs = Object.entries(record)
    .map(([key, item]) => {
      const formatted = formatMetadataValue(item);
      return formatted ? `${key}: ${formatted}` : undefined;
    })
    .filter((item): item is string => Boolean(item));

  return pairs.length > 0 ? pairs.join(", ") : undefined;
}

function titleizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractRecords(value: unknown): UnknownRecord[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => getRecord(item))
      .filter((item): item is UnknownRecord => Boolean(item));
  }

  const record = getRecord(value);

  if (!record) {
    return [];
  }

  const wrapped = getRecord(record.D);

  if (Array.isArray(record.D)) {
    return record.D
      .map((item) => getRecord(item))
      .filter((item): item is UnknownRecord => Boolean(item));
  }

  if (wrapped && Array.isArray(wrapped.Results)) {
    return wrapped.Results
      .map((item) => getRecord(item))
      .filter((item): item is UnknownRecord => Boolean(item));
  }

  if (Array.isArray(record.Results)) {
    return record.Results
      .map((item) => getRecord(item))
      .filter((item): item is UnknownRecord => Boolean(item));
  }

  if (Array.isArray(record.results)) {
    return record.results
      .map((item) => getRecord(item))
      .filter((item): item is UnknownRecord => Boolean(item));
  }

  return [record];
}

function addUniqueString(target: string[], value: string | undefined): void {
  if (!value || target.includes(value)) {
    return;
  }

  target.push(value);
}

function isLikelyImageUrl(value: string): boolean {
  const lower = value.toLowerCase();

  if (!/^https?:\/\//.test(lower)) {
    return false;
  }

  if (
    /\.(jpg|jpeg|png|webp|gif|avif|bmp|tiff)(\?|#|$)/i.test(lower) ||
    /\/(true|false)\//.test(lower) ||
    /\/cdn\.resize\.sparkplatform\.com\//.test(lower)
  ) {
    return true;
  }

  return false;
}

function addUniqueImageUrl(target: string[], value: string | undefined): void {
  if (!value || !isLikelyImageUrl(value)) {
    return;
  }

  addUniqueString(target, value);
}

function buildPhotoRecordKey(record: UnknownRecord, index: number): string {
  return (
    asString(
      pickFirst(
        record,
        ["Id"],
        ["StandardFields", "Id"],
        ["ResourceUri"],
        ["StandardFields", "ResourceUri"],
        ["Uri2048"],
        ["Uri1600"],
        ["Uri1280"],
        ["Uri1024"],
        ["Uri800"],
        ["Uri640"],
        ["Uri300"],
        ["UriLarge"],
        ["Uri"],
        ["MediaURL"],
        ["StandardFields", "Uri2048"],
        ["StandardFields", "Uri1600"],
        ["StandardFields", "Uri1280"],
        ["StandardFields", "Uri1024"],
        ["StandardFields", "Uri800"],
        ["StandardFields", "Uri640"],
        ["StandardFields", "Uri300"],
        ["StandardFields", "UriLarge"],
        ["StandardFields", "Uri"],
        ["StandardFields", "MediaURL"]
      )
    ) ?? `photo-${index}`
  );
}

function pickPreferredPhotoUrl(record: UnknownRecord): string | undefined {
  for (const path of PHOTO_URL_PATHS) {
    const normalized = normalizeSparkImageUrl(asString(readPath(record, path)));

    if (normalized && isLikelyImageUrl(normalized)) {
      return normalized;
    }
  }

  return undefined;
}

function extractResults(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  const root = getRecord(payload);
  const wrapped = getRecord(root?.D);
  const candidates = [
    wrapped?.Results,
    wrapped?.results,
    wrapped?.value,
    root?.Results,
    root?.results,
    root?.value,
    root?.D,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

function looksLikeSparkListingRecord(record: UnknownRecord): boolean {
  return [
    "ListingKey",
    "ListingId",
    "Id",
    "StandardFields",
    "UnparsedAddress",
    "PublicRemarks",
    "City",
    "ListPrice",
    "CurrentPrice",
    "MlsStatus",
    "Photos",
    "PrimaryPhoto",
  ].some((key) => record[key] != null);
}

function extractFirstSparkRecord(payload: unknown): UnknownRecord | null {
  const [firstResult] = extractResults(payload);
  const resultRecord = getRecord(firstResult);

  if (resultRecord) {
    return resultRecord;
  }

  const root = getRecord(payload);
  const wrapped = getRecord(root?.D);
  const candidates = [
    wrapped,
    root,
    getRecord(root?.result),
    getRecord(root?.value),
  ];

  for (const candidate of candidates) {
    if (candidate && looksLikeSparkListingRecord(candidate)) {
      return candidate;
    }
  }

  return null;
}

function extractPagination(payload: unknown): SparkPagination | undefined {
  const root = getRecord(payload);
  const wrapped = getRecord(root?.D);
  const pagination =
    getRecord(wrapped?.Pagination) ??
    getRecord(root?.Pagination) ??
    getRecord(root?.pagination);

  if (!pagination) {
    return undefined;
  }

  return {
    currentPage: asNumber(pagination.CurrentPage),
    totalPages: asNumber(pagination.TotalPages),
    totalRows: asNumber(pagination.TotalRows),
  };
}

function buildTitle(record: UnknownRecord, id: string): string {
  const address = asString(
    pickFirst(
      record,
      ["UnparsedAddress"],
      ["StandardFields", "UnparsedAddress"],
      ["Address", "FullStreetAddress"]
    )
  );

  if (address) {
    return address;
  }

  const remarks = asString(
    pickFirst(record, ["PublicRemarks"], ["StandardFields", "PublicRemarks"])
  );

  if (remarks) {
    return remarks.slice(0, 80);
  }

  return `Listing ${id}`;
}

function buildLocation(record: UnknownRecord): string {
  const city = asString(pickFirst(record, ["City"], ["StandardFields", "City"]));
  const state = asString(
    pickFirst(record, ["StateOrProvince"], ["StandardFields", "StateOrProvince"])
  );

  const location = [city, state].filter(Boolean).join(", ");

  if (location) {
    return location;
  }

  return (
    asString(
      pickFirst(
        record,
        ["CountyOrParish"],
        ["StandardFields", "CountyOrParish"],
        ["PostalCity"]
      )
    ) ?? DEFAULT_LOCATION
  );
}

function buildListingInternalId(record: UnknownRecord, index: number): string {
  return (
    asString(
      pickFirst(
        record,
        ["ListingKey"],
        ["StandardFields", "ListingKey"],
        ["Id"],
        ["StandardFields", "Id"],
        ["ListingId"],
        ["StandardFields", "ListingId"],
        ["id"]
      )
    ) ?? `spark-${index}`
  );
}

function buildSparkDirectLookupId(record: UnknownRecord): string | undefined {
  return asString(
    pickFirst(
      record,
      ["Id"],
      ["StandardFields", "Id"],
      ["ListingKey"],
      ["StandardFields", "ListingKey"],
      ["ListingId"],
      ["StandardFields", "ListingId"],
      ["id"]
    )
  );
}

function buildListingNumber(record: UnknownRecord): string | undefined {
  return asString(
    pickFirst(
      record,
      ["ListingId"],
      ["StandardFields", "ListingId"]
    )
  );
}

function buildListingRouteId(record: UnknownRecord, internalId: string): string {
  return buildListingNumber(record) ?? internalId;
}

function joinNameParts(
  firstName: string | undefined,
  lastName: string | undefined
): string | undefined {
  const combined = [firstName, lastName].filter(Boolean).join(" ").trim();
  return combined || undefined;
}

function buildListingAgentName(record: UnknownRecord): string | undefined {
  const directName = asString(
    pickFirst(
      record,
      ["ListAgentFullName"],
      ["StandardFields", "ListAgentFullName"],
      ["ListAgentName"],
      ["StandardFields", "ListAgentName"],
      ["ListingAgentName"],
      ["StandardFields", "ListingAgentName"],
      ["ListAgent", "FullName"],
      ["StandardFields", "ListAgent", "FullName"],
      ["ListAgent", "MemberFullName"],
      ["StandardFields", "ListAgent", "MemberFullName"],
      ["ListAgent", "Name"],
      ["StandardFields", "ListAgent", "Name"],
      ["ListAgent", "MemberName"],
      ["StandardFields", "ListAgent", "MemberName"]
    )
  );

  if (directName) {
    return directName;
  }

  const firstName = asString(
    pickFirst(
      record,
      ["ListAgentFirstName"],
      ["StandardFields", "ListAgentFirstName"],
      ["ListingAgentFirstName"],
      ["StandardFields", "ListingAgentFirstName"],
      ["ListAgent", "FirstName"],
      ["StandardFields", "ListAgent", "FirstName"],
      ["ListAgent", "MemberFirstName"],
      ["StandardFields", "ListAgent", "MemberFirstName"]
    )
  );
  const lastName = asString(
    pickFirst(
      record,
      ["ListAgentLastName"],
      ["StandardFields", "ListAgentLastName"],
      ["ListingAgentLastName"],
      ["StandardFields", "ListingAgentLastName"],
      ["ListAgent", "LastName"],
      ["StandardFields", "ListAgent", "LastName"],
      ["ListAgent", "MemberLastName"],
      ["StandardFields", "ListAgent", "MemberLastName"]
    )
  );

  const fullNameFromParts = joinNameParts(firstName, lastName);
  if (fullNameFromParts) {
    return fullNameFromParts;
  }

  return asString(
    pickFirst(
      record,
      ["CoListAgentFullName"],
      ["StandardFields", "CoListAgentFullName"],
      ["ListOfficeContactName"],
      ["StandardFields", "ListOfficeContactName"]
    )
  );
}

function extractImageUrls(record: UnknownRecord): string[] {
  const images: string[] = [];

  for (const directPath of [
    ["PrimaryPhotoUri"],
    ["PrimaryPhoto", "Uri1600"],
    ["PrimaryPhoto", "Uri1280"],
    ["PrimaryPhoto", "Uri1024"],
    ["PrimaryPhoto", "Uri800"],
    ["PrimaryPhoto", "Uri640"],
    ["PrimaryPhoto", "UriLarge"],
    ["PrimaryPhoto", "Uri"],
    ["PrimaryPhoto", "Results", 0, "Uri1600"],
    ["PrimaryPhoto", "Results", 0, "Uri1280"],
    ["PrimaryPhoto", "Results", 0, "Uri1024"],
    ["PrimaryPhoto", "Results", 0, "Uri800"],
    ["PrimaryPhoto", "Results", 0, "Uri640"],
    ["PrimaryPhoto", "Results", 0, "UriLarge"],
    ["PrimaryPhoto", "Results", 0, "Uri"],
    ["Photos", 0, "Uri1600"],
    ["Photos", 0, "Uri1280"],
    ["Photos", 0, "Uri1024"],
    ["Photos", 0, "Uri800"],
    ["Photos", 0, "Uri640"],
    ["Photos", 0, "UriLarge"],
    ["Photos", 0, "Uri"],
    ["Photos", "Results", 0, "Uri1600"],
    ["Photos", "Results", 0, "Uri1280"],
    ["Photos", "Results", 0, "Uri1024"],
    ["Photos", "Results", 0, "Uri800"],
    ["Photos", "Results", 0, "Uri640"],
    ["Photos", "Results", 0, "UriLarge"],
    ["Photos", "Results", 0, "Uri"],
    ["Media", 0, "MediaURL"],
    ["image", "url"],
    ["photo"],
  ] as PathSegment[][]) {
    addUniqueImageUrl(
      images,
      normalizeSparkImageUrl(asString(readPath(record, directPath)))
    );
  }

  const seenPhotoKeys = new Set<string>();

  for (const collection of [
    pickFirst(record, ["Photos"]),
    pickFirst(record, ["Photos", "D", "Results"]),
    pickFirst(record, ["Photos", "Results"]),
    pickFirst(record, ["PrimaryPhoto"]),
    pickFirst(record, ["PrimaryPhoto", "D", "Results"]),
    pickFirst(record, ["PrimaryPhoto", "Results"]),
    pickFirst(record, ["StandardFields", "Photos"]),
    pickFirst(record, ["StandardFields", "Photos", "D", "Results"]),
    pickFirst(record, ["StandardFields", "Photos", "Results"]),
    pickFirst(record, ["Media"]),
    pickFirst(record, ["Media", "D", "Results"]),
    pickFirst(record, ["Media", "Results"]),
  ]) {
    extractRecords(collection).forEach((item, index) => {
      const photoKey = buildPhotoRecordKey(item, index);

      if (seenPhotoKeys.has(photoKey)) {
        return;
      }

      seenPhotoKeys.add(photoKey);
      addUniqueImageUrl(images, pickPreferredPhotoUrl(item));
    });
  }

  return images;
}

function extractImage(record: UnknownRecord): string {
  return extractImageUrls(record)[0] ?? FALLBACK_IMAGE;
}

function extractImageUrlsFromPayload(payload: unknown): string[] {
  const urls: string[] = [];
  const seenPhotoKeys = new Set<string>();

  extractResults(payload).forEach((item, index) => {
    const record = getRecord(item);

    if (!record) {
      return;
    }

    const photoKey = buildPhotoRecordKey(record, index);

    if (seenPhotoKeys.has(photoKey)) {
      return;
    }

    seenPhotoKeys.add(photoKey);
    addUniqueImageUrl(urls, pickPreferredPhotoUrl(record));
  });

  return urls;
}

function mapSparkListing(
  item: unknown,
  index: number,
  sparkSource?: SparkLookupTarget
): PropertyCard {
  const record = getRecord(item) ?? {};
  const id = buildListingInternalId(record, index);
  const sparkId = buildSparkDirectLookupId(record) ?? id;
  const listingNumber = buildListingNumber(record);
  const routeId = buildListingRouteId(record, id);

  return {
    id,
    routeId,
    sparkId,
    sparkSource,
    listingNumber,
    listingAgentName: buildListingAgentName(record),
    title: buildTitle(record, routeId),
    location: buildLocation(record),
    mapAddress: asString(
      pickFirst(
        record,
        ["UnparsedAddress"],
        ["StandardFields", "UnparsedAddress"],
        ["Address", "FullStreetAddress"]
      )
    ),
    latitude: asNumber(
      pickFirst(record, ["Latitude"], ["StandardFields", "Latitude"])
    ),
    longitude: asNumber(
      pickFirst(record, ["Longitude"], ["StandardFields", "Longitude"])
    ),
    price: formatPrice(
      pickFirst(
        record,
        ["ListPrice"],
        ["CurrentPrice"],
        ["StandardFields", "ListPrice"],
        ["price"]
      )
    ),
    image: extractImage(record),
    beds: asNumber(
      pickFirst(
        record,
        ["BedroomsTotal"],
        ["Bedrooms"],
        ["Beds"],
        ["BedsTotal"],
        ["BedsTotalInteger"],
        ["StandardFields", "Bedrooms"],
        ["StandardFields", "Beds"],
        ["StandardFields", "BedroomsTotal"],
        ["StandardFields", "BedsTotal"],
        ["StandardFields", "BedsTotalInteger"]
      )
    ),
    baths: asNumber(
      pickFirst(
        record,
        ["BathroomsTotalDecimal"],
        ["BathroomsTotal"],
        ["BathroomsTotalInteger"],
        ["BathsFull"],
        ["FullBaths"],
        ["BathsTotal"],
        ["Baths"],
        ["StandardFields", "BathroomsTotalDecimal"],
        ["StandardFields", "BathroomsTotal"],
        ["StandardFields", "BathroomsTotalInteger"],
        ["StandardFields", "BathsTotal"],
        ["StandardFields", "Baths"],
        ["StandardFields", "BathsFull"],
        ["StandardFields", "FullBaths"]
      )
    ),
    sqft: formatSqft(
      pickFirst(
        record,
        ["BuildingAreaTotal"],
        ["BuildingArea"],
        ["LivingArea"],
        ["AboveGradeFinishedArea"],
        ["BuildingAreaUnits", "Value"],
        ["TotalFinishedArea"],
        ["TotalArea"],
        ["SquareFootage"],
        ["StandardFields", "BuildingAreaTotal"],
        ["StandardFields", "BuildingArea"],
        ["StandardFields", "LivingArea"],
        ["StandardFields", "AboveGradeFinishedArea"],
        ["StandardFields", "TotalFinishedArea"],
        ["StandardFields", "TotalArea"],
        ["StandardFields", "SquareFootage"]
      )
    ),
    featured: index < 4,
  };
}

type MetadataFieldSpec = {
  label: string;
  paths: PathSegment[][];
  format?: (value: unknown) => string | undefined;
};

function buildMetadataItem(
  record: UnknownRecord,
  spec: MetadataFieldSpec
): PropertyMetadataItem | null {
  const value = pickFirst(record, ...spec.paths);
  const formatted = spec.format ? spec.format(value) : formatMetadataValue(value);

  if (!formatted) {
    return null;
  }

  return {
    label: spec.label,
    value: formatted,
  };
}

function buildMetadataSection(
  title: string,
  specs: MetadataFieldSpec[],
  record: UnknownRecord
): PropertyMetadataSection | null {
  const items = specs
    .map((spec) => buildMetadataItem(record, spec))
    .filter((item): item is PropertyMetadataItem => Boolean(item));

  if (items.length === 0) {
    return null;
  }

  return { title, items };
}

function buildAdditionalMetadataSection(record: UnknownRecord): PropertyMetadataSection | null {
  const excludedKeys = new Set([
    "Photos",
    "PrimaryPhoto",
    "Media",
    "Videos",
    "VirtualTours",
    "OpenHouses",
    "Documents",
    "Rooms",
    "Units",
    "CustomFields",
    "D",
    "image",
    "photo",
    "PrimaryPhotoUri",
    "PublicRemarks",
  ]);
  const items: PropertyMetadataItem[] = [];
  const seenLabels = new Set<string>();

  for (const source of [record, getRecord(record.StandardFields)]) {
    if (!source) {
      continue;
    }

    for (const [key, value] of Object.entries(source)) {
      if (excludedKeys.has(key)) {
        continue;
      }

      const formatted = formatMetadataValue(value);

      if (!formatted) {
        continue;
      }

      const label = titleizeKey(key);

      if (seenLabels.has(label)) {
        continue;
      }

      seenLabels.add(label);
      items.push({ label, value: formatted });
    }
  }

  if (items.length === 0) {
    return null;
  }

  items.sort((left, right) => left.label.localeCompare(right.label));

  return {
    title: "Additional MLS Data",
    items,
  };
}

function normalizeSpecListEntry(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractSpecList(
  value: unknown,
  options?: { split?: boolean }
): string[] {
  const splitValues = options?.split ?? true;

  if (Array.isArray(value)) {
    return value.flatMap((item) => extractSpecList(item, { split: splitValues }));
  }

  const text = asString(value) ?? formatMetadataValue(value);

  if (!text) {
    return [];
  }

  const items = splitValues ? text.split(/[,;|]/g) : [text];

  return items
    .map((item) => normalizeSpecListEntry(item))
    .filter((item) => item.length > 0);
}

function pushUniqueValues(target: string[], values: string[]): void {
  for (const value of values) {
    if (!target.includes(value)) {
      target.push(value);
    }
  }
}

function buildPropertyDetailSpecs(
  record: UnknownRecord,
  card: PropertyCard
): PropertyDetailSpecs {
  const interiorFeatures: string[] = [];

  for (const source of [
    pickFirst(record, ["InteriorFeatures"], ["StandardFields", "InteriorFeatures"]),
    pickFirst(record, ["Appliances"], ["StandardFields", "Appliances"]),
    pickFirst(record, ["Flooring"], ["StandardFields", "Flooring"]),
    pickFirst(record, ["LaundryFeatures"], ["StandardFields", "LaundryFeatures"]),
  ]) {
    pushUniqueValues(interiorFeatures, extractSpecList(source));
  }

  if (asBoolean(pickFirst(record, ["FireplaceYN"], ["StandardFields", "FireplaceYN"]))) {
    pushUniqueValues(interiorFeatures, ["Fireplace"]);
  }

  if (asBoolean(pickFirst(record, ["CoolingYN"], ["StandardFields", "CoolingYN"]))) {
    pushUniqueValues(interiorFeatures, ["Central air conditioning"]);
  }

  const nearbySchools: string[] = [];
  for (const source of [
    pickFirst(record, ["ElementarySchool"], ["StandardFields", "ElementarySchool"]),
    pickFirst(record, ["MiddleOrJuniorSchool"], ["StandardFields", "MiddleOrJuniorSchool"]),
    pickFirst(record, ["HighSchool"], ["StandardFields", "HighSchool"]),
  ]) {
    pushUniqueValues(nearbySchools, extractSpecList(source, { split: false }));
  }

  const mapAddress = asString(
    pickFirst(
      record,
      ["UnparsedAddress"],
      ["StandardFields", "UnparsedAddress"],
      ["Address", "FullStreetAddress"]
    )
  ) ?? `${card.title}, ${card.location}`;

  return {
    interiorFeatures: interiorFeatures.slice(0, 12),
    nearbySchools: nearbySchools.slice(0, 6),
    mapAddress,
    latitude: asNumber(
      pickFirst(record, ["Latitude"], ["StandardFields", "Latitude"])
    ),
    longitude: asNumber(
      pickFirst(record, ["Longitude"], ["StandardFields", "Longitude"])
    ),
    listingAgentName: buildListingAgentName(record),
    listingAgentPhone: asString(
      pickFirst(
        record,
        ["ListAgentDirectPhone"],
        ["StandardFields", "ListAgentDirectPhone"],
        ["ListAgentPreferredPhone"],
        ["StandardFields", "ListAgentPreferredPhone"],
        ["ListOfficePhone"],
        ["StandardFields", "ListOfficePhone"]
      )
    ),
    listingAgentEmail: asString(
      pickFirst(
        record,
        ["ListAgentEmail"],
        ["StandardFields", "ListAgentEmail"],
        ["ListOfficeEmail"],
        ["StandardFields", "ListOfficeEmail"]
      )
    ),
  };
}

function mapSparkPropertyDetail(item: unknown): PropertyDetail | null {
  const record = getRecord(item);

  if (!record) {
    return null;
  }

  const card = mapSparkListing(record, 0);
  const description = asString(
    pickFirst(record, ["PublicRemarks"], ["StandardFields", "PublicRemarks"])
  );

  const sections = [
    buildMetadataSection(
      "Overview",
      [
        {
          label: "MLS Number",
          paths: [["ListingId"], ["StandardFields", "ListingId"]],
        },
        {
          label: "Status",
          paths: [["MlsStatus"], ["StandardFields", "MlsStatus"]],
        },
        {
          label: "Property Type",
          paths: [["PropertyType"], ["StandardFields", "PropertyType"]],
        },
        {
          label: "Property Subtype",
          paths: [["PropertySubType"], ["StandardFields", "PropertySubType"]],
        },
        {
          label: "Year Built",
          paths: [["YearBuilt"], ["StandardFields", "YearBuilt"]],
        },
        {
          label: "Stories",
          paths: [["StoriesTotal"], ["Stories"], ["StandardFields", "StoriesTotal"]],
        },
        {
          label: "Days on Market",
          paths: [["DaysOnMarket"], ["StandardFields", "DaysOnMarket"]],
        },
        {
          label: "List Date",
          paths: [["ListDate"], ["ListingContractDate"], ["StandardFields", "ListDate"]],
          format: formatDate,
        },
      ],
      record
    ),
    buildMetadataSection(
      "Interior",
      [
        {
          label: "Bedrooms",
          paths: [["BedroomsTotal"], ["BedsTotal"], ["StandardFields", "BedroomsTotal"]],
        },
        {
          label: "Bathrooms",
          paths: [
            ["BathroomsTotalDecimal"],
            ["BathroomsTotalInteger"],
            ["BathsTotal"],
            ["StandardFields", "BathroomsTotalDecimal"],
          ],
        },
        {
          label: "Half Bathrooms",
          paths: [["BathroomsHalf"], ["StandardFields", "BathroomsHalf"]],
        },
        {
          label: "Living Area",
          paths: [["LivingArea"], ["BuildingAreaTotal"], ["StandardFields", "LivingArea"]],
          format: formatSqft,
        },
        {
          label: "Interior Features",
          paths: [["InteriorFeatures"], ["StandardFields", "InteriorFeatures"]],
        },
        {
          label: "Appliances",
          paths: [["Appliances"], ["StandardFields", "Appliances"]],
        },
        {
          label: "Fireplace",
          paths: [["FireplaceYN"], ["StandardFields", "FireplaceYN"]],
          format: formatMetadataValue,
        },
      ],
      record
    ),
    buildMetadataSection(
      "Exterior & Lot",
      [
        {
          label: "Lot Size (sq ft)",
          paths: [
            ["LotSizeSquareFeet"],
            ["StandardFields", "LotSizeSquareFeet"],
            ["LotSizeArea"],
          ],
          format: formatSqft,
        },
        {
          label: "Lot Size (acres)",
          paths: [["LotSizeAcres"], ["StandardFields", "LotSizeAcres"]],
        },
        {
          label: "Garage Spaces",
          paths: [["GarageSpaces"], ["StandardFields", "GarageSpaces"]],
        },
        {
          label: "Parking",
          paths: [["ParkingTotal"], ["ParkingFeatures"], ["StandardFields", "ParkingTotal"]],
        },
        {
          label: "Exterior Features",
          paths: [["ExteriorFeatures"], ["StandardFields", "ExteriorFeatures"]],
        },
        {
          label: "Pool",
          paths: [["PoolFeatures"], ["PoolPrivateYN"], ["StandardFields", "PoolFeatures"]],
          format: formatMetadataValue,
        },
        {
          label: "Construction",
          paths: [["ConstructionMaterials"], ["StandardFields", "ConstructionMaterials"]],
        },
        {
          label: "Roof",
          paths: [["Roof"], ["StandardFields", "Roof"]],
        },
      ],
      record
    ),
    buildMetadataSection(
      "Utilities",
      [
        {
          label: "Heating",
          paths: [["Heating"], ["HeatingYN"], ["StandardFields", "Heating"]],
          format: formatMetadataValue,
        },
        {
          label: "Cooling",
          paths: [["Cooling"], ["CoolingYN"], ["StandardFields", "Cooling"]],
          format: formatMetadataValue,
        },
        {
          label: "Utilities",
          paths: [["Utilities"], ["StandardFields", "Utilities"]],
        },
        {
          label: "Water",
          paths: [["WaterSource"], ["StandardFields", "WaterSource"]],
        },
        {
          label: "Sewer",
          paths: [["Sewer"], ["StandardFields", "Sewer"]],
        },
      ],
      record
    ),
    buildMetadataSection(
      "Listing Info",
      [
        {
          label: "List Office",
          paths: [["ListOfficeName"], ["StandardFields", "ListOfficeName"]],
        },
        {
          label: "List Agent",
          paths: [["ListAgentFullName"], ["StandardFields", "ListAgentFullName"]],
        },
        {
          label: "Subdivision",
          paths: [["SubdivisionName"], ["StandardFields", "SubdivisionName"]],
        },
        {
          label: "Elementary School",
          paths: [["ElementarySchool"], ["StandardFields", "ElementarySchool"]],
        },
        {
          label: "Middle School",
          paths: [["MiddleOrJuniorSchool"], ["StandardFields", "MiddleOrJuniorSchool"]],
        },
        {
          label: "High School",
          paths: [["HighSchool"], ["StandardFields", "HighSchool"]],
        },
      ],
      record
    ),
    buildAdditionalMetadataSection(record),
  ].filter((section): section is PropertyMetadataSection => Boolean(section));

  const images = extractImageUrls(record);
  const resolvedImages = images.length > 0 ? images : [card.image];
  const primaryImage = resolvedImages[0] ?? card.image;

  return {
    ...card,
    image: primaryImage,
    description,
    images: resolvedImages,
    specs: buildPropertyDetailSpecs(record, card),
    metadataSections: sections,
  };
}

function getSparkHeaders(accessToken: string): HeadersInit {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

async function fetchSparkPayload(
  url: string,
  options?: SparkFetchOptions
): Promise<Response> {
  const accessToken = getSparkAccessToken();

  if (!accessToken) {
    throw new Error("SPARK_ACCESS_TOKEN is not set.");
  }

  const request: RequestInit & { next?: { revalidate: number } } = {
    headers: getSparkHeaders(accessToken),
  };

  if (options?.fresh) {
    request.cache = "no-store";
  } else {
    request.next = { revalidate: SPARK_REVALIDATE_SECONDS };
  }

  const response = await fetch(url, request);
  const responseText = response.status === 403 ? await response.clone().text() : "";

  if (shouldRetryWithReplication(response, responseText, url)) {
    const replicationUrl = rewriteSparkUrlBase(url, REPLICATION_SPARK_API_BASE_URL);
    return fetch(replicationUrl, request);
  }

  return response;
}

async function fetchSparkCollectionPage(
  request: SparkCollectionRequest,
  options?: SparkFetchOptions,
  sparkSource?: SparkLookupTarget
): Promise<{ properties: PropertyCard[]; pagination?: SparkPagination }> {
  const { results, pagination } = await fetchSparkResults(
    { ...request, includePagination: true },
    options
  );

  return {
    properties: results.map((result, index) => mapSparkListing(result, index, sparkSource)),
    pagination,
  };
}

async function fetchSparkResults(
  request: SparkCollectionRequest,
  options?: SparkFetchOptions
): Promise<{ results: unknown[]; pagination?: SparkPagination }> {
  const response = await fetchSparkPayload(buildSparkUrl(request), options);

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `[Spark] Collection request failed (${response.status}): ${responseText.slice(0, 400)}`
    );
  }

  const payload = (await response.json()) as unknown;
  return {
    results: extractResults(payload),
    pagination: extractPagination(payload),
  };
}

async function fetchAllSparkPropertyCards(
  path: string,
  filter?: string,
  options?: SparkFetchOptions,
  sparkSource?: SparkLookupTarget
): Promise<PropertyCard[]> {
  const requestPageSize = resolveSparkRequestLimit();
  const properties: PropertyCard[] = [];
  const seenIds = new Set<string>();
  let page = 1;
  let totalPages: number | undefined;

  while (page <= (totalPages ?? MAX_SPARK_PAGES)) {
    const { properties: pageProperties, pagination } =
      await fetchSparkCollectionPage({
        path,
        filter,
        page,
      }, options, sparkSource);

    for (const property of pageProperties) {
      if (seenIds.has(property.id)) {
        continue;
      }

      seenIds.add(property.id);
      properties.push(property);
    }

    totalPages = pagination?.totalPages ?? totalPages;

    const hasMorePages = totalPages
      ? page < totalPages
      : pageProperties.length === requestPageSize;

    if (!hasMorePages) {
      break;
    }

    page += 1;
  }

  return properties;
}

function buildIdentifierFilters(
  id: string,
  identifierHint?: SparkListingLookupOptions["identifierHint"]
): string[] {
  const trimmed = id.trim();

  if (!trimmed) {
    return [];
  }

  const escaped = trimmed.replace(/'/g, "''");

  if (identifierHint === "spark-id") {
    return [
      `StandardFields.Id Eq '${escaped}'`,
      `Id Eq '${escaped}'`,
      `StandardFields.ListingKey Eq '${escaped}'`,
      `ListingKey Eq '${escaped}'`,
    ];
  }

  if (identifierHint === "listing-id") {
    return [
      `StandardFields.ListingId Eq ${trimmed}`,
      `StandardFields.ListingId Eq '${escaped}'`,
      `ListingId Eq ${trimmed}`,
      `ListingId Eq '${escaped}'`,
    ];
  }

  if (/^\d+$/.test(trimmed)) {
    return [
      `StandardFields.ListingId Eq ${trimmed}`,
      `StandardFields.ListingId Eq '${escaped}'`,
      `ListingId Eq ${trimmed}`,
      `ListingId Eq '${escaped}'`,
      `StandardFields.Id Eq '${escaped}'`,
      `Id Eq '${escaped}'`,
      `StandardFields.ListingKey Eq '${escaped}'`,
      `ListingKey Eq '${escaped}'`,
    ];
  }

  return [
    `StandardFields.ListingKey Eq '${escaped}'`,
    `ListingKey Eq '${escaped}'`,
    `StandardFields.Id Eq '${escaped}'`,
    `Id Eq '${escaped}'`,
    `StandardFields.ListingId Eq '${escaped}'`,
    `ListingId Eq '${escaped}'`,
  ];
}

function isNumericRouteId(id: string): boolean {
  return /^\d+$/.test(id.trim());
}

async function fetchSparkListingRecordByDirectPath(
  id: string,
  options?: SparkListingLookupOptions,
  preferredTarget?: SparkLookupTarget
): Promise<UnknownRecord | null> {
  for (const path of getSparkLookupPaths(
    preferredTarget,
    options?.restrictToPreferredTarget ?? false
  )) {
    const response = await fetchSparkPayload(
      buildSparkUrl({
        path: buildSparkListingDetailPath(path, id),
        limit: 1,
        expand: DETAIL_EXPANSIONS,
      }),
      options
    );

    if (response.ok) {
      const payload = (await response.json()) as unknown;
      const record = extractFirstSparkRecord(payload);

      if (record) {
        return record;
      }

      continue;
    }

    if (response.status !== 404) {
      const responseText = await response.text();
      throw new Error(
        `[Spark] Listing request failed (${response.status}): ${responseText.slice(0, 400)}`
      );
    }
  }

  return null;
}

async function fetchSparkListingPhotosByDirectPath(
  id: string,
  options?: SparkListingLookupOptions,
  preferredTarget?: SparkLookupTarget
): Promise<string[]> {
  for (const path of getSparkLookupPaths(
    preferredTarget,
    options?.restrictToPreferredTarget ?? false
  )) {
    const response = await fetchSparkPayload(
      buildSparkUrl({
        path: `${path.replace(/\/$/, "")}/${encodeURIComponent(id)}/photos`,
        limit: 50,
        expand: [],
      }),
      options
    );

    if (response.ok) {
      const payload = (await response.json()) as unknown;
      const imageUrls = extractImageUrlsFromPayload(payload);

      if (imageUrls.length > 0) {
        return imageUrls;
      }

      continue;
    }

    if (response.status !== 404) {
      const responseText = await response.text();
      throw new Error(
        `[Spark] Photos request failed (${response.status}): ${responseText.slice(0, 400)}`
      );
    }
  }

  return [];
}

async function fetchSparkListingRecordByFilters(
  id: string,
  options?: SparkListingLookupOptions,
  preferredTarget?: SparkLookupTarget
): Promise<UnknownRecord | null> {
  for (const filter of buildIdentifierFilters(id, options?.identifierHint)) {
    const records = await Promise.all(
      getSparkLookupPaths(
        preferredTarget,
        options?.restrictToPreferredTarget ?? false
      ).map((path) =>
        fetchSparkListingRecord(
          {
            path,
            filter,
            limit: 1,
            expand: DETAIL_EXPANSIONS,
          },
          options
        )
      )
    );

    const match = records.find((record): record is UnknownRecord => Boolean(record));

    if (match) {
      return match;
    }
  }

  return null;
}

async function fetchSparkListingRecord(
  request: SparkCollectionRequest,
  options?: SparkFetchOptions
): Promise<UnknownRecord | null> {
  const { results } = await fetchSparkResults(request, options);
  return extractFirstSparkRecord(results) ?? null;
}

async function fetchSparkListingRecordByRouteId(
  id: string,
  options?: SparkListingLookupOptions
): Promise<UnknownRecord | null> {
  const normalizedId = id.trim();
  const numericRouteId = isNumericRouteId(normalizedId);
  const shouldTryDirectLookup = options?.preferDirectLookup || !numericRouteId;

  if (!normalizedId) {
    return null;
  }

  if (shouldTryDirectLookup) {
    const directPathRecord = await fetchSparkListingRecordByDirectPath(
      normalizedId,
      options,
      options?.preferredTarget
    );

    if (directPathRecord) {
      return directPathRecord;
    }
  }

  return fetchSparkListingRecordByFilters(
    normalizedId,
    options,
    options?.preferredTarget
  );
}

export async function fetchAllActiveSparkPropertyCards(
  options?: SparkFetchOptions
): Promise<PropertyCard[]> {
  return fetchAllSparkPropertyCards(
    getSparkListingsPath(),
    getSparkActiveListingsFilter(),
    options,
    "active"
  );
}

export async function fetchActiveSparkPropertyCardsPage(
  page: number,
  options?: SparkFetchOptions
): Promise<SparkPropertyCardsPage> {
  const requestedPage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const displayPageSize = getSparkListingsPageSize();
  const requestPageSize = resolveSparkRequestLimit();
  const path = getSparkListingsPath();
  const filter = getSparkActiveListingsFilter();

  let resolvedPage = requestedPage;

  while (true) {
    const offset = (resolvedPage - 1) * displayPageSize;
    const startingSparkPage = Math.floor(offset / requestPageSize) + 1;
    let skip = offset % requestPageSize;
    let sparkPage = startingSparkPage;
    let totalRows: number | undefined;
    let totalSparkPages: number | undefined;
    const properties: PropertyCard[] = [];

    while (
      properties.length < displayPageSize &&
      (totalSparkPages == null || sparkPage <= totalSparkPages)
    ) {
      const { properties: sparkPageProperties, pagination } = await fetchSparkCollectionPage(
        {
          path,
          filter,
          page: sparkPage,
        },
        options,
        "active"
      );

      totalRows = pagination?.totalRows ?? totalRows;
      totalSparkPages = pagination?.totalPages ?? totalSparkPages;

      const visibleProperties = skip > 0
        ? sparkPageProperties.slice(skip)
        : sparkPageProperties;

      properties.push(
        ...visibleProperties.slice(0, displayPageSize - properties.length)
      );

      const hasMoreSparkPages = totalSparkPages != null
        ? sparkPage < totalSparkPages
        : sparkPageProperties.length === requestPageSize;

      if (!hasMoreSparkPages) {
        break;
      }

      skip = 0;
      sparkPage += 1;
    }

    const totalPages = totalRows != null
      ? Math.max(1, Math.ceil(totalRows / displayPageSize))
      : properties.length < displayPageSize
        ? resolvedPage
        : resolvedPage + 1;
    const effectiveTotalRows = totalRows ?? (
      properties.length < displayPageSize
        ? offset + properties.length
        : offset + properties.length + 1
    );

    if (resolvedPage > totalPages) {
      resolvedPage = totalPages;
      continue;
    }

    return {
      properties,
      currentPage: resolvedPage,
      totalPages,
      totalRows: effectiveTotalRows,
      pageSize: displayPageSize,
    };
  }
}

export async function fetchMySparkPropertyCards(
  options?: SparkFetchOptions
): Promise<PropertyCard[]> {
  return fetchAllSparkPropertyCards(
    getSparkMyListingsPath(),
    getSparkMyListingsFilter(),
    options,
    "my"
  );
}

export async function fetchSparkPropertyCardById(
  id: string,
  options?: SparkListingLookupOptions
): Promise<PropertyCard | null> {
  const listing = await fetchSparkListingRecordByRouteId(id, options);
  return listing ? mapSparkListing(listing, 0, options?.preferredTarget) : null;
}

export async function fetchSparkPropertyDetailById(
  id: string,
  options?: SparkListingLookupOptions
): Promise<PropertyDetail | null> {
  const listing = await fetchSparkListingRecordByRouteId(id, options);

  if (!listing) {
    return null;
  }

  const detail = mapSparkPropertyDetail(listing);

  if (!detail) {
    return null;
  }

  if (detail.images.length > 1) {
    return detail;
  }

  const candidateIds = Array.from(
    new Set(
      [
        id,
        buildSparkDirectLookupId(listing),
        buildListingNumber(listing),
        buildListingInternalId(listing, 0),
      ].map((value) => value?.trim()).filter((value): value is string => Boolean(value))
    )
  );
  const supplementalImages: string[] = [];

  for (const candidateId of candidateIds) {
    try {
      const directRecord = await fetchSparkListingRecordByDirectPath(
        candidateId,
        {
          ...options,
          preferDirectLookup: true,
        },
        options?.preferredTarget
      );

      if (directRecord) {
        for (const image of extractImageUrls(directRecord)) {
          addUniqueString(supplementalImages, image);
        }
      }

      if (supplementalImages.length > 1) {
        break;
      }
    } catch (error) {
      console.error("[Spark] Direct detail lookup failed while collecting supplemental photos.", error);
    }

    try {
      const images = await fetchSparkListingPhotosByDirectPath(
        candidateId,
        options,
        options?.preferredTarget
      );

      for (const image of images) {
        addUniqueString(supplementalImages, image);
      }

      if (supplementalImages.length > 1) {
        break;
      }
    } catch (error) {
      console.error("[Spark] Photo endpoint lookup failed for listing detail.", error);
    }
  }

  if (supplementalImages.length === 0) {
    return detail;
  }

  const mergedImages: string[] = [];

  if (detail.image && detail.image !== FALLBACK_IMAGE) {
    addUniqueString(mergedImages, detail.image);
  }

  for (const image of supplementalImages) {
    addUniqueString(mergedImages, image);
  }

  if (mergedImages.length === 0) {
    addUniqueString(mergedImages, detail.image);
  }

  return {
    ...detail,
    image: mergedImages[0] ?? detail.image,
    images: mergedImages,
  };
}
