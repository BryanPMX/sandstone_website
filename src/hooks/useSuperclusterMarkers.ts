import { useEffect, useMemo, useRef, useState } from "react";
import type { Feature, Point } from "geojson";
import type { LatLngBounds, Map as LeafletMap } from "leaflet";
import Supercluster from "supercluster";

export interface ClusterableMarker {
  id: string | number;
  latitude: number;
  longitude: number;
}

interface MarkerPointProperties<TMarker extends ClusterableMarker> {
  marker: TMarker;
}

type MarkerPointFeature<TMarker extends ClusterableMarker> = Feature<
  Point,
  MarkerPointProperties<TMarker>
>;

type ClusterProperties = Supercluster.ClusterFeature<
  MarkerPointProperties<ClusterableMarker>
>["properties"];

export type SuperclusterRenderItem<TMarker extends ClusterableMarker> =
  | {
      type: "cluster";
      id: number;
      latitude: number;
      longitude: number;
      pointCount: number;
      pointCountAbbreviated: string;
    }
  | {
      type: "point";
      id: string | number;
      latitude: number;
      longitude: number;
      marker: TMarker;
    };

interface UseSuperclusterMarkersParams<TMarker extends ClusterableMarker> {
  map: LeafletMap;
  markers: TMarker[];
  radius?: number;
  minPoints?: number;
  maxZoom?: number;
  debounceMs?: number;
}

interface UseSuperclusterMarkersResult<TMarker extends ClusterableMarker> {
  items: SuperclusterRenderItem<TMarker>[];
  getClusterExpansionZoom: (clusterId: number) => number;
}

export function useSuperclusterMarkers<TMarker extends ClusterableMarker>({
  map,
  markers,
  radius = 64,
  minPoints = 2,
  maxZoom = 17,
  debounceMs = 300,
}: UseSuperclusterMarkersParams<TMarker>): UseSuperclusterMarkersResult<TMarker> {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const moveDebounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      setBounds(map.getBounds());
      setZoom(Math.round(map.getZoom()));
    };

    const handleMoveEnd = () => {
      if (moveDebounceTimerRef.current != null) {
        window.clearTimeout(moveDebounceTimerRef.current);
      }

      moveDebounceTimerRef.current = window.setTimeout(updateViewport, debounceMs);
    };

    const handleZoomEnd = () => {
      updateViewport();
    };

    updateViewport();
    map.on("moveend", handleMoveEnd);
    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
      map.off("zoomend", handleZoomEnd);

      if (moveDebounceTimerRef.current != null) {
        window.clearTimeout(moveDebounceTimerRef.current);
        moveDebounceTimerRef.current = null;
      }
    };
  }, [debounceMs, map]);

  const viewportMarkers = useMemo(() => {
    if (!bounds) {
      return [];
    }

    return markers.filter((marker) => bounds.contains([marker.latitude, marker.longitude]));
  }, [bounds, markers]);

  const pointFeatures = useMemo<MarkerPointFeature<TMarker>[]>(
    () =>
      viewportMarkers.map((marker) => ({
        type: "Feature",
        properties: { marker },
        geometry: {
          type: "Point",
          coordinates: [marker.longitude, marker.latitude],
        },
      })),
    [viewportMarkers]
  );

  const clusterIndex = useMemo(() => {
    const index = new Supercluster<MarkerPointProperties<TMarker>>({
      radius,
      minPoints,
      maxZoom,
    });

    index.load(pointFeatures);
    return index;
  }, [maxZoom, minPoints, pointFeatures, radius]);

  const items = useMemo<SuperclusterRenderItem<TMarker>[]>(() => {
    if (!bounds) {
      return [];
    }

    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];

    const features = clusterIndex.getClusters(bbox, zoom);

    return features.map((feature) => {
      const [longitude, latitude] = feature.geometry.coordinates;
      const properties = feature.properties as ClusterProperties | MarkerPointProperties<TMarker>;

      if ("cluster" in properties && properties.cluster) {
        return {
          type: "cluster",
          id: properties.cluster_id,
          latitude,
          longitude,
          pointCount: properties.point_count,
          pointCountAbbreviated: String(properties.point_count_abbreviated),
        };
      }

      const marker = (properties as MarkerPointProperties<TMarker>).marker;

      return {
        type: "point",
        id: marker.id,
        latitude,
        longitude,
        marker,
      };
    });
  }, [bounds, clusterIndex, zoom]);

  return {
    items,
    getClusterExpansionZoom: (clusterId: number) =>
      clusterIndex.getClusterExpansionZoom(clusterId),
  };
}
