import { Fragment } from "react";
import { SearchBar } from "./SearchBar";

const STATS = [
  { value: "2 400+", label: "biens actifs" },
  { value: "12", label: "villes couvertes" },
  { value: "850+", label: "agents certifiés" },
];

export function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cameroun-transport-routier.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-500/78 to-brand-900/70" />
      <div className="absolute inset-0 bg-black/20" />

      <div
        className="relative z-[2] w-full min-w-0 text-center [animation:heroIn_.7s_ease-out_both]"
        style={{ maxWidth: "min(760px, calc(100vw - 32px))" }}
      >
        <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/[0.16] px-4 py-1.5 sm:px-[18px]">
          <span className="size-1.5 rounded-full bg-gold-400" />
          <span className="truncate text-[11px] font-bold uppercase text-gold-400">
            Yaoundé · Douala · Bafoussam
          </span>
        </div>

        <h1 className="mx-auto mb-4 max-w-[340px] text-[30px] font-extrabold leading-[1.1] tracking-normal text-white sm:max-w-none sm:text-[54px]">
          Trouvez votre bien
          <br />
          idéal au Cameroun
        </h1>
        <p className="mx-auto mb-9 max-w-[620px] text-[15px] leading-relaxed text-white/70 sm:mb-11 sm:text-[17px]">
          Des milliers de biens vérifiés à la vente et à la location, partout au
          Cameroun
        </p>

        <SearchBar />

        <div className="mx-auto mt-8 grid w-full max-w-[340px] grid-cols-3 items-start gap-2 sm:mt-9 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:gap-9">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <span className="hidden h-7 w-px bg-white/15 sm:block" />}
              <div className="min-w-0 text-center">
                <div className="mb-0.5 text-xl font-extrabold text-white sm:text-[22px]">
                  {stat.value}
                </div>
                <div className="text-[11px] leading-snug text-white/50 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
