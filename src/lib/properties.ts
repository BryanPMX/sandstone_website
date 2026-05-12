import type { PropertyCard } from "@/types";

export const LISTINGS_MAP_PATH = "/listings/map";
export const ALEJANDRO_GAMBOA_NAME = "alejandro gamboa";

export type PropertySearchPricePreset =
  | "any"
  | "under-150"
  | "150-250"
  | "250-500"
  | "500-750"
  | "750-plus"
  | "rent-under-1000"
  | "rent-1000-2500"
  | "rent-2500-5000"
  | "rent-5000-plus";
export type PropertySearchCountPreset = "any" | "1" | "2" | "3" | "4";
export type PropertySearchMarket = "el-paso" | "midland" | "odessa";

export interface PropertySearchPresetFilters {
  pricePreset: PropertySearchPricePreset;
  bedsPreset: PropertySearchCountPreset;
  bathsPreset: PropertySearchCountPreset;
}

interface ListingsMapSearchQuery {
  search?: string | string[];
  market?: string | string[];
  lat?: string | string[];
  lng?: string | string[];
  radiusMiles?: string | string[];
  price?: string | string[];
  beds?: string | string[];
  baths?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
}

export interface ParsedListingsMapSearchParams {
  searchQuery: string;
  market: PropertySearchMarket;
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  filterPresets: PropertySearchPresetFilters;
  numericFilters: Pick<
    PropertySearchFilters,
    "minPrice" | "maxPrice" | "minBeds" | "minBaths"
  >;
}

const PROPERTY_SEARCH_PRICE_PRESETS = new Set<PropertySearchPricePreset>([
  "any",
  "under-150",
  "150-250",
  "250-500",
  "500-750",
  "750-plus",
  "rent-under-1000",
  "rent-1000-2500",
  "rent-2500-5000",
  "rent-5000-plus",
]);
const PROPERTY_SEARCH_COUNT_PRESETS = new Set<PropertySearchCountPreset>([
  "any",
  "1",
  "2",
  "3",
  "4",
]);

export const DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS: PropertySearchPresetFilters = {
  pricePreset: "any",
  bedsPreset: "any",
  bathsPreset: "any",
};

export const DEFAULT_PROPERTY_SEARCH_MARKET: PropertySearchMarket = "el-paso";

export const PROPERTY_SEARCH_MARKET_OPTIONS: Array<{
  value: PropertySearchMarket;
  label: string;
}> = [
  { value: "el-paso", label: "El Paso" },
  { value: "midland", label: "Midland" },
  { value: "odessa", label: "Odessa" },
];

export const PROPERTY_SEARCH_PRICE_OPTIONS: Array<{
  value: PropertySearchPricePreset;
  label: string;
}> = [
  { value: "any", label: "Price" },
  { value: "under-150", label: "Less than $150,000" },
  { value: "150-250", label: "$150,000 - $250,000" },
  { value: "250-500", label: "$250k - $500k" },
  { value: "500-750", label: "$500k - $750k" },
  { value: "750-plus", label: "$750k+" },
];

export const PROPERTY_SEARCH_RENT_PRICE_OPTIONS: Array<{
  value: PropertySearchPricePreset;
  label: string;
}> = [
  { value: "any", label: "Price" },
  { value: "rent-under-1000", label: "Under $1,000" },
  { value: "rent-1000-2500", label: "$1,000 - $2,500" },
  { value: "rent-2500-5000", label: "$2,500 - $5,000" },
  { value: "rent-5000-plus", label: "$5,000+" },
];

export function getPropertySearchPriceOptions(listingType: "active" | "rental"): Array<{
  value: PropertySearchPricePreset;
  label: string;
}> {
  return listingType === "rental"
    ? PROPERTY_SEARCH_RENT_PRICE_OPTIONS
    : PROPERTY_SEARCH_PRICE_OPTIONS;
}

export const PROPERTY_SEARCH_BED_OPTIONS: Array<{
  value: PropertySearchCountPreset;
  label: string;
}> = [
  { value: "any", label: "Beds" },
  { value: "1", label: "1+ Beds" },
  { value: "2", label: "2+ Beds" },
  { value: "3", label: "3+ Beds" },
  { value: "4", label: "4+ Beds" },
];

