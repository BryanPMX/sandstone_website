import "server-only";

import { cache } from "react";
import type { PropertyCard, PropertyDetail } from "@/types";
import { getMslFeedUrl, getSparkListingsPageSize, hasSparkAccessToken } from "@/config";
import { fetchLegacyFeedPropertyCards } from "@/services/msl.service";
import {
  fetchAllActiveSparkPropertyCards,
  fetchActiveSparkPropertyCardsPage,
  fetchMySparkPropertyCards,
  fetchSparkPropertyCardById,
  fetchSparkPropertyDetailById,
} from "@/services/spark.service";

type ListingsTarget = "active" | "my";
type ListingsSource = "spark" | "legacy-feed" | "demo-fallback";
type ListingsFetchOptions = {
  fresh?: boolean;
};
type DetailLookupSourceHint = "active" | "my";
type ListingsResolution = {
  source: ListingsSource;
  properties: PropertyCard[];
  sparkError?: string;
  legacyError?: string;
};
type PaginatedListingsResolution = ListingsResolution & {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
};

export interface ListingsDiagnostics {
  target: ListingsTarget;
  source: ListingsSource;
  count: number;
  sample: Array<
    Pick<
      PropertyCard,
      "id" | "routeId" | "title" | "location" | "price" | "image" | "listingNumber"
    >
  >;
  sparkConfigured: boolean;
  legacyFeedConfigured: boolean;
  sparkError?: string;
  legacyError?: string;
}

