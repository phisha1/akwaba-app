import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, FileText, MapPinned } from "lucide-react";
import {
  articles,
  filieres,
  formations,
  getFiliere,
} from "@/lib/mock/learning";

export function generateStaticParams() {
  return filieres.map((filiere) => ({ slug: filiere.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filiere = getFiliere(slug);
  return {
    title: filiere?.title ?? "Filière introuvable",
    description: filiere?.description,
  };
}

export default async function FiliereDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filiere = getFiliere(slug);
  if (!filiere) notFound();
  const relatedArticles = articles.filter((article) => article.filiere === slug);
  const relatedFormations = formations.filter(
    (formation) => formation.filiere === slug,
  );

  return (
    <div className="bg-surface-warm">
      <div className="mx-auto max-w-[1200px] px-6 py-10 sm:px-10 lg:px-14">
        <Link
          href="/filieres"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500"
        >
          <ArrowLeft className="size-4" />
          Toutes les filières
        </Link>
        <section className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-bold"
            style={{ background: filiere.bg, color: filiere.color }}
          >
            Filière
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-ink">
            {filiere.title}
          </h1>
          <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-muted">
            {filiere.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/recherche"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-bold text-white"
            >
              <MapPinned className="size-4" />
              Voir les biens sur la carte
            </Link>
            <Link
              href="/recherche"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-500 px-4 py-2.5 text-sm font-bold text-brand-500"
            >
              Rechercher des biens
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <RelatedSection
            title="Articles liés"
            icon={FileText}
            empty="Aucun article pour cette filière pour le moment."
            items={relatedArticles.map((article) => ({
              href: `/articles/${article.id}`,
              title: article.title,
              detail: article.excerpt,
            }))}
          />
          <RelatedSection
            title="Formations liées"
            icon={BookOpen}
            empty="Aucune formation pour cette filière pour le moment."
            items={relatedFormations.map((formation) => ({
              href: `/formations/${formation.id}`,
              title: formation.title,
              detail: `${formation.duration} · ${formation.price}`,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

function RelatedSection({
  title,
  icon: Icon,
  empty,
  items,
}: {
  title: string;
  icon: typeof FileText;
  empty: string;
  items: { href: string; title: string; detail: string }[];
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
        <Icon className="size-5 text-brand-500" />
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl border border-line p-4 transition-colors hover:border-brand-500"
            >
              <div className="font-bold text-ink">{item.title}</div>
              <div className="mt-1 text-sm text-muted">{item.detail}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
