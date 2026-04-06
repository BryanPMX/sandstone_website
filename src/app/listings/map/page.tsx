import { ListingsMapClient } from "./ListingsMapClient";
import { fetchActivePropertyCards, fetchRentalPropertyCards } from "@/services";
import type { PropertyCard } from "@/types";

export const revalidate = 300;

function dedupeProperties<T extends { id: string; routeId: string; sparkId?: string }>(
  properties: T[]
): T[] {
  const seen = new Set<string>();

  return properties.filter((property) => {
    const key = property.sparkId ?? property.routeId ?? property.id;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function fetchMapListings(): Promise<PropertyCard[]> {
  const [active, rental] = await Promise.all([
    fetchActivePropertyCards(),
    fetchRentalPropertyCards(),
  ]);

  return dedupeProperties([...active, ...rental]);
}

export default async function ListingsMapPage() {
  const properties = await fetchMapListings();

  return <ListingsMapClient properties={properties} />;
}
