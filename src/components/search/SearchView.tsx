"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MapPin, MapIcon, List } from "lucide-react";
import { properties } from "@/lib/mock/properties";
import { getAllProperties } from "@/lib/demo-store";
import { CITY_CENTERS, searchProperties } from "@/lib/geo";
import type { Property, Transaction } from "@/lib/types";
import { CompactPropertyCard } from "@/components/property/CompactPropertyCard";

const SearchMap = dynamic(
  () => import("@/components/property/SearchMap").then((m) => m.SearchMap),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center text-sm text-muted">
        Chargement de la carte…
      </div>
    ),
  },
);

const VILLES = Object.keys(CITY_CENTERS);
const TYPES = [
  "Tous les types",
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local commercial",
  "Chambre",
];
const RADII = [5, 10, 20, 50];
type SortMode = "distance" | "priceAsc" | "priceDesc" | "recent";

export function SearchView() {
  const router = useRouter();
  const params = useSearchParams();
  const paramsKey = params.toString();

  const [transaction, setTransaction] = useState<Transaction>(
    transactionFromParam(params.get("transaction")),
  );
  const [ville, setVille] = useState(params.get("ville") || "Yaoundé");
  const [type, setType] = useState(params.get("type") || "Tous les types");
  const [radiusKm, setRadiusKm] = useState(Number(params.get("rayon")) || 10);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<SortMode>("distance");
  const [allProperties, setAllProperties] = useState<Property[]>(properties);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = new URLSearchParams(paramsKey);
      setTransaction(transactionFromParam(next.get("transaction")));
      setVille(next.get("ville") || "Yaoundé");
      setType(next.get("type") || "Tous les types");
      setRadiusKm(Number(next.get("rayon")) || 10);
    }, 0);

    return () => window.clearTimeout(id);
  }, [paramsKey]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAllProperties(getAllProperties());
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  const results = useMemo(
    () =>
      searchProperties(allProperties, {
        transaction,
        ville,
        type: type === "Tous les types" ? undefined : type,
        radiusKm,
        priceMin,
        priceMax,
      }),
    [allProperties, transaction, ville, type, radiusKm, priceMin, priceMax],
  );

  const sortedResults = useMemo(() => {
    const next = [...results];
    if (sort === "priceAsc") {
      next.sort((a, b) => a.property.price - b.property.price);
    } else if (sort === "priceDesc") {
      next.sort((a, b) => b.property.price - a.property.price);
    } else if (sort === "recent") {
      next.sort(
        (a, b) =>
          new Date(b.property.createdAt).getTime() -
          new Date(a.property.createdAt).getTime(),
      );
    } else {
      next.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
    }
    return next;
  }, [results, sort]);

  function updateTransaction(nextTransaction: Transaction) {
    setTransaction(nextTransaction);
    const next = new URLSearchParams(paramsKey);
    next.set("transaction", nextTransaction);
    router.replace(`/recherche?${next.toString()}`);
    window.dispatchEvent(
      new CustomEvent("akwaba:transaction-change", {
        detail: { transaction: nextTransaction },
      }),
    );
  }

  const center = CITY_CENTERS[ville] ?? CITY_CENTERS.Yaoundé;
  const mapProperties = useMemo(
    () => sortedResults.map((r) => r.property),
    [sortedResults],
  );
  const returnHref = paramsKey ? `/recherche?${paramsKey}` : "/recherche";

  return (
    <div className="flex h-full flex-col">
      {/* Filter bar */}
      <div className="flex h-[58px] shrink-0 items-center gap-2.5 overflow-x-auto border-b border-line bg-white px-4">
        <div className="flex shrink-0 items-center gap-1.5 text-[13px] text-muted">
          <Link href="/" className="text-brand-500 hover:underline">
            Accueil
          </Link>
          <span className="text-line-cool">›</span>
          <span className="text-ink">Recherche à {ville}</span>
        </div>
        <Divider />

        <FilterSelect value={type} onChange={setType} options={TYPES} />

        <div className="flex shrink-0 overflow-hidden rounded-lg border-[1.5px] border-line">
          {(["vente", "location"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateTransaction(t)}
              className={`px-3.5 py-1.5 text-[13px] font-semibold capitalize transition-colors ${
                transaction === t
                  ? "bg-brand-500 text-white"
                  : "bg-white text-muted hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <PriceFilter
          min={priceMin}
          max={priceMax}
          onChange={(lo, hi) => {
            setPriceMin(lo);
            setPriceMax(hi);
          }}
        />

        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border-[1.5px] border-brand-500 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-500">
          <MapPin className="size-3" />
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
          >
            {VILLES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <ChevronDown className="size-3" />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border-[1.5px] border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink">
          Rayon :
          <select
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="cursor-pointer appearance-none bg-transparent outline-none"
          >
            {RADII.map((r) => (
              <option key={r} value={r}>
                {r} km
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1" />
        <span className="shrink-0 whitespace-nowrap text-[13px] font-medium text-muted">
          {sortedResults.length} bien{sortedResults.length > 1 ? "s" : ""} trouvé
          {sortedResults.length > 1 ? "s" : ""}
        </span>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {/* List + map */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          className={`flex w-full shrink-0 flex-col gap-3 overflow-y-auto bg-surface-warm p-4 lg:w-[464px] ${
            mobileMap ? "hidden lg:flex" : "flex"
          }`}
        >
          {sortedResults.length === 0 ? (
            <div className="grid flex-1 place-items-center px-6 text-center text-sm text-muted">
              Aucun bien ne correspond à ces critères. Élargissez le rayon ou
              changez de ville.
            </div>
          ) : (
            sortedResults.map(({ property, distanceKm }) => (
              <CompactPropertyCard
                key={property.id}
                property={property}
                distanceKm={distanceKm}
                active={activeId === property.id}
                onActivate={() => setActiveId(property.id)}
                onDeactivate={() => setActiveId(null)}
                returnHref={returnHref}
              />
            ))
          )}
        </div>

        <div
          className={`relative flex-1 border-l border-line ${
            mobileMap ? "block" : "hidden lg:block"
          }`}
        >
          <SearchMap
            properties={mapProperties}
            center={{ lat: center.lat, lng: center.lng }}
            activeId={activeId}
            onActivate={setActiveId}
            onDeactivate={() => setActiveId(null)}
          />
        </div>
      </div>

      {/* Mobile list/map toggle */}
      <button
        type="button"
        onClick={() => setMobileMap((v) => !v)}
        className="absolute bottom-5 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
      >
        {mobileMap ? (
          <>
            <List className="size-4" /> Liste
          </>
        ) : (
          <>
            <MapIcon className="size-4" /> Carte
          </>
        )}
      </button>
    </div>
  );
}

function transactionFromParam(value: string | null): Transaction {
  return value === "location" ? "location" : "vente";
}

function Divider() {
  return <div className="h-5 w-px shrink-0 bg-line" />;
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (value: SortMode) => void;
}) {
  return (
    <div className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border-[1.5px] border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-brand-500 sm:flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortMode)}
        className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
      >
        <option value="distance">Tri : distance</option>
        <option value="priceAsc">Prix croissant</option>
        <option value="priceDesc">Prix décroissant</option>
        <option value="recent">Plus récents</option>
      </select>
      <ChevronDown className="size-3" />
    </div>
  );
}

function PriceFilter({
  min,
  max,
  onChange,
}: {
  min?: number;
  max?: number;
  onChange: (lo?: number, hi?: number) => void;
}) {
  const active = min != null || max != null;
  return (
    <div
      className={`flex shrink-0 items-center gap-1.5 rounded-lg border-[1.5px] px-3 py-1.5 text-[13px] font-medium ${
        active ? "border-brand-500 bg-brand-50 text-brand-500" : "border-line bg-white text-ink"
      }`}
    >
      <span className={active ? "text-brand-500" : "text-muted"}>Prix FCFA</span>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        placeholder="min"
        value={min ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined, max)}
        className="w-[74px] bg-transparent outline-none placeholder:text-faint"
      />
      <span className="text-line-cool">–</span>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        placeholder="max"
        value={max ?? ""}
        onChange={(e) => onChange(min, e.target.value ? Number(e.target.value) : undefined)}
        className="w-[74px] bg-transparent outline-none placeholder:text-faint"
      />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border-[1.5px] border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-brand-500">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="size-3" />
    </div>
  );
}