export const PROPERTY_SEARCH_BATH_OPTIONS: Array<{
  value: PropertySearchCountPreset;
  label: string;
}> = [
  { value: "any", label: "Baths" },
  { value: "1", label: "1+ Baths" },
  { value: "2", label: "2+ Baths" },
  { value: "3", label: "3+ Baths" },
  { value: "4", label: "4+ Baths" },
];

function getFirstQueryValue(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseOptionalNumber(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function isPricePreset(value?: string): value is PropertySearchPricePreset {
  return value != null && PROPERTY_SEARCH_PRICE_PRESETS.has(value as PropertySearchPricePreset);
}

function isCountPreset(value?: string): value is PropertySearchCountPreset {
  return value != null && PROPERTY_SEARCH_COUNT_PRESETS.has(value as PropertySearchCountPreset);
}

function isPropertySearchMarket(value?: string | null): value is PropertySearchMarket {
  return value === "el-paso" || value === "midland" || value === "odessa";
}

export function resolvePropertySearchMarket(value?: string | null): PropertySearchMarket {
  return isPropertySearchMarket(value) ? value : DEFAULT_PROPERTY_SEARCH_MARKET;
}

const MIDLAND_ZIP_CODES = new Set([
  "79701",
  "79702",
  "79703",
  "79704",
  "79705",
  "79706",
  "79707",
  "79708",
  "79710",
  "79711",
]);

const ODESSA_ZIP_CODES = new Set([
  "79760",
  "79761",
  "79762",
  "79763",
  "79764",
  "79765",
  "79766",
  "79767",
  "79768",
  "79769",
]);

export function inferPropertySearchMarketFromInput(
  value: string
): PropertySearchMarket | null {
  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  if (normalized.includes("midland")) {
    return "midland";
  }

  if (normalized.includes("odessa")) {
    return "odessa";
  }

  if (normalized.includes("el paso") || normalized.includes("elpaso")) {
    return "el-paso";
  }

  const zipMatches = normalized.match(/\b\d{5}(?:-\d{4})?\b/g) ?? [];

  for (const zipMatch of zipMatches) {
    const zip = zipMatch.slice(0, 5);

    if (zip.startsWith("799") || zip.startsWith("885")) {
      return "el-paso";
    }

    if (ODESSA_ZIP_CODES.has(zip)) {
      return "odessa";
    }

    if (MIDLAND_ZIP_CODES.has(zip)) {
      return "midland";
    }

    if (zip.startsWith("797")) {
      const suffix = Number.parseInt(zip.slice(3), 10);

      if (suffix >= 60 && suffix <= 69) {
        return "odessa";
      }

      if (suffix >= 1 && suffix <= 8) {
        return "midland";
      }
    }
  }

  return null;
}

export function getPropertySearchMarketLabel(market: PropertySearchMarket): string {
  return (
    PROPERTY_SEARCH_MARKET_OPTIONS.find((option) => option.value === market)?.label ??
    PROPERTY_SEARCH_MARKET_OPTIONS[0].label
  );
}

function inferPricePresetFromNumericRange(
  minPrice?: number,
  maxPrice?: number
): PropertySearchPricePreset {
  if (minPrice === 0 && maxPrice === 150_000) {
    return "under-150";
  }

  if (minPrice === 150_000 && maxPrice === 250_000) {
    return "150-250";
  }

  if (minPrice === 250_000 && maxPrice === 500_000) {
    return "250-500";
  }

  if (minPrice === 500_000 && maxPrice === 750_000) {
    return "500-750";
  }

  if (minPrice === 750_000 && maxPrice == null) {
    return "750-plus";
  }

  if (minPrice === 0 && maxPrice === 1_000) {
    return "rent-under-1000";
  }

  if (minPrice === 1_000 && maxPrice === 2_500) {
    return "rent-1000-2500";
  }

  if (minPrice === 2_500 && maxPrice === 5_000) {
    return "rent-2500-5000";
  }

  if (minPrice === 5_000 && maxPrice == null) {
    return "rent-5000-plus";
  }

  return "any";
}

export function resolvePresetFiltersToNumeric(
  filters: PropertySearchPresetFilters
): Pick<PropertySearchFilters, "minPrice" | "maxPrice" | "minBeds" | "minBaths"> {
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  switch (filters.pricePreset) {
    case "under-150":
      minPrice = 0;
      maxPrice = 150_000;
      break;
    case "150-250":
      minPrice = 150_000;
      maxPrice = 250_000;
      break;
    case "250-500":
      minPrice = 250_000;
      maxPrice = 500_000;
      break;
    case "500-750":
      minPrice = 500_000;
      maxPrice = 750_000;
      break;
    case "750-plus":
      minPrice = 750_000;
      break;
    case "rent-under-1000":
      minPrice = 0;
      maxPrice = 1_000;
      break;
    case "rent-1000-2500":
      minPrice = 1_000;
      maxPrice = 2_500;
      break;
    case "rent-2500-5000":
      minPrice = 2_500;
      maxPrice = 5_000;
      break;
    case "rent-5000-plus":
      minPrice = 5_000;
      break;
    default:
      break;
  }

  const minBeds =
    filters.bedsPreset === "any"
      ? undefined
      : Number.parseInt(filters.bedsPreset, 10);
  const minBaths =
    filters.bathsPreset === "any"
      ? undefined
      : Number.parseInt(filters.bathsPreset, 10);

  return {
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
  };
}

export function parseListingsMapSearchParams(
  params: ListingsMapSearchQuery
): ParsedListingsMapSearchParams {
  const searchQuery = getFirstQueryValue(params.search)?.trim() ?? "";
  const market = resolvePropertySearchMarket(getFirstQueryValue(params.market));
  const centerLat = parseOptionalNumber(getFirstQueryValue(params.lat));
  const centerLng = parseOptionalNumber(getFirstQueryValue(params.lng));
  const radiusMiles = parseOptionalNumber(getFirstQueryValue(params.radiusMiles));
  const legacyMinPrice = parseOptionalNumber(getFirstQueryValue(params.minPrice));
  const legacyMaxPrice = parseOptionalNumber(getFirstQueryValue(params.maxPrice));
  const legacyBeds = parseOptionalNumber(getFirstQueryValue(params.beds));
  const legacyBaths = parseOptionalNumber(getFirstQueryValue(params.baths));
  const priceParam = getFirstQueryValue(params.price);
  const bedsParam = getFirstQueryValue(params.beds);
  const bathsParam = getFirstQueryValue(params.baths);

  const filterPresets: PropertySearchPresetFilters = {
    pricePreset: isPricePreset(priceParam)
      ? priceParam
      : inferPricePresetFromNumericRange(legacyMinPrice, legacyMaxPrice),
    bedsPreset: isCountPreset(bedsParam)
      ? bedsParam
      : DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bedsPreset,
    bathsPreset: isCountPreset(bathsParam)
      ? bathsParam
      : DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS.bathsPreset,
  };

  const presetNumericFilters = resolvePresetFiltersToNumeric(filterPresets);

  return {
    searchQuery,
    market,
    centerLat,
    centerLng,
    radiusMiles,
    filterPresets,
    numericFilters: {
      minPrice: presetNumericFilters.minPrice ?? legacyMinPrice,
      maxPrice: presetNumericFilters.maxPrice ?? legacyMaxPrice,
      minBeds: presetNumericFilters.minBeds ?? legacyBeds,
      minBaths: presetNumericFilters.minBaths ?? legacyBaths,
    },
  };
}

interface BuildListingsMapHrefParams {
  search?: string;
  market?: PropertySearchMarket;
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  filterPresets?: Partial<PropertySearchPresetFilters>;
  listingType?: "active" | "my" | "rental";
}

export function buildListingsMapHref({
  search,
  market,
  centerLat,
  centerLng,
  radiusMiles,
  filterPresets,
  listingType,
}: BuildListingsMapHrefParams): string {
  const searchParams = new URLSearchParams();
  const resolvedPresets = {
    ...DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
    ...filterPresets,
  };

  if (search?.trim()) {
    searchParams.set("search", search.trim());
  }

  if (market) {
    searchParams.set("market", market);
  }

  if (typeof centerLat === "number" && Number.isFinite(centerLat)) {
    searchParams.set("lat", String(centerLat));
  }

  if (typeof centerLng === "number" && Number.isFinite(centerLng)) {
    searchParams.set("lng", String(centerLng));
  }

  if (typeof radiusMiles === "number" && radiusMiles > 0) {
    searchParams.set("radiusMiles", String(radiusMiles));
  }

  if (listingType && listingType !== "active") {
    searchParams.set("listingType", listingType);
  }

  if (resolvedPresets.pricePreset !== "any") {
    searchParams.set("price", resolvedPresets.pricePreset);
  }

  if (resolvedPresets.bedsPreset !== "any") {
    searchParams.set("beds", resolvedPresets.bedsPreset);
  }

  if (resolvedPresets.bathsPreset !== "any") {
    searchParams.set("baths", resolvedPresets.bathsPreset);
  }

  const queryString = searchParams.toString();

  return queryString ? `${LISTINGS_MAP_PATH}?${queryString}` : LISTINGS_MAP_PATH;
}

/**
 * Basic text search helper for property cards. Keeps filtering logic out of pages/components.
 */
export function filterPropertyCards(
  properties: PropertyCard[],
  query: string
): PropertyCard[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return properties;

  return properties.filter((property) => {
    const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export interface PropertySearchFilters {
  search?: string;
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  listingType?: "active" | "my" | "rental";
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function getDistanceInMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parsePriceToNumber(price?: string): number | null {
  if (typeof price !== "string") {
    return null;
  }

  const normalized = price.replace(/[^\d.]/g, "");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isAlejandroListing(property: Pick<PropertyCard, "listingAgentName">): boolean {
  const agentName = property.listingAgentName;

  if (!agentName) {
    return false;
  }

  return normalizeName(agentName).includes(ALEJANDRO_GAMBOA_NAME);
}

export function resolvePropertyListingType(
  property: Pick<PropertyCard, "sparkSource" | "price">
): "active" | "rental" {
  const numericPrice = parsePriceToNumber(property.price);

  if (numericPrice != null && numericPrice < 10_000) {
    return "rental";
  }

  if (property.sparkSource === "rental") {
    return "rental";
  }

  if (property.sparkSource === "active") {
    return "active";
  }

  return "active";
}

/**
 * Advanced filtering helper that supports:
 * - Text search
 * - Radius filtering from a map center (in miles)
 * - Min/max price
 * - Minimum beds/baths
 */
export function filterPropertyCardsWithFilters(
  properties: PropertyCard[],
  filters: PropertySearchFilters
): PropertyCard[] {
  const {
    search,
    centerLat,
    centerLng,
    radiusMiles,
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
    listingType,
  } = filters;

  const hasRadiusFilter =
    typeof centerLat === "number" &&
    Number.isFinite(centerLat) &&
    typeof centerLng === "number" &&
    Number.isFinite(centerLng) &&
    typeof radiusMiles === "number" &&
    radiusMiles > 0;

  const normalizedQuery = search?.trim().toLowerCase() ?? "";

  return properties.filter((property) => {
    if (listingType) {
      if (listingType === "my") {
        if (property.sparkSource !== "my") {
          return false;
        }
      } else if (resolvePropertyListingType(property) !== listingType) {
        return false;
      }
    }

    if (hasRadiusFilter) {
      if (
        typeof property.latitude !== "number" ||
        !Number.isFinite(property.latitude) ||
        typeof property.longitude !== "number" ||
        !Number.isFinite(property.longitude)
      ) {
        return false;
      }

      const distance = getDistanceInMiles(
        centerLat as number,
        centerLng as number,
        property.latitude,
        property.longitude
      );

      if (distance > (radiusMiles as number)) {
        return false;
      }
    }

    if (typeof minBeds === "number") {
      const beds = property.beds ?? 0;
      if (beds < minBeds) {
        return false;
      }
    }

    if (typeof minBaths === "number") {
      const baths = property.baths ?? 0;
      if (baths < minBaths) {
        return false;
      }
    }

    if (typeof minPrice === "number" || typeof maxPrice === "number") {
      const numericPrice = parsePriceToNumber(property.price);
      if (numericPrice == null) {
        return false;
      }

      if (typeof minPrice === "number" && numericPrice < minPrice) {
        return false;
      }

      if (typeof maxPrice === "number" && numericPrice > maxPrice) {
        return false;
      }
    }

    if (normalizedQuery) {
      const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}
