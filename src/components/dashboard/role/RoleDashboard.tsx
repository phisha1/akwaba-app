"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  FileText,
  GraduationCap,
  MessageCircle,
  PenLine,
  ShieldCheck,
  Users,
} from "lucide-react";
import { readDemoUser, ROLE_LABEL, type DemoRole } from "@/lib/demo-store";

const CONFIG: Record<
  DemoRole,
  {
    title: string;
    desc: string;
    actions: { href: string; label: string; desc: string; icon: typeof FileText }[];
  }
> = {
  acheteur: {
    title: "Dashboard acheteur / locataire",
    desc: "Un espace simple pour suivre vos recherches, visites, favoris, articles utiles et questions.",
    actions: [
      { href: "/recherche", label: "Chercher un bien", desc: "Achat, location et carte", icon: BookOpen },
      { href: "/articles", label: "Conseils utiles", desc: "Guides pour éviter les pièges", icon: FileText },
      { href: "/forum", label: "Mes questions", desc: "Forum et réponses utiles", icon: MessageCircle },
      { href: "/formations", label: "Apprendre", desc: "Formations courtes", icon: GraduationCap },
    ],
  },
  expert: {
    title: "Dashboard expert",
    desc: "Un espace pour publier des conseils, créer des formations, planifier une roadmap et répondre à la communauté.",
    actions: [
      { href: "/tableau-de-bord/articles/nouveau", label: "Nouvel article", desc: "Créer un guide expert", icon: PenLine },
      { href: "/tableau-de-bord/formations/nouveau", label: "Nouvelle formation", desc: "Modules, durée, prix", icon: GraduationCap },
      { href: "/forum", label: "Répondre au forum", desc: "Questions de la communauté", icon: MessageCircle },
      { href: "/formations", label: "Mes formations", desc: "Catalogue expert", icon: BookOpen },
      { href: "/tableau-de-bord/expert", label: "Roadmap", desc: "Plan d'action simulé", icon: CalendarCheck },
    ],
  },
  agent: {
    title: "Dashboard agent",
    desc: "Votre espace pour publier des biens, gérer les visites et suivre les offres.",
    actions: [
      { href: "/tableau-de-bord/biens/nouveau", label: "Publier un bien", desc: "Créer une annonce front-only", icon: FileText },
      { href: "/tableau-de-bord", label: "Mes biens", desc: "Tableau agent actuel", icon: BookOpen },
      { href: "/recherche", label: "Voir la recherche", desc: "Contrôler la visibilité", icon: ShieldCheck },
      { href: "/annuaire", label: "Annuaire", desc: "Acteurs immobiliers", icon: Users },
    ],
  },
  admin: {
    title: "Dashboard admin",
    desc: "Un tableau de supervision simulé pour présenter la modération et les rôles.",
    actions: [
      { href: "/articles", label: "Modérer articles", desc: "Validation simulée", icon: FileText },
      { href: "/forum", label: "Modérer forum", desc: "Questions et signalements", icon: MessageCircle },
      { href: "/tarifs", label: "Abonnements", desc: "Plans Free/Premium", icon: CalendarCheck },
      { href: "/filieres", label: "Configurer filières", desc: "Thèmes et cartographie", icon: BookOpen },
    ],
  },
};

export function RoleDashboard({ role }: { role: DemoRole }) {
  const [name, setName] = useState("Utilisateur Akwaba");
  const config = CONFIG[role];

  useEffect(() => {
    const id = window.setTimeout(() => {
      const user = readDemoUser();
      if (user?.name) setName(user.name);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-card">
        <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
          {ROLE_LABEL[role]}
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">{config.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Bonjour {name}. {config.desc}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {config.actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <action.icon className="mb-4 size-6 text-brand-500" />
            <div className="text-base font-extrabold text-ink">{action.label}</div>
            <div className="mt-1 text-sm text-muted">{action.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
