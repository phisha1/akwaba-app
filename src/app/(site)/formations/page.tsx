import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Layers, Lock } from "lucide-react";
import { formations, getFiliere } from "@/lib/mock/learning";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Formations courtes pour apprendre les bases de l'immobilier camerounais.",
};

export default function FormationsPage() {
  return (
    <div className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Academy
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Formations immobilières
          </h1>
          <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted">
            Des modules courts pour acheter, louer, publier et vérifier un
            dossier immobilier avec plus de confiance.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-5 px-6 py-10 sm:px-10 lg:grid-cols-3 lg:px-14">
        {formations.map((formation) => {
          const filiere = getFiliere(formation.filiere);
          return (
            <Link
              key={formation.id}
              href={`/formations/${formation.id}`}
              className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div
                className="mb-5 grid size-12 place-items-center rounded-xl"
                style={{ background: filiere?.bg, color: filiere?.color }}
              >
                <BookOpen className="size-6" />
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: filiere?.bg, color: filiere?.color }}
                >
                  {filiere?.title}
                </span>
                <span className="rounded-md bg-surface-cool px-2.5 py-1 text-[11px] font-bold text-muted">
                  {formation.level}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-extrabold leading-snug text-ink group-hover:text-brand-500">
                {formation.title}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted">
                {formation.description}
              </p>
              <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs font-medium text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {formation.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="size-3.5" />
                  {formation.modules} modules
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-brand-500">
                  <Lock className="size-3.5" />
                  {formation.price}
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
