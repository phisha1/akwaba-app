import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { filieres } from "@/lib/mock/learning";

export const metadata: Metadata = {
  title: "Filières",
  description:
    "Parcours thématiques pour explorer l'immobilier, les articles, les formations et la cartographie.",
};

export default function FilieresPage() {
  return (
    <div className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Parcours
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Filières immobilières
          </h1>
          <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted">
            Choisissez un thème, consultez les articles, les formations et
            poursuivez vers la cartographie.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-5 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-14">
        {filieres.map((filiere) => (
          <Link
            key={filiere.slug}
            href={`/filieres/${filiere.slug}`}
            className="rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div
              className="mb-4 h-2 rounded-full"
              style={{ background: filiere.color }}
            />
            <h2 className="text-lg font-extrabold text-ink">{filiere.title}</h2>
            <p className="mt-1 text-xs font-bold uppercase text-faint">
              {filiere.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {filiere.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-500">
              Explorer
              <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
