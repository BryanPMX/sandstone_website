"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PropertyCard } from "@/types";

const DEFAULT_CENTER = { lat: 31.7619, lng: -106.485 };
const EL_PASO_BOUNDS_PADDING = 72;
const DEFAULT_MAP_ZOOM = 11;
const SINGLE_MARKER_ZOOM = 13;
const SANDSTONE_SAND_GOLD_HEX = "#b79678";
const MOBILE_MAX_WIDTH_MEDIA_QUERY = "(max-width: 1023px)";
const MOBILE_MARKER_BATCH_SIZE = 24;
const DESKTOP_MARKER_BATCH_SIZE = 90;

type MapStatus = "idle" | "loading" | "ready" | "missing-key" | "error";
type MappableProperty = PropertyCard & { latitude: number; longitude: number };
type MapPosition = { lat: number; lng: number };
type MarkerIcon = {
  url: string;
  scaledSize: unknown;
  anchor: unknown;
};

interface GoogleMapsEventListener {
  remove: () => void;
}

interface GoogleMapsMapInstance {
  setCenter: (center: unknown) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: GoogleMapsLatLngBoundsInstance, padding: number) => void;
}

interface GoogleMapsMarkerInstance {
  addListener: (eventName: "click", handler: () => void) => GoogleMapsEventListener;
  setMap: (map: GoogleMapsMapInstance | null) => void;
}

interface GoogleMapsInfoWindowInstance {
  open: (options: { anchor: GoogleMapsMarkerInstance; map: GoogleMapsMapInstance }) => void;
  close: () => void;
}

interface GoogleMapsLatLngBoundsInstance {
  extend: (point: MapPosition) => void;
  getCenter: () => unknown;
}

interface GoogleMapsNamespace {
  Map: new (
    element: HTMLElement,
    options: {
      center: MapPosition;
      zoom: number;
      mapTypeControl: boolean;
      streetViewControl: boolean;
      fullscreenControl: boolean;
      clickableIcons: boolean;
      gestureHandling: "greedy" | "cooperative";
    }
  ) => GoogleMapsMapInstance;
  Marker: new (options: {
    map: GoogleMapsMapInstance;
    position: MapPosition;
    icon: MarkerIcon;
    title: string;
  }) => GoogleMapsMarkerInstance;
  InfoWindow: new (options: { content: string }) => GoogleMapsInfoWindowInstance;
  LatLngBounds: new () => GoogleMapsLatLngBoundsInstance;
  Size: new (width: number, height: number) => unknown;
  Point: new (x: number, y: number) => unknown;
}

interface GoogleMapsGlobal {
  maps?: GoogleMapsNamespace;
}

declare global {
  interface Window {
    google?: GoogleMapsGlobal;
    __sandstoneGoogleMapsPromise?: Promise<void>;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeSvgText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

function buildPriceMarkerIcon(price: string, mapsApi: GoogleMapsNamespace): MarkerIcon {
  const text = price.length > 14 ? `${price.slice(0, 13)}…` : price;
  const bubbleHeight = 34;
  const pointerHeight = 10;
  const bubbleWidth = Math.max(80, text.length * 11 + 22);
  const totalHeight = bubbleHeight + pointerHeight;
  const halfWidth = bubbleWidth / 2;
  const pointerLeft = halfWidth - 8;
  const pointerRight = halfWidth + 8;
  const pointerTip = totalHeight - 1;

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${bubbleWidth}" height="${totalHeight}" viewBox="0 0 ${bubbleWidth} ${totalHeight}">`,
    `<rect x="1" y="1" width="${bubbleWidth - 2}" height="${bubbleHeight - 2}" rx="17" fill="${SANDSTONE_SAND_GOLD_HEX}" />`,
    `<path d="M ${pointerLeft} ${bubbleHeight - 1} L ${pointerRight} ${bubbleHeight - 1} L ${halfWidth} ${pointerTip} Z" fill="${SANDSTONE_SAND_GOLD_HEX}" />`,
    `<text x="50%" y="${Math.floor(bubbleHeight / 2) + 5}" text-anchor="middle" fill="#FFFFFF" font-size="14" font-family="Montserrat, Arial, sans-serif" font-weight="700">${escapeSvgText(text)}</text>`,
    "</svg>",
  ].join("");

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new mapsApi.Size(bubbleWidth, totalHeight),
    anchor: new mapsApi.Point(halfWidth, totalHeight),
  };
}

