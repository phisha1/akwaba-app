import { MapPinned, BadgeCheck, CreditCard } from "lucide-react";

export function ValuesSection() {
  return (
    <section className="bg-white px-6 py-[72px] sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[52px] text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-[1.2px] text-gold-400">
            Pourquoi nous choisir
          </div>
          <h2 className="text-2xl font-extrabold tracking-[-0.5px] text-ink sm:text-[30px]">
            La plateforme qui vous facilite la vie
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border-[1.5px] border-line px-7 py-8 text-center">
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-brand-50">
              <MapPinned className="size-7 text-brand-500" />
            </div>
            <h3 className="mb-2.5 text-lg font-bold text-ink">
              Recherche géolocalisée
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Trouvez des biens sur une carte interactive, filtrés par ville,
              quartier ou rayon en km.
            </p>
          </div>

          {/* Card 2 — highlighted */}
          <div className="rounded-2xl bg-brand-500 px-7 py-8 text-center">
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-white/12">
              <BadgeCheck className="size-7 text-[#4DE8A0]" />
            </div>
            <h3 className="mb-2.5 text-lg font-bold text-white">Biens vérifiés</h3>
            <p className="text-sm leading-relaxed text-white/70">
              Chaque annonce est structurée pour faciliter les vérifications :
              photos utiles, informations exactes, acteurs identifiés.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border-[1.5px] border-line px-7 py-8 text-center">
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-gold-100">
              <CreditCard className="size-7 text-gold-700" />
            </div>
            <h3 className="mb-2.5 text-lg font-bold text-ink">Paiement local</h3>
            <p className="text-sm leading-relaxed text-muted">
              MTN Mobile Money, Orange Money, BICEC. Payez votre dépôt ou
              réservation comme au quotidien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
