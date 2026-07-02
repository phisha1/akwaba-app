"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import {
  ROLE_LABEL,
  dashboardPathForRole,
  readDemoUser,
  type DemoUser,
} from "@/lib/demo-store";

export default function ProfilePage() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setUser(readDemoUser()), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-[900px]">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
            <UserRound className="size-3.5" />
            Profil
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-ink">
            Mon compte Akwaba
          </h1>
          <p className="mt-1 max-w-[640px] text-sm leading-relaxed text-muted">
            Retrouvez les informations principales de votre espace et les accès
            liés à votre rôle.
          </p>
        </div>

        <section className="rounded-2xl border border-line bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand-500 text-lg font-extrabold text-white">
                {(user?.name ?? "Utilisateur Akwaba")
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-ink">
                  {user?.name ?? "Utilisateur Akwaba"}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Mail className="size-4" />
                  {user?.email ?? "Compte connecté"}
                </p>
              </div>
            </div>
            {user && (
              <span className="inline-flex items-center gap-2 rounded-lg bg-success-bg px-3 py-2 text-xs font-bold text-success">
                <ShieldCheck className="size-4" />
                {ROLE_LABEL[user.role]}
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Info label="Nom" value={user?.name ?? "Non renseigné"} />
            <Info label="E-mail" value={user?.email ?? "Non renseigné"} />
            <Info label="Rôle" value={user ? ROLE_LABEL[user.role] : "Compte Akwaba"} />
            <Info label="Statut" value="Actif" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={user ? dashboardPathForRole(user.role) : "/tableau-de-bord"}
              className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white hover:bg-gold-500"
            >
              Retour à mon espace
            </Link>
            <Link
              href="/academie"
              className="rounded-xl border border-brand-500 px-5 py-3 text-sm font-bold text-brand-500 hover:bg-brand-50"
            >
              Accéder à l&apos;Académie
            </Link>
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface-warm p-4">
      <div className="text-[11px] font-bold uppercase text-faint">{label}</div>
      <div className="mt-1 text-sm font-bold text-ink">{value}</div>
    </div>
  );
}
