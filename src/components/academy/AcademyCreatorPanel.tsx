"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { readDemoUser, type DemoUser } from "@/lib/demo-store";

export function AcademyCreatorPanel() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const canCreate = user?.role === "expert" || user?.role === "admin";

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(readDemoUser());
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  if (!canCreate) {
    return (
      <aside className="rounded-2xl border border-line bg-white p-6">
        <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
          <BookOpen className="size-3.5" />
          Espace connecté
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-ink">
          Apprendre avant d&apos;agir
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Votre compte vous donne accès aux articles, formations, filières et
          discussions. La création de contenus reste réservée aux profils expert
          et administrateur.
        </p>
        <div className="mt-5 grid gap-3">
          <Link
            href="/formations"
            className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
          >
            Voir les formations
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/forum"
            className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
          >
            Lire le forum
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="rounded-2xl border border-line bg-white p-6">
      <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
        <PenLine className="size-3.5" />
        Expert / formateur
      </span>
      <h2 className="mt-4 text-xl font-extrabold text-ink">
        Créer et animer l&apos;Académie
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Votre profil peut publier un article, préparer une formation ou répondre
        aux questions de la communauté.
      </p>
      <div className="mt-5 grid gap-3">
        <Link
          href="/tableau-de-bord/articles/nouveau"
          className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
        >
          Nouvel article
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/tableau-de-bord/formations/nouveau"
          className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
        >
          Nouvelle formation
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/forum"
          className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
        >
          Répondre au forum
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </aside>
  );
}
