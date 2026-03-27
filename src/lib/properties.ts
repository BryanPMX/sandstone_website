import type { PropertyCard } from "@/types";

export const LISTINGS_MAP_PATH = "/listings/map";

export type PropertySearchPricePreset =
  | "any"
  | "0-250"
  | "250-500"
  | "500-750"
  | "750-plus";
export type PropertySearchCountPreset = "any" | "1" | "2" | "3" | "4";

export interface PropertySearchPresetFilters {
  pricePreset: PropertySearchPricePreset;
  bedsPreset: PropertySearchCountPreset;
  bathsPreset: PropertySearchCountPreset;
}

interface ListingsMapSearchQuery {
  search?: string | string[];
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
  "0-250",
  "250-500",
  "500-750",
  "750-plus",
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

export const PROPERTY_SEARCH_PRICE_OPTIONS: Array<{
  value: PropertySearchPricePreset;
  label: string;
}> = [
  { value: "any", label: "Price" },
  { value: "0-250", label: "Under $250k" },
  { value: "250-500", label: "$250k - $500k" },
  { value: "500-750", label: "$500k - $750k" },
  { value: "750-plus", label: "$750k+" },
];

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

function inferPricePresetFromNumericRange(
  minPrice?: number,
  maxPrice?: number
): PropertySearchPricePreset {
  if (minPrice === 0 && maxPrice === 250_000) {
    return "0-250";
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

  return "any";
}

export function resolvePresetFiltersToNumeric(
  filters: PropertySearchPresetFilters
): Pick<PropertySearchFilters, "minPrice" | "maxPrice" | "minBeds" | "minBaths"> {
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  switch (filters.pricePreset) {
    case "0-250":
      minPrice = 0;
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
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  filterPresets?: Partial<PropertySearchPresetFilters>;
}

export function buildListingsMapHref({
  search,
  centerLat,
  centerLng,
  radiusMiles,
  filterPresets,
}: BuildListingsMapHrefParams): string {
  const searchParams = new URLSearchParams();
  const resolvedPresets = {
    ...DEFAULT_PROPERTY_SEARCH_PRESET_FILTERS,
    ...filterPresets,
  };

  if (search?.trim()) {
    searchParams.set("search", search.trim());
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
  listingType?: "active" | "my";
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

function parsePriceToNumber(price: string): number | null {
  const normalized = price.replace(/[^\d.]/g, "");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
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
    if (listingType && property.sparkSource !== listingType) {
      return false;
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