export interface PaginatedPropertyCards {
  source: ListingsSource;
  properties: PropertyCard[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
  sparkError?: string;
  legacyError?: string;
}

const FALLBACK_PROPERTIES: PropertyCard[] = [
  {
    id: "demo-1",
    routeId: "demo-1",
    title: "Sunset Ridge Estate",
    location: "West El Paso · Franklin Mountains view",
    price: "$845,000",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    beds: 4,
    baths: 3.5,
    sqft: "3,950",
    featured: true,
  },
  {
    id: "demo-2",
    routeId: "demo-2",
    title: "Cimarron Canyon Modern",
    location: "Cimarron Canyon · El Paso",
    price: "$629,900",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    beds: 3,
    baths: 2.5,
    sqft: "2,780",
  },
  {
    id: "demo-3",
    routeId: "demo-3",
    title: "Mission Hills Haven",
    location: "Mission Hills · Downtown access",
    price: "$712,000",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
    beds: 4,
    baths: 3,
    sqft: "3,120",
  },
];

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

function mapFallbackCardToDetail(property: PropertyCard): PropertyDetail {
  return {
    ...property,
    images: [property.image],
    specs: {
      interiorFeatures: [
        "Spacious living room",
        "Modern kitchen",
        "Primary suite with walk-in closet",
        "Hardwood flooring",
      ],
      nearbySchools: [],
      mapAddress: `${property.title}, ${property.location}`,
    },
    metadataSections: [
      {
        title: "Overview",
        items: [
          { label: "Price", value: property.price },
          { label: "Location", value: property.location },
          ...(property.beds != null
            ? [{ label: "Bedrooms", value: String(property.beds) }]
            : []),
          ...(property.baths != null
            ? [{ label: "Bathrooms", value: String(property.baths) }]
            : []),
          ...(property.sqft ? [{ label: "Living Area", value: property.sqft }] : []),
        ],
      },
    ],
  };
}

function matchesPropertyIdentifier(property: PropertyCard, id: string): boolean {
  return property.routeId === id || property.id === id || property.listingNumber === id;
}

function isNumericIdentifier(id: string): boolean {
  return /^\d+$/.test(id.trim());
}

async function findSparkPropertyCardFromCollections(
  id: string,
  sourceHint?: DetailLookupSourceHint
): Promise<PropertyCard | null> {
  const targets: ListingsTarget[] = sourceHint
    ? [sourceHint, sourceHint === "active" ? "my" : "active"]
    : ["my", "active"];

  for (const target of targets) {
    const properties =
      target === "my"
        ? await fetchMyPropertyCards()
        : await fetchActivePropertyCards();

    const match = properties.find((property) => matchesPropertyIdentifier(property, id));

    if (match) {
      return match;
    }
  }

  return null;
}

async function fetchLegacyPropertyCardsOrFallback(
  options?: ListingsFetchOptions
): Promise<ListingsResolution> {
  if (getMslFeedUrl()) {
    try {
      return {
        source: "legacy-feed",
        properties: await fetchLegacyFeedPropertyCards(options),
      };
    } catch (error) {
      const legacyError = formatError(error);
      console.error("[Listings] Legacy feed failed, falling back.", error);

      return {
        source: "demo-fallback",
        properties: FALLBACK_PROPERTIES,
        legacyError,
      };
    }
  }

  return {
    source: "demo-fallback",
    properties: FALLBACK_PROPERTIES,
  };
}

async function resolvePropertyCards(
  target: ListingsTarget,
  options?: ListingsFetchOptions
): Promise<ListingsResolution> {
  if (hasSparkAccessToken()) {
    try {
      const properties =
        target === "active"
          ? await fetchAllActiveSparkPropertyCards(options)
          : await fetchMySparkPropertyCards(options);

      return {
        source: "spark",
        properties,
      };
    } catch (error) {
      const sparkError = formatError(error);
      console.error(
        `[Listings] ${target === "active" ? "Active" : "My"} Spark listings failed, falling back.`,
        error
      );

      const fallback = await fetchLegacyPropertyCardsOrFallback(options);

      return {
        ...fallback,
        sparkError,
      };
    }
  }

  return fetchLegacyPropertyCardsOrFallback(options);
}

function buildListingsDiagnostics(
  target: ListingsTarget,
  resolution: ListingsResolution
): ListingsDiagnostics {
  return {
    target,
    source: resolution.source,
    count: resolution.properties.length,
    sample: resolution.properties.slice(0, 3).map((property) => ({
      id: property.id,
      routeId: property.routeId,
      listingNumber: property.listingNumber,
      title: property.title,
      location: property.location,
      price: property.price,
      image: property.image,
    })),
    sparkConfigured: hasSparkAccessToken(),
    legacyFeedConfigured: Boolean(getMslFeedUrl()),
    sparkError: resolution.sparkError,
    legacyError: resolution.legacyError,
  };
}

function paginateProperties(
  properties: PropertyCard[],
  page: number,
  pageSize: number
): PaginatedListingsResolution {
  const safePageSize = Math.max(1, pageSize);
  const totalRows = properties.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;

  return {
    source: "demo-fallback",
    properties: properties.slice(startIndex, startIndex + safePageSize),
    currentPage,
    totalPages,
    totalRows,
    pageSize: safePageSize,
  };
}

async function fetchActivePropertyCardsUncached(): Promise<PropertyCard[]> {
  const resolution = await resolvePropertyCards("active");
  return resolution.properties;
}

async function fetchMyPropertyCardsUncached(): Promise<PropertyCard[]> {
  const resolution = await resolvePropertyCards("my");
  return resolution.properties;
}

async function fetchActivePropertyCardsPageUncached(
  page: number,
  options?: ListingsFetchOptions
): Promise<PaginatedPropertyCards> {
  const currentPage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;

  if (hasSparkAccessToken()) {
    try {
      const sparkPage = await fetchActiveSparkPropertyCardsPage(currentPage, options);

      return {
        source: "spark",
        properties: sparkPage.properties,
        currentPage: sparkPage.currentPage,
        totalPages: sparkPage.totalPages,
        totalRows: sparkPage.totalRows,
        pageSize: sparkPage.pageSize,
      };
    } catch (error) {
      const sparkError = formatError(error);
      console.error("[Listings] Active Spark listings page failed, retrying via full Spark feed.", error);

      try {
        const fullSparkProperties = await fetchAllActiveSparkPropertyCards(options);
        const paginatedSparkFallback = paginateProperties(
          fullSparkProperties,
          currentPage,
          getSparkListingsPageSize()
        );

        return {
          ...paginatedSparkFallback,
          source: "spark",
          sparkError,
        };
      } catch (fullFeedError) {
        console.error(
          "[Listings] Full active Spark feed failed after paged fetch error, falling back.",
          fullFeedError
        );
      }

      const fallback = await fetchLegacyPropertyCardsOrFallback(options);
      const paginatedFallback = paginateProperties(
        fallback.properties,
        currentPage,
        getSparkListingsPageSize()
      );

      return {
        ...paginatedFallback,
        source: fallback.source,
        sparkError,
        legacyError: fallback.legacyError,
      };
    }
  }

  const fallback = await fetchLegacyPropertyCardsOrFallback(options);
  const paginatedFallback = paginateProperties(
    fallback.properties,
    currentPage,
    getSparkListingsPageSize()
  );

  return {
    ...paginatedFallback,
    source: fallback.source,
    legacyError: fallback.legacyError,
  };
}

export async function inspectListingsTarget(
  target: ListingsTarget,
  options?: ListingsFetchOptions
): Promise<ListingsDiagnostics> {
  const resolution = await resolvePropertyCards(target, options);
  return buildListingsDiagnostics(target, resolution);
}

async function fetchPropertyCardByIdUncached(
  id: string,
  sparkId?: string,
  sourceHint?: DetailLookupSourceHint
): Promise<PropertyCard | null> {
  if (hasSparkAccessToken()) {
    if (sourceHint === "active" && isNumericIdentifier(id)) {
      try {
        const activeRouteProperty = await fetchSparkPropertyCardById(id, {
          preferredTarget: sourceHint,
          restrictToPreferredTarget: true,
          identifierHint: "listing-id",
        });

        if (activeRouteProperty) {
          return activeRouteProperty;
        }
      } catch (error) {
        console.error("[Listings] Active route-id lookup failed, retrying via spark id.", error);
      }
    }

    if (sparkId) {
      try {
        const hintedProperty = await fetchSparkPropertyCardById(sparkId, {
          preferredTarget: sourceHint,
          preferDirectLookup: true,
          restrictToPreferredTarget: Boolean(sourceHint),
          identifierHint: "spark-id",
        });

        if (hintedProperty) {
          return hintedProperty;
        }
      } catch (error) {
        console.error("[Listings] Spark hinted property lookup failed, retrying by route id.", error);
      }
    }

    try {
      const property = await fetchSparkPropertyCardById(id, {
        preferredTarget: sourceHint,
        restrictToPreferredTarget: Boolean(sourceHint),
        identifierHint: sourceHint === "active" && isNumericIdentifier(id)
          ? "listing-id"
          : undefined,
      });

      if (property) {
        return property;
      }
    } catch (error) {
      console.error("[Listings] Spark property lookup failed, falling back.", error);
    }

    if (sourceHint) {
      try {
        const unhintedProperty = await fetchSparkPropertyCardById(id);

        if (unhintedProperty) {
          return unhintedProperty;
        }
      } catch (error) {
        console.error("[Listings] Unhinted Spark property lookup failed, falling back.", error);
      }
    }

    const sparkFallbackProperty = await findSparkPropertyCardFromCollections(
      id,
      sourceHint
    );

    if (sparkFallbackProperty) {
      return sparkFallbackProperty;
    }

    if (sourceHint) {
      const unhintedSparkFallbackProperty = await findSparkPropertyCardFromCollections(id);

      if (unhintedSparkFallbackProperty) {
        return unhintedSparkFallbackProperty;
      }
    }
  }

  const fallback = await fetchLegacyPropertyCardsOrFallback();
  return fallback.properties.find((property) => matchesPropertyIdentifier(property, id)) ?? null;
}

async function fetchPropertyDetailByIdUncached(
  id: string,
  sparkId?: string,
  sourceHint?: DetailLookupSourceHint
): Promise<PropertyDetail | null> {
  if (hasSparkAccessToken()) {
    if (sourceHint === "active" && isNumericIdentifier(id)) {
      try {
        const activeRouteProperty = await fetchSparkPropertyDetailById(id, {
          preferredTarget: sourceHint,
          restrictToPreferredTarget: true,
          identifierHint: "listing-id",
        });

        if (activeRouteProperty) {
          return activeRouteProperty;
        }
      } catch (error) {
        console.error("[Listings] Active route-id detail lookup failed, retrying via spark id.", error);
      }
    }

    if (sparkId) {
      try {
        const hintedProperty = await fetchSparkPropertyDetailById(sparkId, {
          preferredTarget: sourceHint,
          preferDirectLookup: true,
          restrictToPreferredTarget: Boolean(sourceHint),
          identifierHint: "spark-id",
        });

        if (hintedProperty) {
          return hintedProperty;
        }
      } catch (error) {
        console.error("[Listings] Spark hinted detail lookup failed, retrying by route id.", error);
      }
    }

    try {
      const property = await fetchSparkPropertyDetailById(id, {
        preferredTarget: sourceHint,
        restrictToPreferredTarget: Boolean(sourceHint),
        identifierHint: sourceHint === "active" && isNumericIdentifier(id)
          ? "listing-id"
          : undefined,
      });

      if (property) {
        return property;
      }
    } catch (error) {
      console.error("[Listings] Spark property detail lookup failed, falling back.", error);
    }

    if (sourceHint) {
      try {
        const unhintedProperty = await fetchSparkPropertyDetailById(id);

        if (unhintedProperty) {
          return unhintedProperty;
        }
      } catch (error) {
        console.error("[Listings] Unhinted Spark property detail lookup failed, falling back.", error);
      }
    }

    const sparkFallbackProperty = await findSparkPropertyCardFromCollections(
      id,
      sourceHint
    );

    if (sparkFallbackProperty) {
      return mapFallbackCardToDetail(sparkFallbackProperty);
    }

    if (sourceHint) {
      const unhintedSparkFallbackProperty = await findSparkPropertyCardFromCollections(id);

      if (unhintedSparkFallbackProperty) {
        return mapFallbackCardToDetail(unhintedSparkFallbackProperty);
      }
    }
  }

  const fallback = await fetchLegacyPropertyCardsOrFallback();
  const property = fallback.properties.find((item) => matchesPropertyIdentifier(item, id));
  return property ? mapFallbackCardToDetail(property) : null;
}

export const fetchActivePropertyCards = cache(fetchActivePropertyCardsUncached);
export const fetchActivePropertyCardsPage = cache(fetchActivePropertyCardsPageUncached);
export const fetchMyPropertyCards = cache(fetchMyPropertyCardsUncached);
export const fetchPropertyCardById = cache(fetchPropertyCardByIdUncached);
export const fetchPropertyDetailById = cache(fetchPropertyDetailByIdUncached);
