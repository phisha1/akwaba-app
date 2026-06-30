import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActorRole, PropertyStatus, Transaction } from "@/lib/types";

/** Merge conditional class names and dedupe Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in FCFA, appending "/mois" for rentals (maquette behaviour). */
export function formatPrice(price: number, transaction: Transaction): string {
  const value = new Intl.NumberFormat("fr-FR").format(price);
  return transaction === "location" ? `${value} FCFA/mois` : `${value} FCFA`;
}

export const TRANSACTION_LABEL: Record<Transaction, string> = {
  vente: "Vente",
  location: "Location",
};

/** Badge styling per listing status, matching the maquette palette. */
export const STATUS_INFO: Record<
  PropertyStatus,
  { label: string; bg: string; color: string }
> = {
  publie: { label: "Disponible", bg: "#E6F4EC", color: "#1E7A4A" },
  reserve: { label: "Réservé", bg: "#FEF3C7", color: "#B45309" },
  vendu: { label: "Vendu", bg: "#F3F4F6", color: "#6B7280" },
  loue: { label: "Loué", bg: "#F3F4F6", color: "#6B7280" },
};

export const ROLE_LABEL: Record<ActorRole, string> = {
  agence: "Agence immobilière",
  agent: "Agent immobilier",
  promoteur: "Promoteur immobilier",
  notaire: "Notaire",
  geometre: "Géomètre-expert",
  architecte: "Architecte",
  gestionnaire: "Gestionnaire de biens",
};

/** Two-letter initials from a name, e.g. "Jean-Pierre Mbida" → "JM". */
export function initials(name: string): string {
  const words = name.replace(/[^\p{L}\s-]/gu, "").split(/[\s-]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/** Price per m² label, e.g. "633 000 FCFA/m²". */
export function pricePerM2(price: number, surface: number): string {
  const value = new Intl.NumberFormat("fr-FR").format(
    Math.round(price / surface),
  );
  return `${value} FCFA/m²`;
}

/** Relative day count from an ISO date, e.g. "il y a 3 jours". */
export function relativeDays(iso: string, now = new Date()): string {
  const days = Math.max(
    0,
    Math.round((now.getTime() - new Date(iso).getTime()) / 86_400_000),
  );
  if (days === 0) return "aujourd'hui";
  if (days === 1) return "il y a 1 jour";
  if (days < 30) return `il y a ${days} jours`;
  const months = Math.round(days / 30);
  return months === 1 ? "il y a 1 mois" : `il y a ${months} mois`;
}
