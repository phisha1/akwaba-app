"use client";

import { useMemo, useState } from "react";
import { MapPin, Link2, ChevronDown } from "lucide-react";
import {
  institutions,
  CATEGORY_THEME,
  type InstitutionCategory,
} from "@/lib/mock/directory";

type Tab = "tous" | InstitutionCategory;

const TABS: { value: Tab; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "public", label: "Public" },
  { value: "prive", label: "Privé" },
  { value: "professionnel", label: "Professionnel" },
];

const VILLES = ["Toutes les villes", "Yaoundé", "Douala"];

export function DirectoryView() {
  const [tab, setTab] = useState<Tab>("tous");
  const [ville, setVille] = useState("Toutes les villes");

  const results = useMemo(
    () =>
      institutions.filter((inst) => {
        if (tab !== "tous" && inst.category !== tab) return false;
        if (ville !== "Toutes les villes" && !inst.cities.includes(ville))
          return false;
        return true;
      }),
    [tab, ville],
  );

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3.5 border-b border-line bg-white px-6 py-3.5 sm:px-10 lg:px-14">
        <div className="flex gap-1 rounded-[10px] bg-gray-100 p-[3px]">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`rounded-[7px] px-4 py-1.5 text-[13px] transition-colors ${
                tab === t.value
                  ? "bg-white font-semibold text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "font-medium text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <span className="hidden h-5 w-px bg-line sm:block" />

        <div className="flex items-center gap-1.5 rounded-[9px] border-[1.5px] border-line bg-white px-3.5 py-2 text-[13px] font-medium text-ink">
          <MapPin className="size-3 text-faint" />
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
          >
            {VILLES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <ChevronDown className="size-3 text-faint" />
        </div>

        <span className="ml-auto text-[13px] text-faint">
          {results.length} acteur{results.length > 1 ? "s" : ""} trouvé
          {results.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="px-6 py-9 sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((inst) => {
            const theme = CATEGORY_THEME[inst.category];
            return (
              <div
                key={inst.id}
                className="rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(14,77,92,0.1)]"
              >
                <div className="mb-3 flex items-start gap-3.5">
                  <span
                    className="grid size-13 shrink-0 place-items-center rounded-[13px] px-1 text-center font-bold leading-tight text-white"
                    style={{
                      background: theme.logo,
                      fontSize: inst.acronym.length > 4 ? 10 : 14,
                    }}
                  >
                    {inst.acronym}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-lg font-extrabold tracking-[-0.3px] text-ink">
                      {inst.title}
                    </div>
                    <div className="text-xs leading-snug text-muted">
                      {inst.fullName}
                    </div>
                  </div>
                  <span
                    className="shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold"
                    style={{ background: theme.badgeBg, color: theme.accent }}
                  >
                    {theme.label}
                  </span>
                </div>

                <div className="mb-2.5 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="size-3 text-faint" />
                  {inst.cities.join(" · ")}
                </div>

                <div className="mb-3 h-px bg-[#F3F4F6]" />

                <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">
                  {inst.description}
                </p>

                <a
                  href={`https://${inst.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: theme.badgeBg, color: theme.accent }}
                >
                  <Link2 className="size-3" />
                  {inst.website}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
