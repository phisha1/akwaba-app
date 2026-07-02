"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, GraduationCap } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

export default function NouvelleFormationPage() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("Débutant");
  const [price, setPrice] = useState("");
  const [modules, setModules] = useState("4");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPublished(true);
  }

  return (
    <RequireAuth
      allowedRoles={["expert", "admin"]}
      message="La création de formation est réservée aux experts, formateurs et administrateurs."
    >
      <form onSubmit={submit} className="mx-auto max-w-[980px]">
        <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="mb-4 grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
            <GraduationCap className="size-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink">Nouvelle formation</h1>
          <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-muted">
            Structurez une formation exploitable : promesse, durée, niveau,
            modules et prix.
          </p>
        </div>

        {published && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-success bg-success-bg p-4 text-sm font-bold text-success">
            <CheckCircle2 className="size-5" />
            Formation prête. Vous pouvez la relire ou revenir au catalogue.
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-card sm:grid-cols-2">
            <Field label="Titre" className="sm:col-span-2">
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Louer sans perdre sa caution"
                required
              />
            </Field>
            <Field label="Durée">
              <input
                className={inputClass}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ex. 2h 30"
                required
              />
            </Field>
            <Field label="Niveau">
              <select
                className={inputClass}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
              </select>
            </Field>
            <Field label="Modules">
              <input
                type="number"
                min="1"
                className={inputClass}
                value={modules}
                onChange={(e) => setModules(e.target.value)}
                required
              />
            </Field>
            <Field label="Prix">
              <input
                className={inputClass}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex. 15 000 FCFA"
                required
              />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <textarea
                className={`${inputClass} min-h-40 resize-y`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Objectifs, public cible, modules et résultat attendu."
                required
              />
            </Field>
            <button
              type="submit"
              className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500 sm:col-span-2"
            >
              Préparer la formation
            </button>
          </section>

          <aside className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-ink">
              <Eye className="size-4 text-brand-500" />
              Aperçu
            </div>
            <h2 className="text-lg font-extrabold leading-tight text-ink">
              {title || "Titre de la formation"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {description || "La description apparaîtra ici pendant la rédaction."}
            </p>
            <div className="mt-5 grid gap-2 text-sm">
              <Info label="Durée" value={duration || "À renseigner"} />
              <Info label="Niveau" value={level} />
              <Info label="Modules" value={modules} />
              <Info label="Prix" value={price || "À renseigner"} />
            </div>
            <Link
              href="/formations"
              className="mt-6 inline-flex rounded-xl border border-brand-500 px-4 py-2.5 text-sm font-bold text-brand-500 hover:bg-brand-50"
            >
              Voir les formations
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
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-warm px-3 py-2">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-bold text-ink">{value}</span>
    </div>
  );
}
