import type {
  Property,
  PropertyStatus,
  Transaction,
  Visit,
  VisitStatus,
} from "@/lib/types";
import { CITY_CENTERS } from "@/lib/geo";
import { properties as mockProperties } from "@/lib/mock/properties";

export type DemoRole = "acheteur" | "expert" | "agent" | "admin";

export interface DemoUser {
  name: string;
  email: string;
  role: DemoRole;
}

export interface PropertyDraft {
  title: string;
  type: string;
  transaction: Transaction;
  price: number;
  city: string;
  neighborhood: string;
  pieces: number | null;
  surface: number;
  description: string;
}

const USER_KEY = "akwaba-demo-user";
const PROPERTIES_KEY = "akwaba-demo-properties";

export const ROLE_DASHBOARD_PATH: Record<DemoRole, string> = {
  acheteur: "/tableau-de-bord/acheteur",
  expert: "/tableau-de-bord/expert",
  agent: "/tableau-de-bord",
  admin: "/tableau-de-bord/admin",
};

export const ROLE_LABEL: Record<DemoRole, string> = {
  acheteur: "Acheteur / Locataire",
  expert: "Expert",
  agent: "Agent / Propriétaire",
  admin: "Admin",
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function dashboardPathForRole(role: DemoRole): string {
  return ROLE_DASHBOARD_PATH[role] ?? "/tableau-de-bord";
}

export function saveDemoUser(user: DemoUser) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function readDemoUser(): DemoUser | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function clearDemoUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(USER_KEY);
}

export function readStoredProperties(): Property[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(PROPERTIES_KEY);
    return raw ? (JSON.parse(raw) as Property[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredProperty(draft: PropertyDraft): Property {
  const center = CITY_CENTERS[draft.city] ?? CITY_CENTERS.Yaoundé;
  const saved: Property = {
    id: `local-${Date.now()}`,
    title: draft.title,
    type: draft.type,
    transaction: draft.transaction,
    price: draft.price,
    city: draft.city,
    neighborhood: draft.neighborhood,
    pieces: draft.pieces,
    surface: draft.surface,
    status: "publie",
    ownerId: "me",
    views: 0,
    gradient: "linear-gradient(145deg,#0E4D5C,#E0A33E)",
    letter: draft.title.slice(0, 1).toUpperCase() || "B",
    lat: center.lat + 0.015,
    lng: center.lng + 0.015,
    verified: false,
    featured: false,
    agentId: "act-001",
    description: draft.description,
    amenities: ["Publié depuis la démo", "À vérifier", "Contact agent"],
    createdAt: new Date().toISOString().slice(0, 10),
  };
  const next = [saved, ...readStoredProperties()];
  if (canUseStorage()) {
    window.localStorage.setItem(PROPERTIES_KEY, JSON.stringify(next));
  }
  return saved;
}

/* ============================================================
   Ownership, patches (edit/status/delete) and unified reads
   ============================================================ */

/** Mock listings considered owned by the logged-in agent ("me"). */
export const MY_PROPERTY_IDS = [
  "akw-001",
  "akw-006",
  "akw-004",
  "akw-003",
  "akw-008",
];

const SEED_VIEWS: Record<string, number> = {
  "akw-001": 243,
  "akw-006": 187,
  "akw-004": 92,
  "akw-003": 156,
  "akw-008": 48,
};

const PATCHES_KEY = "akwaba-demo-property-patches";

export type PropertyPatch = Partial<
  Pick<
    Property,
    | "title"
    | "type"
    | "transaction"
    | "price"
    | "city"
    | "neighborhood"
    | "pieces"
    | "surface"
    | "description"
    | "status"
  >
> & { deleted?: boolean };

function readPatches(): Record<string, PropertyPatch> {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(PATCHES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PropertyPatch>) : {};
  } catch {
    return {};
  }
}

function writePatches(patches: Record<string, PropertyPatch>) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PATCHES_KEY, JSON.stringify(patches));
}

