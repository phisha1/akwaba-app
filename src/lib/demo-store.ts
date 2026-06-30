import type { Property, Transaction } from "@/lib/types";
import { CITY_CENTERS } from "@/lib/geo";

export type DemoRole = "lecteur" | "auteur" | "expert" | "agent" | "admin";

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
  lecteur: "/tableau-de-bord/lecteur",
  auteur: "/tableau-de-bord/auteur",
  expert: "/tableau-de-bord/expert",
  agent: "/tableau-de-bord",
  admin: "/tableau-de-bord/admin",
};

export const ROLE_LABEL: Record<DemoRole, string> = {
  lecteur: "Lecteur",
  auteur: "Auteur",
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
