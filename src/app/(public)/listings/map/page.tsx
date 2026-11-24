import { Suspense } from "react";
import { ListingsMapClient } from "./ListingsMapClient";
import ListingsMapLoading from "./loading";

export default function ListingsMapPage() {
  // Render the map shell without waiting for the listings API.
  return (
    <Suspense fallback={<ListingsMapLoading />}>
      <ListingsMapClient />
    </Suspense>
  );
}
