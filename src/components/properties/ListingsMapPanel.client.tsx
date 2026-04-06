"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L, { type DivIcon, type LatLngBoundsExpression } from "leaflet";
import type { PropertyCard } from "@/types";

const DEFAULT_CENTER: [number, number] = [31.7619, -106.485];
const DEFAULT_MAP_ZOOM = 11;
const SINGLE_MARKER_ZOOM = 13;
const SANDSTONE_SAND_GOLD_HEX = "#b79678";
const MOBILE_MAX_WIDTH_MEDIA_QUERY = "(max-width: 1023px)";
const MOBILE_INITIAL_MARKER_COUNT = 30;
const DESKTOP_INITIAL_MARKER_COUNT = 90;
const MOBILE_MARKER_BATCH_SIZE = 22;
const DESKTOP_MARKER_BATCH_SIZE = 60;
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

function isMobileViewport(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(MOBILE_MAX_WIDTH_MEDIA_QUERY).matches;
}

function MapViewportController({ points }: { points: Array<[number, number]> }) {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(EL_PASO_BOUNDS);
    map.setMinZoom(10);
    map.setMaxZoom(17);
  }, [map]);

  useEffect(() => {
    if (points.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_MAP_ZOOM);
      return;
    }

    if (points.length === 1) {
      map.setView(points[0], SINGLE_MARKER_ZOOM);
      return;
    }

    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: SINGLE_MARKER_ZOOM });
  }, [map, points]);

  return null;
}

interface ListingsMapPanelClientProps {
  properties: PropertyCard[];
  mapContextQuery?: Record<string, string | undefined>;
}

export function ListingsMapPanelClient({
  properties,
  mapContextQuery,
}: ListingsMapPanelClientProps) {
  const [visibleMarkerCount, setVisibleMarkerCount] = useState(0);
  const mappableProperties = useMemo(
    () =>
      properties.filter(
        (property): property is MappableProperty =>
          Number.isFinite(property.latitude) && Number.isFinite(property.longitude)
      ),
    [properties]
  );

  const points = useMemo(
    () => mappableProperties.map((property) => [property.latitude, property.longitude] as [number, number]),
    [mappableProperties]
  );

  const visibleMappableProperties = useMemo(
    () => mappableProperties.slice(0, visibleMarkerCount),
    [mappableProperties, visibleMarkerCount]
  );

  const markerIcons = useMemo(() => {
    const iconByPrice = new Map<string, DivIcon>();

    visibleMappableProperties.forEach((property) => {
      if (!iconByPrice.has(property.price)) {
        iconByPrice.set(property.price, createPriceMarkerIcon(property.price));
      }
    });

    return iconByPrice;
  }, [visibleMappableProperties]);

  useEffect(() => {
    const total = mappableProperties.length;

    if (total === 0) {
      setVisibleMarkerCount(0);
      return;
    }

    const mobile = isMobileViewport();
    const initialCount = mobile ? MOBILE_INITIAL_MARKER_COUNT : DESKTOP_INITIAL_MARKER_COUNT;
    const batchSize = mobile ? MOBILE_MARKER_BATCH_SIZE : DESKTOP_MARKER_BATCH_SIZE;

    setVisibleMarkerCount(Math.min(initialCount, total));

    let cancelled = false;

    const scheduleNextBatch = () => {
      if (cancelled) {
        return;
      }

      setVisibleMarkerCount((previous) => {
        const next = Math.min(previous + batchSize, total);

        if (next < total) {
          window.setTimeout(scheduleNextBatch, 34);
        }

        return next;
      });
    };

    if (initialCount < total) {
      window.setTimeout(scheduleNextBatch, 16);
    }

    return () => {
      cancelled = true;
    };
  }, [mappableProperties]);

  return (
    <section className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:sticky lg:top-24 lg:h-[calc(100vh-9.25rem)]">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        maxBounds={EL_PASO_BOUNDS}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewportController points={points} />

        {visibleMappableProperties.map((property) => {
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
          const primaryImage = sanitizeExternalImageUrl(property.image);

          return (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
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
      </MapContainer>

      {mappableProperties.length === 0 && (
        <div className="absolute inset-4 flex items-center justify-center rounded-2xl border border-[var(--sandstone-navy)]/14 bg-white/94 px-6 text-center text-sm text-[var(--sandstone-charcoal)]/85 shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          No mappable coordinates were returned for the current filters.
        </div>
      )}

      {mappableProperties.length > 0 && visibleMarkerCount < mappableProperties.length && (
        <div className="absolute inset-x-4 top-4 rounded-xl border border-white/70 bg-white/92 px-4 py-3 text-sm font-medium text-[var(--sandstone-charcoal)] shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          Rendering map pins... {visibleMarkerCount}/{mappableProperties.length}
        </div>
      )}
    </section>
  );
}
