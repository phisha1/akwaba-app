import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Eye, Lock, PenLine } from "lucide-react";
import { articles, getFiliere } from "@/lib/mock/learning";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Guides et conseils d'experts pour comprendre l'immobilier au Cameroun.",
};

export default function ArticlesPage() {
  return (
    <div className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Apprendre
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Articles immobiliers
          </h1>
          <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted">
            Des contenus courts pour comprendre les documents, les quartiers, la
            location, l&apos;achat et l&apos;investissement immobilier au Cameroun.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-5 px-6 py-10 sm:px-10 lg:grid-cols-3 lg:px-14">
        {articles.map((article) => {
          const filiere = getFiliere(article.filiere);
          return (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className="rounded-md px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: filiere?.bg, color: filiere?.color }}
                >
                  {filiere?.title}
                </span>
                {article.premium && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-gold-100 px-2 py-1 text-[11px] font-bold text-gold-700">
                    <Lock className="size-3" />
                    Premium
                  </span>
                )}
              </div>
              <h2 className="mb-2 text-lg font-extrabold leading-snug text-ink group-hover:text-brand-500">
                {article.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                {article.excerpt}
              </p>
              <div className="mb-4 flex flex-wrap gap-2 text-xs text-faint">
                {article.authors.map((author) => (
                  <span key={author} className="inline-flex items-center gap-1">
                    <PenLine className="size-3" />
                    {author}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-line pt-4 text-xs font-medium text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="size-3.5" />
                  {article.views}
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
