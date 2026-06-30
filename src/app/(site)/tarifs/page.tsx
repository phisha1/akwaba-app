import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Plans Free et Premium pour accéder aux contenus, formations et outils Akwaba Immo.",
};

const PLANS = [
  {
    name: "Free",
    price: "0 FCFA",
    desc: "Pour découvrir la plateforme et participer à la communauté.",
    features: [
      "Articles gratuits",
      "Recherche de biens",
      "Forum communautaire",
      "Dashboard lecteur",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "5 000 FCFA/mois",
    desc: "Pour apprendre plus vite et accéder aux contenus avancés.",
    features: [
      "Articles premium",
      "Formations complètes",
      "Messagerie avancée simulée",
      "Certificats de formation simulés",
    ],
    featured: true,
  },
];

export default function TarifsPage() {
  return (
    <div className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-10 text-center sm:px-10 lg:px-14">
        <p className="mb-2 text-xs font-bold uppercase text-gold-400">
          Monétisation
        </p>
        <h1 className="text-3xl font-extrabold text-ink">Tarifs simples</h1>
        <p className="mx-auto mt-3 max-w-[680px] text-sm leading-relaxed text-muted">
          Une base freemium claire pour présenter comment le projet peut devenir
          vendable, même sans backend pour le moment.
        </p>
      </section>

      <section className="mx-auto grid max-w-[900px] gap-5 px-6 py-10 sm:px-10 md:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 shadow-card ${
              plan.featured
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-line bg-white text-ink"
            }`}
          >
            <div className="text-sm font-bold">{plan.name}</div>
            <div className="mt-3 text-3xl font-extrabold">{plan.price}</div>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                plan.featured ? "text-white/70" : "text-muted"
              }`}
            >
              {plan.desc}
            </p>
            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-gold-400" />
                  {feature}
                </div>
              ))}
            </div>
            <Link
              href="/inscription"
              className={`mt-7 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold ${
                plan.featured
                  ? "bg-gold-400 text-white hover:bg-gold-500"
                  : "border border-brand-500 text-brand-500 hover:bg-brand-50"
              }`}
            >
              Choisir ce plan
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
