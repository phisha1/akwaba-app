"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search, BookOpen, MessageCircle, CalendarDays, Home, type LucideIcon } from "lucide-react";
import type { Property, Visit } from "@/lib/types";
import { favoriteProperties, readDemoUser, readVisits } from "@/lib/demo-store";
import { PropertyCard } from "@/components/property/PropertyCard";

export function AcheteurDashboard() {
  const [favs, setFavs] = useState<Property[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [name, setName] = useState("Utilisateur Akwaba");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFavs(favoriteProperties());
      const u = readDemoUser();
      const allVisits = readVisits();
      if (u?.name) setName(u.name);
      setVisits(
        u
          ? allVisits.filter((visit) => visit.email === u.email || visit.visitorName === u.name)
          : [],
      );
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">
          Bonjour {name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Votre espace pour suivre vos biens favoris et vos recherches.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickCard href="/recherche?transaction=vente" icon={Search} title="Acheter" desc="Biens à vendre" />
        <QuickCard href="/recherche?transaction=location" icon={Home} title="Louer" desc="Biens à louer" />
        <QuickCard href="/articles" icon={BookOpen} title="Conseils" desc="Éviter les pièges" />
        <QuickCard href="/forum" icon={MessageCircle} title="Forum" desc="Poser une question" />
      </div>

      <div className="mb-6 rounded-2xl border border-line bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="size-5 text-brand-500" />
          <h2 className="text-base font-bold text-ink">Mes visites</h2>
          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-500">
            {visits.length}
          </span>
        </div>
        {visits.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-6 py-8 text-center">
            <p className="text-sm text-muted">
              Aucune visite demandée pour l&apos;instant.
            </p>
            <Link
              href="/recherche?transaction=location"
              className="mt-4 inline-block rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-500"
            >
              Voir les biens à louer
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {visits.map((visit) => (
              <div key={visit.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-ink">
                    {visit.propertyTitle}
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {visit.preferredDate || formatDate(visit.createdAt)}
                  </div>
                </div>
                <span className="rounded-md bg-surface-cool px-2.5 py-1 text-xs font-bold capitalize text-muted">
                  {visit.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl border border-line bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Heart className="size-5 fill-[#EF4444] text-[#EF4444]" />
          <h2 className="text-base font-bold text-ink">Mes favoris</h2>
          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-500">
            {favs.length}
          </span>
        </div>
        {favs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-6 py-10 text-center">
            <p className="text-sm text-muted">
              Aucun favori pour l&apos;instant. Ajoutez des biens avec le ♥ sur
              une annonce.
            </p>
            <Link
              href="/recherche"
              className="mt-4 inline-block rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-500"
            >
              Parcourir les biens
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favs.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickCard({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <Icon className="mb-3 size-6 text-brand-500" />
      <div className="text-sm font-extrabold text-ink">{title}</div>
      <div className="mt-0.5 text-xs text-muted">{desc}</div>
    </Link>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}
