import { ListingsMapClient } from "./ListingsMapClient";
import { getMapListingsForInitialLoad } from "@/lib/map-listings-cache";

export const revalidate = 0;

export default async function ListingsMapPage() {
  const mapClientProperties = await getMapListingsForInitialLoad();

  return <ListingsMapClient properties={mapClientProperties} />;
}
