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

  function submit() {
    const params = new URLSearchParams({ transaction, ville });
    if (type !== "Tous les biens") params.set("type", type);
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <div className="mx-auto flex max-w-[740px] flex-col gap-2 rounded-2xl bg-white p-1.5 shadow-[0_12px_48px_rgba(0,0,0,0.32)] sm:flex-row sm:items-stretch">
      {/* Lieu */}
      <label className="flex flex-1 items-center gap-2.5 px-4 py-2.5 sm:border-r sm:border-line">
        <MapPin className="size-[18px] shrink-0 text-brand-500" />
        <span className="flex-1 text-left">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-faint">
            Lieu
          </span>
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="-ml-0.5 w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink outline-none"
          >
            {VILLES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </span>
      </label>

      {/* Type de bien */}
      <label className="flex items-center gap-2 px-4 py-2.5 sm:w-[200px] sm:border-r sm:border-line">
        <Home className="size-[18px] shrink-0 text-brand-500" />
        <span className="flex-1 text-left">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-faint">
            Type de bien
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="-ml-0.5 w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink outline-none"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-faint" />
      </label>

      {/* Toggle Vente / Location */}
      <div className="flex items-center gap-1 p-1 sm:w-[170px]">
        {(["vente", "location"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTransaction(t)}
            className={`h-full flex-1 rounded-[10px] py-2.5 text-sm font-bold capitalize transition-colors ${
              transaction === t
                ? "bg-brand-500 text-white"
                : "text-faint hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rechercher */}
      <button
        type="button"
        onClick={submit}
        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-gold-400 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-gold-500"
      >
        <Search className="size-[17px]" />
        Rechercher
      </button>
    </div>
  );
}
