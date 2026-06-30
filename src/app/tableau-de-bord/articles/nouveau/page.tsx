import Link from "next/link";
import { PenLine } from "lucide-react";

export default function NouvelArticlePage() {
  return (
    <div className="mx-auto max-w-[820px] rounded-2xl border border-line bg-white p-6 shadow-card">
      <PenLine className="mb-4 size-7 text-brand-500" />
      <h1 className="text-2xl font-extrabold text-ink">Nouvel article</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Cette page prépare le parcours auteur sans backend. Le prochain niveau
        serait d&apos;ajouter un éditeur local et une prévisualisation avant
        publication.
      </p>
      <div className="mt-6 grid gap-4">
        <input
          className="rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none"
          placeholder="Titre de l'article"
        />
        <textarea
          className="min-h-40 rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none"
          placeholder="Introduction, conseils, conclusion..."
        />
      </div>
      <Link
        href="/articles"
        className="mt-6 inline-flex rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white"
      >
        Prévisualiser dans Articles
      </Link>
    </div>
  );
}
