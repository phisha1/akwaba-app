"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, PenLine } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

export default function NouvelArticlePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Documents");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPublished(true);
  }

  return (
    <RequireAuth
      allowedRoles={["expert", "admin"]}
      message="La création d'article est réservée aux experts, formateurs et administrateurs."
    >
      <form onSubmit={submit} className="mx-auto max-w-[980px]">
        <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="mb-4 grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
            <PenLine className="size-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink">Nouvel article</h1>
          <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-muted">
            Préparez un contenu clair pour les acheteurs, locataires ou
            propriétaires qui cherchent une réponse fiable.
          </p>
        </div>

        {published && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-success bg-success-bg p-4 text-sm font-bold text-success">
            <CheckCircle2 className="size-5" />
            Article prêt à publier. Vous pouvez le relire ou revenir aux contenus.
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
            <Field label="Titre de l'article">
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Vérifier un titre foncier avant d'acheter"
                required
              />
            </Field>
            <Field label="Filière">
              <select
                className={inputClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Documents</option>
                <option>Achat</option>
                <option>Location</option>
                <option>Métiers</option>
              </select>
            </Field>
            <Field label="Résumé">
              <textarea
                className={`${inputClass} min-h-24 resize-y`}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="La promesse de l'article en deux ou trois phrases."
                required
              />
            </Field>
            <Field label="Contenu">
              <textarea
                className={`${inputClass} min-h-56 resize-y`}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Introduction, étapes, erreurs à éviter, conclusion..."
                required
              />
            </Field>
            <button
              type="submit"
              className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
            >
              Préparer l&apos;article
            </button>
          </section>

          <aside className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-ink">
              <Eye className="size-4 text-brand-500" />
              Aperçu
            </div>
            <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
              {category}
            </span>
            <h2 className="mt-4 text-lg font-extrabold leading-tight text-ink">
              {title || "Titre de l'article"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {excerpt || "Le résumé apparaîtra ici pendant la rédaction."}
            </p>
            <div className="mt-5 border-t border-line pt-4 text-sm leading-7 text-ink-soft">
              {body || "Les premières lignes du contenu seront visibles ici."}
            </div>
            <Link
              href="/articles"
              className="mt-6 inline-flex rounded-xl border border-brand-500 px-4 py-2.5 text-sm font-bold text-brand-500 hover:bg-brand-50"
            >
              Voir les articles
            </Link>
          </aside>
        </div>
      </form>
    </RequireAuth>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}
