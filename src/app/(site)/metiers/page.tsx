import type { Metadata } from "next";
import Link from "next/link";
import type { Profession } from "@/lib/types";
import {
  professions,
  FAMILY_THEME,
  FAMILY_ORDER,
} from "@/lib/mock/professions";

export const metadata: Metadata = {
  title: "Métiers de l'immobilier",
  description:
    "Missions, fourchettes de salaire en FCFA et formations requises pour exercer dans l'immobilier au Cameroun.",
};

const familyCount = FAMILY_ORDER.length;

export default function MetiersPage() {
  return (
    <div className="bg-surface-warm">
      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 pb-9 pt-11 sm:px-10 lg:px-14"
        style={{ background: "linear-gradient(135deg,#051e29 0%,#0E4D5C 55%,#0c5a6e 100%)" }}
      >
        <span className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/[0.04]" />
        <span className="pointer-events-none absolute -bottom-14 left-[400px] size-60 rounded-full bg-gold-400/[0.06]" />
        <div className="relative z-[2] mx-auto max-w-[1440px]">
          <div className="mb-4 flex items-center gap-1.5 text-[13px]">
            <Link href="/" className="text-white/60 hover:text-white">
              Accueil
            </Link>
            <span className="text-white/30">›</span>
            <span className="text-white/75">Métiers de l&apos;immobilier</span>
          </div>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="mb-2.5 text-[28px] font-extrabold leading-tight tracking-[-0.7px] text-white sm:text-[32px]">
                Les métiers de l&apos;immobilier
                <br className="hidden sm:block" /> au Cameroun
              </h1>
              <p className="max-w-[560px] text-[15px] text-white/65">
                Missions, fourchettes de salaire en FCFA et formations requises
                pour exercer au Cameroun.
              </p>
            </div>
            <div className="flex gap-7">
              <HeroStat value={String(professions.length)} label="métiers" />
              <span className="w-px bg-white/12" />
              <HeroStat value={String(familyCount)} label="familles" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {FAMILY_ORDER.map((key) => {
              const fam = FAMILY_THEME[key];
              return (
                <a
                  key={key}
                  href={`#${key}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.18] bg-white/[0.12] px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
                >
                  {fam.emoji} {fam.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Families */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-10 lg:px-14">
        {FAMILY_ORDER.map((key) => {
          const fam = FAMILY_THEME[key];
          const items = professions.filter((p) => p.family === key);
          return (
            <section key={key} id={key} className="scroll-mt-6">
              <div className="mb-5 flex items-center gap-3.5">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl border-2 text-xl"
                  style={{ background: fam.bg, borderColor: fam.accent }}
                >
                  {fam.emoji}
                </span>
                <div>
                  <div className="text-xl font-extrabold tracking-[-0.3px] text-ink">
                    {fam.label}
                  </div>
                  <div className="text-[13px] text-faint">{fam.subtitle}</div>
                </div>
                <span
                  className="ml-auto rounded-md px-3 py-1 text-xs font-semibold"
                  style={{ background: fam.bg, color: fam.accent }}
                >
                  {items.length} métier{items.length > 1 ? "s" : ""}
                </span>
              </div>
              <div
                className={`grid gap-5 ${items.length > 1 ? "lg:grid-cols-2" : "max-w-[680px]"}`}
              >
                {items.map((p) => (
                  <ProfessionCard key={p.id} profession={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold tracking-[-0.5px] text-white">
        {value}
      </div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}

function ProfessionCard({ profession }: { profession: Profession }) {
  const fam = FAMILY_THEME[profession.family];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-start gap-3.5 border-b border-line px-5 py-4">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-[13px] text-[22px]"
          style={{ background: fam.bg }}
        >
          {profession.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[17px] font-bold text-ink">
            {profession.title}
          </div>
          <div className="text-[13px] leading-relaxed text-muted">
            {profession.description}
          </div>
        </div>
        <span
          className="shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold"
          style={{ background: fam.bg, color: fam.accent }}
        >
          {profession.badge}
        </span>
      </div>

      <div className="grid gap-5 px-5 py-4 sm:grid-cols-2">
        {/* Missions */}
        <div>
          <SectionLabel>Missions</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {profession.missions.map((m) => (
              <div key={m} className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-[5px] shrink-0 rounded-full"
                  style={{ background: fam.accent }}
                />
                <span className="text-[13px] leading-snug text-ink-soft">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Salary + formations */}
        <div>
          <SectionLabel>Rémunération</SectionLabel>
          <div className="mb-3.5 rounded-[10px] px-3.5 py-3" style={{ background: fam.bg }}>
            <div className="mb-0.5 text-[11px] text-muted">{profession.salaryNote}</div>
            <div
              className="text-[15px] font-extrabold tracking-[-0.2px]"
              style={{ color: fam.accent }}
            >
              {profession.salaryRange}
            </div>
          </div>
          <SectionLabel>Formations</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {profession.formations.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-ink-soft">
                <span style={{ color: fam.accent }}>›</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-faint">
      {children}
    </div>
  );
}
