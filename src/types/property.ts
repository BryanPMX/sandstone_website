/**
 * Domain model for a property listing card (UI + listing feed).
 * Single responsibility: define the property display contract.
 */
export interface PropertyCard {
  id: string;
  routeId: string;
  sparkId?: string;
  sparkSource?: "active" | "my" | "rental";
  title: string;
  location: string;
  mapAddress?: string;
  latitude?: number;
  longitude?: number;
  price: string;
  image: string;
  listingNumber?: string;
  listingAgentName?: string;
  beds?: number;
  baths?: number;
  sqft?: string;
  featured?: boolean;
}

export interface PropertyMetadataItem {
  label: string;
  value: string;
}

export interface PropertyMetadataSection {
  title: string;
  items: PropertyMetadataItem[];
}

export interface PropertyDetailSpecs {
  interiorFeatures: string[];
  nearbySchools: string[];
  mapAddress?: string;
  latitude?: number;
  longitude?: number;
  listingAgentName?: string;
  listingAgentPhone?: string;
  listingAgentEmail?: string;
}

export interface PropertyDetail extends PropertyCard {
  description?: string;
  images: string[];
  specs: PropertyDetailSpecs;
  metadataSections: PropertyMetadataSection[];
}
