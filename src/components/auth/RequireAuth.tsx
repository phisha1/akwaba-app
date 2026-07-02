"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LockKeyhole, UserPlus } from "lucide-react";
import {
  dashboardPathForRole,
  readDemoUser,
  type DemoRole,
  type DemoUser,
} from "@/lib/demo-store";

export function RequireAuth({
  children,
  title = "Connexion requise",
  message = "Connectez-vous pour accéder à cet espace.",
  allowedRoles,
}: {
  children: React.ReactNode;
  title?: string;
  message?: string;
  allowedRoles?: DemoRole[];
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(readDemoUser());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="grid min-h-[420px] place-items-center bg-surface-warm px-6 text-sm text-muted">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return (
      <AccessPanel
        title={title}
        message={message}
        primaryHref={`/connexion?next=${encodeURIComponent(pathname)}`}
        primaryLabel="Se connecter"
        secondaryHref="/inscription"
        secondaryLabel="Créer un compte"
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <AccessPanel
        title="Espace réservé"
        message="Votre profil ne donne pas accès à cette partie de l'application."
        primaryHref={dashboardPathForRole(user.role)}
        primaryLabel="Retour à mon espace"
        secondaryHref="/"
        secondaryLabel="Accueil"
      />
    );
  }

  return <>{children}</>;
}

function AccessPanel({
  title,
  message,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  message: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="grid min-h-[520px] place-items-center bg-surface-warm px-6 py-14">
      <div className="w-full max-w-[520px] rounded-2xl border border-line bg-white p-7 text-center shadow-card">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
          <LockKeyhole className="size-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        <p className="mx-auto mt-2 max-w-[380px] text-sm leading-relaxed text-muted">
          {message}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white hover:bg-gold-500"
          >
            <LockKeyhole className="size-4" />
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
          >
            <UserPlus className="size-4" />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
