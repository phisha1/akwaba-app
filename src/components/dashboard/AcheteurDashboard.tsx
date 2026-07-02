"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search, BookOpen, MessageCircle } from "lucide-react";
import type { Property } from "@/lib/types";
import { favoriteProperties, readDemoUser } from "@/lib/demo-store";
import { PropertyCard } from "@/components/property/PropertyCard";

export function AcheteurDashboard() {
  const [favs, setFavs] = useState<Property[]>([]);
  const [name, setName] = useState("Utilisateur Akwaba");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFavs(favoriteProperties());
      const u = readDemoUser();
      if (u?.name) setName(u.name);
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

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <QuickCard href="/recherche" icon={Search} title="Chercher un bien" desc="Achat, location, carte" />
        <QuickCard href="/articles" icon={BookOpen} title="Conseils" desc="Éviter les pièges" />
        <QuickCard href="/forum" icon={MessageCircle} title="Forum" desc="Poser une question" />
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
  icon: typeof Search;
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
