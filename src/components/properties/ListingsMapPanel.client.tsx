"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { type DivIcon, type LatLngBoundsExpression } from "leaflet";
import type { PropertyCard } from "@/types";
import { useSuperclusterMarkers } from "@/hooks/useSuperclusterMarkers";

const DEFAULT_CENTER: [number, number] = [31.7619, -106.485];
const DEFAULT_MAP_ZOOM = 11;
const SANDSTONE_SAND_GOLD_HEX = "#b79678";
const EL_PASO_BOUNDS: LatLngBoundsExpression = [
  [31.58, -106.72],
  [31.95, -106.23],
];

type MappableProperty = PropertyCard & { latitude: number; longitude: number };

function buildDetailHref(property: PropertyCard): string {
  const params = new URLSearchParams();

  if (property.sparkId) {
    params.set("sparkId", property.sparkId);
  }

  if (property.sparkSource) {
    params.set("src", property.sparkSource);
  }

  const query = params.toString();
  const basePath = `/listings/${encodeURIComponent(property.routeId)}`;

  return query ? `${basePath}?${query}` : basePath;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeExternalImageUrl(url: string): string | null {
  const trimmed = url.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const baseOrigin = typeof window !== "undefined"
      ? window.location.origin
      : "https://sandstone.local";
    const parsed = new URL(trimmed, baseOrigin);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

function createPriceMarkerIcon(price: string): DivIcon {
  const text = escapeHtml(price.length > 14 ? `${price.slice(0, 13)}...` : price);
  const width = Math.max(78, text.length * 8 + 22);

  const markerHtml = [
    `<div style=\"display:flex;flex-direction:column;align-items:center;\">`,
    `<div style=\"background:${SANDSTONE_SAND_GOLD_HEX};color:#fff;border-radius:999px;padding:6px 10px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;white-space:nowrap;min-width:${width}px;text-align:center;box-shadow:0 8px 20px -12px rgba(17,24,61,0.5);\">${text}</div>`,
    `<div style=\"width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid ${SANDSTONE_SAND_GOLD_HEX};margin-top:-1px;\"></div>`,
    `</div>`,
  ].join("");

  return L.divIcon({
    html: markerHtml,
    className: "sandstone-price-marker",
    iconSize: [width, 42],
    iconAnchor: [width / 2, 42],
    popupAnchor: [0, -34],
  });
}

function createClusterIcon(count: number): DivIcon {
  const diameter = count >= 100 ? 52 : count >= 30 ? 46 : 40;

  return L.divIcon({
    html: `<div style="height:${diameter}px;width:${diameter}px;border-radius:999px;background:${SANDSTONE_SAND_GOLD_HEX};border:2px solid #ffffff;color:#ffffff;display:flex;align-items:center;justify-content:center;font-family:Montserrat,Arial,sans-serif;font-weight:700;font-size:12px;box-shadow:0 10px 28px -16px rgba(17,24,61,0.6);">${count}</div>`,
    className: "sandstone-cluster-marker",
    iconSize: [diameter, diameter],
    iconAnchor: [diameter / 2, diameter / 2],
  });
}

interface MapViewportControllerProps {
  onViewportChange?: (viewport: {
    north: number;
    south: number;
    east: number;
    west: number;
    zoom: number;
  }) => void;
}

function MapViewportController({ onViewportChange }: MapViewportControllerProps) {
  const map = useMap();
  const hasInitializedViewRef = useRef(false);

  const emitViewport = useCallback(() => {
    if (!onViewportChange) {
      return;
    }

    const bounds = map.getBounds();
    onViewportChange({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
      zoom: map.getZoom(),
    });
  }, [map, onViewportChange]);

  useEffect(() => {
    map.setMaxBounds(EL_PASO_BOUNDS);
    map.setMinZoom(10);
    map.setMaxZoom(17);
    if (!hasInitializedViewRef.current) {
      hasInitializedViewRef.current = true;
      window.setTimeout(emitViewport, 0);
    }
  }, [emitViewport, map]);

  useMapEvents({
    moveend: emitViewport,
    zoomend: emitViewport,
  });

  return null;
}

interface ClusteredMarkersProps {
  mappableProperties: MappableProperty[];
  mapContextQuery?: Record<string, string | undefined>;
}

function ClusteredMarkers({ mappableProperties, mapContextQuery }: ClusteredMarkersProps) {
  const map = useMap();
  const { items, getClusterExpansionZoom } = useSuperclusterMarkers({
    map,
    markers: mappableProperties,
    radius: 64,
    maxZoom: 17,
    minPoints: 2,
    debounceMs: 300,
  });

  const markerIcons = useMemo(() => {
    const iconByPrice = new Map<string, DivIcon>();

    mappableProperties.forEach((property) => {
      if (!iconByPrice.has(property.price)) {
        iconByPrice.set(property.price, createPriceMarkerIcon(property.price));
      }
    });

    return iconByPrice;
  }, [mappableProperties]);

  const clusterIconByCount = useMemo(() => new Map<number, DivIcon>(), []);

  return (
    <>
      {items.map((item) => {
        if (item.type === "cluster") {
          const count = item.pointCount;
          const clusterId = item.id;
          let icon = clusterIconByCount.get(count);

          if (!icon) {
            icon = createClusterIcon(count);
            clusterIconByCount.set(count, icon);
          }

          return (
            <Marker
              key={`cluster-${clusterId}`}
              position={[item.latitude, item.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  const expansionZoom = getClusterExpansionZoom(clusterId);
                  map.setView([item.latitude, item.longitude], Math.min(expansionZoom, 17), {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        const property = item.marker;
        const markerIcon = markerIcons.get(property.price);

        if (!markerIcon) {
          return null;
        }

        const detailUrl = (() => {
          const baseUrl = new URL(buildDetailHref(property), "https://sandstone.local");

          if (mapContextQuery) {
            Object.entries(mapContextQuery).forEach(([key, value]) => {
              if (typeof value === "string" && value.trim()) {
                baseUrl.searchParams.set(key, value);
              }
            });
          }

          return `${baseUrl.pathname}${baseUrl.search}`;
        })();
        const primaryImage = sanitizeExternalImageUrl(property.image ?? "");

        return (
          <Marker
            key={property.id}
            position={[item.latitude, item.longitude]}
            icon={markerIcon}
          >
            <Popup minWidth={220}>
              <div className="space-y-2 font-sans">
                {primaryImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={primaryImage}
                    alt={property.title}
                    className="h-28 w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : null}
                <p className="text-sm font-semibold text-[var(--sandstone-sand-gold)]">{property.price}</p>
                <p className="line-clamp-2 text-sm font-semibold text-[var(--sandstone-charcoal)]">{property.title}</p>
                <p className="line-clamp-1 text-xs text-[var(--sandstone-charcoal)]/75">{property.location}</p>
                <Link
                  href={detailUrl}
                  className="text-sm font-semibold text-[var(--sandstone-sand-gold)] underline"
                >
                  View listing
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

interface ListingsMapPanelClientProps {
  properties: PropertyCard[];
  mapContextQuery?: Record<string, string | undefined>;
  initialCenter?: [number, number];
  initialZoom?: number;
  onViewportChange?: (viewport: {
    north: number;
    south: number;
    east: number;
    west: number;
    zoom: number;
  }) => void;
}

export function ListingsMapPanelClient({
  properties,
  mapContextQuery,
  initialCenter,
  initialZoom,
  onViewportChange,
}: ListingsMapPanelClientProps) {
  const mappableProperties = useMemo(
    () =>
      properties.filter(
        (property): property is MappableProperty =>
          Number.isFinite(property.latitude) && Number.isFinite(property.longitude)
      ),
    [properties]
  );

  return (
    <section className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:sticky lg:top-24 lg:h-[calc(100vh-9.25rem)]">
      <MapContainer
        center={initialCenter ?? DEFAULT_CENTER}
        zoom={initialZoom ?? DEFAULT_MAP_ZOOM}
        maxBounds={EL_PASO_BOUNDS}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewportController onViewportChange={onViewportChange} />

        <ClusteredMarkers
          mappableProperties={mappableProperties}
          mapContextQuery={mapContextQuery}
        />
      </MapContainer>
    </section>
  );
}