function isMobileViewport(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(MOBILE_MAX_WIDTH_MEDIA_QUERY).matches;
}

function yieldToMainThread(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    window.requestAnimationFrame(() => resolve());
  });
}

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (window.__sandstoneGoogleMapsPromise) {
    return window.__sandstoneGoogleMapsPromise;
  }

  window.__sandstoneGoogleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps. Verify NEXT_PUBLIC_GOOGLE_MAPS_API_KEY."));
    document.head.appendChild(script);
  });

  return window.__sandstoneGoogleMapsPromise;
}

interface ListingsMapPanelProps {
  properties: PropertyCard[];
}

export function ListingsMapPanel({ properties }: ListingsMapPanelProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const [status, setStatus] = useState<MapStatus>("idle");
  const [shouldInitializeMap, setShouldInitializeMap] = useState(false);
  const mappableProperties = useMemo(
    () =>
      properties.filter(
        (property): property is MappableProperty =>
          Number.isFinite(property.latitude) && Number.isFinite(property.longitude)
      ),
    [properties]
  );

  useEffect(() => {
    const container = mapContainerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let idleTimer: number | null = null;

    const enableInitialization = () => {
      if (!cancelled) {
        setShouldInitializeMap(true);
      }
    };

    if (!isMobileViewport()) {
      enableInitialization();

      return () => {
        cancelled = true;
        if (idleTimer != null) {
          window.clearTimeout(idleTimer);
        }
      };
    }

    // On mobile, defer heavy map setup until this section is near viewport and the browser settles.
    const initializeSoon = () => {
      idleTimer = window.setTimeout(enableInitialization, 180);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            initializeSoon();
          }
        },
        { rootMargin: "160px 0px" }
      );

      observer.observe(container);

      return () => {
        cancelled = true;
        observer.disconnect();
        if (idleTimer != null) {
          window.clearTimeout(idleTimer);
        }
      };
    }

    initializeSoon();

    return () => {
      cancelled = true;
      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (!googleMapsKey) {
      setStatus("missing-key");
      return;
    }

    if (!shouldInitializeMap) {
      return;
    }

    const container = mapContainerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    const markers: GoogleMapsMarkerInstance[] = [];
    const markerListeners: Array<{ remove: () => void }> = [];
    let activeInfoWindow: GoogleMapsInfoWindowInstance | null = null;

    setStatus("loading");

    loadGoogleMaps(googleMapsKey)
      .then(async () => {
        if (cancelled) {
          return;
        }

        const mapsApi = window.google?.maps;

        if (!mapsApi) {
          throw new Error("Google Maps API is unavailable.");
        }

        const isMobile = isMobileViewport();
        const markerBatchSize = isMobile ? MOBILE_MARKER_BATCH_SIZE : DESKTOP_MARKER_BATCH_SIZE;
        const markerIconCache = new Map<string, MarkerIcon>();
        const map = new mapsApi.Map(container, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_MAP_ZOOM,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: isMobile ? "cooperative" : "greedy",
        });

        if (mappableProperties.length > 0) {
          const bounds = new mapsApi.LatLngBounds();
          for (let start = 0; start < mappableProperties.length; start += markerBatchSize) {
            if (cancelled) {
              return;
            }

            const batch = mappableProperties.slice(start, start + markerBatchSize);

            batch.forEach((property) => {
              const position = {
                lat: property.latitude,
                lng: property.longitude,
              };
              const cachedIcon = markerIconCache.get(property.price);
              const markerIcon = cachedIcon ?? buildPriceMarkerIcon(property.price, mapsApi);

              if (!cachedIcon) {
                markerIconCache.set(property.price, markerIcon);
              }

              const marker = new mapsApi.Marker({
                map,
                position,
                icon: markerIcon,
                title: `${property.price} · ${property.title}`,
              });

              const detailUrl = buildDetailHref(property);
              // The card model stores a single primary image; use this first image in the map popup.
              const primaryImage = sanitizeExternalImageUrl(property.image);
              const detailsContent = [
                `<div style="max-width:240px;font-family:Montserrat,Arial,sans-serif;">`,
                primaryImage
                  ? `<img src="${escapeHtml(primaryImage)}" alt="${escapeHtml(property.title)}" style="display:block;width:100%;height:128px;object-fit:cover;border-radius:12px;margin:0 0 10px;" loading="lazy" />`
                  : "",
                `<p style="margin:0;font-weight:700;color:${SANDSTONE_SAND_GOLD_HEX};">${escapeHtml(property.price)}</p>`,
                `<p style="margin:6px 0 0;color:#2d2f36;font-weight:600;">${escapeHtml(property.title)}</p>`,
                `<p style="margin:4px 0 0;color:#2d2f36;opacity:0.82;">${escapeHtml(property.location)}</p>`,
                `<a style="display:inline-block;margin-top:10px;color:${SANDSTONE_SAND_GOLD_HEX};font-weight:700;text-decoration:underline;" href="${escapeHtml(detailUrl)}">View listing</a>`,
                "</div>",
              ].join("");

              const listener = marker.addListener("click", () => {
                if (activeInfoWindow) {
                  activeInfoWindow.close();
                }

                activeInfoWindow = new mapsApi.InfoWindow({
                  content: detailsContent,
                });
                activeInfoWindow.open({
                  anchor: marker,
                  map,
                });
              });

              markerListeners.push(listener);
              markers.push(marker);
              bounds.extend(position);
            });

            if (start + markerBatchSize < mappableProperties.length) {
              await yieldToMainThread();
            }
          }

          if (mappableProperties.length === 1) {
            map.setCenter(bounds.getCenter());
            map.setZoom(SINGLE_MARKER_ZOOM);
          } else {
            map.fitBounds(bounds, EL_PASO_BOUNDS_PADDING);
          }
        }

        setStatus("ready");
      })
      .catch((error) => {
        console.error("[ListingsMapPanel] Failed to initialize map.", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
      markerListeners.forEach((listener) => listener.remove());
      markers.forEach((marker) => marker.setMap(null));
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
    };
  }, [googleMapsKey, mappableProperties, shouldInitializeMap]);

  return (
    <section className="relative h-[56vh] min-h-[420px] overflow-hidden rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:sticky lg:top-24 lg:h-[calc(100vh-9.25rem)]">
      <div ref={mapContainerRef} className="h-full w-full bg-[var(--sandstone-off-white)]" />

      {status === "loading" && (
        <div className="absolute inset-x-4 top-4 rounded-xl border border-white/70 bg-white/92 px-4 py-3 text-sm font-medium text-[var(--sandstone-charcoal)] shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          Loading map and optimizing markers...
        </div>
      )}

      {status === "missing-key" && (
        <div className="absolute inset-4 flex items-center justify-center rounded-2xl border border-[var(--sandstone-navy)]/14 bg-white/94 px-6 text-center text-sm text-[var(--sandstone-charcoal)]/85 shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to enable live map pins.
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-4 flex items-center justify-center rounded-2xl border border-[var(--sandstone-navy)]/14 bg-white/94 px-6 text-center text-sm text-[var(--sandstone-charcoal)]/85 shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          Map failed to load. Confirm the Google Maps API key and domain restrictions.
        </div>
      )}

      {status === "ready" && mappableProperties.length === 0 && (
        <div className="absolute inset-4 flex items-center justify-center rounded-2xl border border-[var(--sandstone-navy)]/14 bg-white/94 px-6 text-center text-sm text-[var(--sandstone-charcoal)]/85 shadow-[0_14px_26px_-22px_rgba(17,24,61,0.55)]">
          No mappable coordinates were returned for the current search.
        </div>
      )}
    </section>
  );
}
