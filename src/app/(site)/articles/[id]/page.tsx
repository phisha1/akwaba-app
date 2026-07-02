import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye, PenLine } from "lucide-react";
import { articles, getArticle, getFiliere } from "@/lib/mock/learning";

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  return {
    title: article?.title ?? "Article introuvable",
    description: article?.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();
  const filiere = getFiliere(article.filiere);

  return (
    <article className="bg-surface-warm">
      <div className="mx-auto max-w-[920px] px-6 py-10 sm:px-10">
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500"
        >
          <ArrowLeft className="size-4" />
          Retour aux articles
        </Link>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-bold"
            style={{ background: filiere?.bg, color: filiere?.color }}
          >
            {filiere?.title}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {article.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 border-b border-line pb-6 text-xs font-medium text-faint">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3.5" />
              {article.views} vues
            </span>
            {article.authors.map((author) => (
              <span key={author} className="inline-flex items-center gap-1">
                <PenLine className="size-3.5" />
                {author}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-5 text-[15px] leading-8 text-ink-soft">
            <p>
              Avant de prendre une décision immobilière, commencez par clarifier
              le bien, le vendeur, les documents et le prix réel du marché.
            </p>
            <p>
              La bonne méthode est simple : comparer plusieurs annonces,
              vérifier l&apos;identité de l&apos;intermédiaire, visiter le bien et garder
              une trace écrite de chaque échange important.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Demander les pièces justificatives avant tout paiement.</li>
              <li>Comparer le prix avec des biens similaires dans le quartier.</li>
              <li>Faire intervenir un professionnel quand le dossier est sensible.</li>
            </ul>
            <p>
              Gardez aussi une copie des documents partagés, des rendez-vous et
              des engagements pris. Ces traces simples évitent beaucoup de
              conflits au moment de conclure.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
