import type { Property, Transaction } from "@/lib/types";

export interface CityCenter {
  name: string;
  lat: number;
  lng: number;
}

export const CITY_CENTERS: Record<string, CityCenter> = {
  Yaoundé: { name: "Yaoundé", lat: 3.848, lng: 11.502 },
  Douala: { name: "Douala", lat: 4.0511, lng: 9.7679 },
  Bafoussam: { name: "Bafoussam", lat: 5.4781, lng: 10.4176 },
  Kribi: { name: "Kribi", lat: 2.9404, lng: 9.9097 },
  Bamenda: { name: "Bamenda", lat: 5.9597, lng: 10.1453 },
  Garoua: { name: "Garoua", lat: 9.3017, lng: 13.3921 },
};

/** Great-circle distance in kilometres. */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(km: number): string {
  return `${km.toFixed(1).replace(".", ",")} km`;
}

/** Short price pill label for map markers, e.g. "285M FCFA" / "120k FCFA". */
export function shortPrice(price: number): string {
  return price >= 1_000_000
    ? `${Math.round(price / 1_000_000)}M FCFA`
    : `${Math.round(price / 1_000)}k FCFA`;
}

export interface SearchFilters {
  transaction?: Transaction;
  ville?: string;
  type?: string;
  radiusKm?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface RankedProperty {
  property: Property;
  distanceKm: number | null;
}

/** Apply the search filters and return listings ranked by distance to the city. */
export function searchProperties(
  list: Property[],
  filters: SearchFilters,
): RankedProperty[] {
  const center = filters.ville ? CITY_CENTERS[filters.ville] : undefined;
  const radius = filters.radiusKm ?? 10;

  return list
    .map((property) => ({
      property,
      distanceKm: center ? haversineKm(center, property) : null,
    }))
    .filter(({ property, distanceKm }) => {
      if (filters.transaction && property.transaction !== filters.transaction)
        return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.ville && property.city !== filters.ville) return false;
      if (filters.priceMin != null && property.price < filters.priceMin)
        return false;
      if (filters.priceMax != null && property.price > filters.priceMax)
        return false;
      if (center && distanceKm != null && distanceKm > radius) return false;
      return true;
    })
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}
