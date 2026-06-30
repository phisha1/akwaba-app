/* ============================================================
   Domain types — Akwaba Immo
   Field model mirrors the maquette (design-reference/Akwaba Immo.dc.html).
   ============================================================ */

export type Transaction = "vente" | "location";

export type PropertyStatus = "publie" | "reserve" | "vendu" | "loue";

export interface Property {
  id: string;
  title: string;
  /** Display label of the property type, e.g. "Maison", "Appartement", "Terrain". */
  type: string;
  transaction: Transaction;
  /** Price in FCFA (XAF). For locations this is the monthly rent. */
  price: number;
  city: string;
  neighborhood: string;
  /** Number of rooms ("pièces"); null for terrains / commercial lots. */
  pieces: number | null;
  /** Surface area in m² (habitable for buildings). */
  surface: number;
  /** Land area in m², when distinct from the habitable surface. */
  landArea?: number;
  status: PropertyStatus;
  /** Gradient used for the photo panel in the maquette. */
  gradient: string;
  /** Watermark letter shown on the photo panel. */
  letter: string;
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
  experienceYears?: number;
  bio?: string;
  phone?: string;
}

export type ProfessionFamily =
  | "offre"
  | "intermediaire"
  | "technique"
  | "droit"
  | "gestion";

export interface Profession {
  id: string;
  title: string;
  family: ProfessionFamily;
  emoji: string;
  /** Short badge label shown on the card (e.g. "Technique" for the géomètre). */
  badge: string;
  description: string;
  missions: string[];
  salaryNote: string;
  salaryRange: string;
  formations: string[];
}