/** Merge a patch onto the existing one for a listing. */
export function patchProperty(id: string, patch: PropertyPatch) {
  const patches = readPatches();
  patches[id] = { ...patches[id], ...patch };
  writePatches(patches);
}

export function setPropertyStatus(id: string, status: PropertyStatus) {
  patchProperty(id, { status });
}

export function deleteStoredPropertyById(id: string) {
  patchProperty(id, { deleted: true });
}

function withOwnershipAndViews(p: Property): Property {
  const mine = MY_PROPERTY_IDS.includes(p.id);
  return {
    ...p,
    ownerId: p.ownerId ?? (mine ? "me" : undefined),
    views: p.views ?? SEED_VIEWS[p.id] ?? 0,
  };
}

/** Every listing (published + catalogue), with edits, status and deletions applied. */
export function getAllProperties(): Property[] {
  const patches = readPatches();
  return [...readStoredProperties(), ...mockProperties]
    .map(withOwnershipAndViews)
    .map((p) => ({ ...p, ...patches[p.id] }))
    .filter((p) => !patches[p.id]?.deleted);
}

export function getPropertyById(id: string): Property | undefined {
  return getAllProperties().find((p) => p.id === id);
}

/** Listings owned by the logged-in agent. */
export function myProperties(): Property[] {
  return getAllProperties().filter((p) => p.ownerId === "me");
}

/* ============================================================
   Visit requests (visitor → agent)
   ============================================================ */

const VISITS_KEY = "akwaba-demo-visits";
const VISITS_SEEDED_KEY = "akwaba-demo-visits-seeded";

export interface VisitDraft {
  propertyId: string;
  propertyTitle: string;
  visitorName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  message?: string;
}

const SEED_VISITS: Visit[] = [
  {
    id: "seed-visit-1",
    propertyId: "akw-001",
    propertyTitle: "Villa contemporaine · Bastos",
    visitorName: "Marie-Claire Essono",
    phone: "+237 6 99 12 34 56",
    preferredDate: "Sam 28 juin · 14h30",
    status: "attente",
    createdAt: "2026-06-27",
  },
  {
    id: "seed-visit-2",
    propertyId: "akw-003",
    propertyTitle: "Studio meublé · Tsinga",
    visitorName: "Paul Nkemdirim",
    phone: "+237 6 77 22 33 44",
    preferredDate: "Dim 29 juin · 10h00",
    status: "confirmee",
    createdAt: "2026-06-26",
  },
  {
    id: "seed-visit-3",
    propertyId: "akw-006",
    propertyTitle: "Appartement standing · Omnisport",
    visitorName: "Amina Bello",
    phone: "+237 6 90 55 66 77",
    preferredDate: "Lun 30 juin · 11h00",
    status: "attente",
    createdAt: "2026-06-28",
  },
];

export function readVisits(): Visit[] {
  if (!canUseStorage()) return SEED_VISITS;
  try {
    if (!window.localStorage.getItem(VISITS_SEEDED_KEY)) {
      window.localStorage.setItem(VISITS_KEY, JSON.stringify(SEED_VISITS));
      window.localStorage.setItem(VISITS_SEEDED_KEY, "1");
      return SEED_VISITS;
    }
    const raw = window.localStorage.getItem(VISITS_KEY);
    return raw ? (JSON.parse(raw) as Visit[]) : [];
  } catch {
    return SEED_VISITS;
  }
}

function writeVisits(visits: Visit[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
}

export function saveVisit(draft: VisitDraft): Visit {
  const visit: Visit = {
    id: `visit-${Date.now()}`,
    status: "attente",
    createdAt: new Date().toISOString().slice(0, 10),
    ...draft,
  };
  writeVisits([visit, ...readVisits()]);
  return visit;
}

export function setVisitStatus(id: string, status: VisitStatus) {
  writeVisits(readVisits().map((v) => (v.id === id ? { ...v, status } : v)));
}
