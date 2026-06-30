import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PropertyStatus, Transaction } from "@/lib/types";

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
