import type { PropertyStatus } from "@/lib/types";

export const currentUser = {
  name: "Jean-Pierre Mbida",
  shortName: "Jean-Pierre M.",
  agency: "Bastos Premium Realty",
  initials: "JM",
  certified: true,
  city: "Yaoundé",
};

export interface Kpi {
  key: string;
  value: string;
  label: string;
  badge: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeColor: string;
}

export const kpis: Kpi[] = [
  {
    key: "biens",
    value: "5",
    label: "Biens actifs",
    badge: "+1 ce mois",
    iconBg: "#EEF6F8",
    iconColor: "#0E4D5C",
    badgeBg: "#E6F4EC",
    badgeColor: "#1E7A4A",
  },
  {
    key: "visites",
    value: "3",
    label: "Visites en attente",
    badge: "À confirmer",
    iconBg: "#FEF3C7",
    iconColor: "#B45309",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
  },
  {
    key: "offres",
    value: "2",
    label: "Offres reçues",
    badge: "Nouvelles",
    iconBg: "#E6F4EC",
    iconColor: "#1E7A4A",
    badgeBg: "#E6F4EC",
    badgeColor: "#1E7A4A",
  },
  {
    key: "vues",
    value: "847",
    label: "Vues ce mois",
    badge: "+23% vs mois dernier",
    iconBg: "#EDE9FE",
    iconColor: "#6D28D9",
    badgeBg: "#EDE9FE",
    badgeColor: "#6D28D9",
  },
];

export interface ListingRow {
  id: string;
  title: string;
  city: string;
  type: string;
  transaction: "Vente" | "Location";
  price: string;
  status: Extract<PropertyStatus, "publie" | "reserve">;
  views: number;
  gradient: string;
}

export const myListings: ListingRow[] = [
  { id: "akw-001", title: "Villa contemporaine · Bastos", city: "Yaoundé", type: "Maison", transaction: "Vente", price: "285 000 000", status: "publie", views: 243, gradient: "linear-gradient(145deg,#0a3d4a,#1a7a8c)" },
  { id: "akw-006", title: "Appartement standing · Omnisport", city: "Yaoundé", type: "Appartement", transaction: "Vente", price: "95 000 000", status: "publie", views: 187, gradient: "linear-gradient(145deg,#053020,#1a6a44)" },
  { id: "akw-004", title: "Terrain viabilisé · Nkozoa", city: "Yaoundé", type: "Terrain", transaction: "Vente", price: "45 000 000", status: "publie", views: 92, gradient: "linear-gradient(145deg,#4a2a04,#926020)" },
  { id: "akw-003", title: "Studio meublé tout confort · Tsinga", city: "Yaoundé", type: "Appartement", transaction: "Location", price: "120 000/mois", status: "reserve", views: 156, gradient: "linear-gradient(145deg,#3a1060,#6830a0)" },
  { id: "akw-008", title: "Chambre meublée · Centre-ville", city: "Yaoundé", type: "Chambre", transaction: "Location", price: "65 000/mois", status: "publie", views: 48, gradient: "linear-gradient(145deg,#2a3510,#5a6828)" },
];

export type VisitStatus = "attente" | "confirmee";

export interface VisitRequest {
  initials: string;
  name: string;
  detail: string;
  status: VisitStatus;
  gradient: string;
}

export const visitRequests: VisitRequest[] = [
  { initials: "MC", name: "Marie-Claire Essono", detail: "Villa Bastos · Sam 28 juin 14h30", status: "attente", gradient: "linear-gradient(135deg,#0E4D5C,#1a7a8c)" },
  { initials: "PN", name: "Paul Nkemdirim", detail: "Studio Tsinga · Dim 29 juin 10h00", status: "confirmee", gradient: "linear-gradient(135deg,#3a1060,#6830a0)" },
  { initials: "AB", name: "Amina Bello", detail: "Appt Omnisport · Lun 30 juin 11h", status: "attente", gradient: "linear-gradient(135deg,#1a3060,#2d5a9c)" },
];

export type OfferStatus = "attente" | "refusee";

export interface Offer {
  initials: string;
  name: string;
  detail: string;
  status: OfferStatus;
  amount: string;
  ask: string;
  gradient: string;
}

export const offers: Offer[] = [
  { initials: "JF", name: "Jean Fotso", detail: "Villa contemporaine · Bastos · Hier", status: "attente", amount: "265 000 000 FCFA", ask: "vs 285M demandé", gradient: "linear-gradient(135deg,#4a2a04,#926020)" },
  { initials: "SK", name: "Sophie Kenfack", detail: "Appt Omnisport · il y a 3 jours", status: "refusee", amount: "90 000 000 FCFA", ask: "vs 95M demandé", gradient: "linear-gradient(135deg,#053020,#1a6a44)" },
];
