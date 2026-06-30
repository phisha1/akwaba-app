import { Fragment } from "react";
import { SearchBar } from "./SearchBar";

const STATS = [
  { value: "2 400+", label: "biens actifs" },
  { value: "12", label: "villes couvertes" },
  { value: "850+", label: "agents certifiés" },
];

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden px-6 py-20 sm:py-24"
      style={{ background: "var(--gradient-brand)" }}
    >
      {/* Decorative circles */}
      <span className="pointer-events-none absolute -right-24 -top-28 size-[480px] rounded-full bg-white/[0.04]" />
      <span className="pointer-events-none absolute -bottom-24 -left-14 size-[360px] rounded-full bg-gold-400/[0.06]" />
      <span className="pointer-events-none absolute right-60 top-16 size-[180px] rounded-full bg-white/[0.025]" />

      <div className="relative z-[2] max-w-[760px] text-center [animation:heroIn_.7s_ease-out_both]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/[0.16] px-[18px] py-1.5">
          <span className="size-1.5 rounded-full bg-gold-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
            Yaoundé · Douala · Bafoussam
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-[1.06] tracking-[-1.5px] text-white sm:text-[54px]">
          Trouvez votre bien
          <br />
          idéal au Cameroun
        </h1>
        <p className="mb-11 text-[17px] leading-relaxed text-white/70">
          Des milliers de biens vérifiés à la vente et à la location, partout au
          Cameroun
        </p>

        <SearchBar />

        <div className="mt-9 flex items-center justify-center gap-9">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <span className="h-7 w-px bg-white/15" />}
              <div className="text-center">
                <div className="mb-0.5 text-[22px] font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
