import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function NouvelleFormationPage() {
  return (
    <div className="mx-auto max-w-[820px] rounded-2xl border border-line bg-white p-6 shadow-card">
      <GraduationCap className="mb-4 size-7 text-brand-500" />
      <h1 className="text-2xl font-extrabold text-ink">Nouvelle formation</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Cette page prépare le parcours expert sans backend. Elle montre comment
        une formation pourrait être structurée : titre, durée, modules et prix.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          className="rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none sm:col-span-2"
          placeholder="Titre de la formation"
        />
        <input
          className="rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none"
          placeholder="Durée, ex. 3h 20"
        />
        <input
          className="rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none"
          placeholder="Prix, ex. 15 000 FCFA"
        />
        <textarea
          className="min-h-36 rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm outline-none sm:col-span-2"
          placeholder="Objectifs, modules, public cible..."
        />
      </div>
      <Link
        href="/formations"
        className="mt-6 inline-flex rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white"
      >
        Prévisualiser dans Formations
      </Link>
    </div>
  );
}
