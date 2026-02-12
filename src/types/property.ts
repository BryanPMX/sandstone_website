/**
 * Domain model for a property listing card (UI + listing feed).
 * Single responsibility: define the property display contract.
 */
export interface PropertyCard {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  beds?: number;
  baths?: number;
  sqft?: string;
  featured?: boolean;
}
