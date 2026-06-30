/* ============================================================
   Domain types — Akwaba Immo
   ============================================================ */

export type TransactionType = "vente" | "location";

export type PropertyKind =
  | "appartement"
  | "maison"
  | "villa"
  | "studio"
  | "terrain"
  | "bureau"
  | "commerce";

export interface Property {
  id: string;
  title: string;
  kind: PropertyKind;
  transaction: TransactionType;
  /** Price in FCFA. For locations, this is the monthly rent. */
  price: number;
  city: string;
  neighborhood: string;
  bedrooms?: number;
  bathrooms?: number;
  /** Surface area in m². */
  area: number;
  images: string[];
  lat: number;
  lng: number;
  verified: boolean;
  featured?: boolean;
  agentId: string;
  description?: string;
  amenities?: string[];
  createdAt: string;
}

export type ActorRole =
  | "agence"
  | "agent"
  | "promoteur"
  | "notaire"
  | "geometre"
  | "architecte"
  | "gestionnaire";

export interface Actor {
  id: string;
  name: string;
  role: ActorRole;
  city: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  reviews: number;
  listingsCount: number;
  bio?: string;
  phone?: string;
}

export interface Profession {
  id: string;
  title: string;
  category: string;
  summary: string;
  missions: string[];
  formation?: string;
}
