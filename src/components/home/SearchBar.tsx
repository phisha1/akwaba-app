"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Home, Search, ChevronDown } from "lucide-react";
import type { Transaction } from "@/lib/types";

const VILLES = ["Yaoundé", "Douala", "Bafoussam", "Kribi", "Bamenda", "Garoua"];
const TYPES = [
  "Tous les biens",
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local commercial",
  "Chambre",
];

export function SearchBar() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction>("vente");
  const [ville, setVille] = useState("Yaoundé");
  const [type, setType] = useState("Tous les biens");

  function updateTransaction(next: Transaction) {
    setTransaction(next);
    window.dispatchEvent(
      new CustomEvent("akwaba:transaction-change", { detail: { transaction: next } }),
    );
  }

  function submit() {
    const params = new URLSearchParams({ transaction, ville });
    if (type !== "Tous les biens") params.set("type", type);
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <div
      className="mx-auto flex min-w-0 flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_12px_48px_rgba(0,0,0,0.32)] sm:flex-row sm:items-stretch sm:p-1.5"
      style={{ width: "min(740px, calc(100vw - 32px))" }}
    >
      {/* Lieu */}
      <label className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 sm:border-r sm:border-line sm:px-4">
        <MapPin className="size-[18px] shrink-0 text-brand-500" />
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-faint">
            Lieu
          </span>
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="-ml-0.5 w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink outline-none"
          >
            {VILLES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </span>
      </label>

      {/* Type de bien */}
      <label className="flex min-w-0 items-center gap-2 px-3 py-2.5 sm:w-[200px] sm:border-r sm:border-line sm:px-4">
        <Home className="size-[18px] shrink-0 text-brand-500" />
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-faint">
            Type de bien
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="-ml-0.5 w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink outline-none"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-faint" />
      </label>

      {/* Toggle Vente / Location */}
      <div className="flex w-full min-w-0 items-center gap-1 p-1 sm:w-[170px]">
        {(["vente", "location"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => updateTransaction(t)}
            className={`h-full min-w-0 flex-1 rounded-[10px] px-2 py-2.5 text-sm font-bold capitalize transition-colors ${
              transaction === t
                ? "bg-brand-500 text-white"
                : "text-faint hover:text-ink"
            }`}
          >
            {t === "vente" ? "Acheter" : "Louer"}
          </button>
        ))}
      </div>

      {/* Rechercher */}
      <button
        type="button"
        onClick={submit}
        className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-gold-400 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-gold-500 sm:w-auto"
      >
        <Search className="size-[17px]" />
        Rechercher
      </button>
    </div>
  );
}
