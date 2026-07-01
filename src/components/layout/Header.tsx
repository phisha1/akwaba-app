"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { initials } from "@/lib/utils";
import {
  readDemoUser,
  clearDemoUser,
  dashboardPathForRole,
  ROLE_LABEL,
  type DemoUser,
} from "@/lib/demo-store";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  // Re-read the session on every navigation so the header stays in sync.
  useEffect(() => {
    setUser(readDemoUser());
    setReady(true);
  }, [pathname]);

  function logout() {
    clearDemoUser();
    setUser(null);
    setOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-10 md:h-[70px] lg:px-14">
        <Logo />

        {/* Desktop actions */}
        <div className="hidden min-h-[44px] items-center gap-3 md:flex">
          {!ready ? null : user ? (
            <>
              <Link
                href={dashboardPathForRole(user.role)}
                className="flex items-center gap-2 rounded-lg border-[1.5px] border-line py-1.5 pl-1.5 pr-3 transition-colors hover:border-brand-500"
              >
                <span
                  className="grid size-8 place-items-center rounded-[9px] text-[13px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#0E4D5C,#1a8a7c)" }}
                >
                  {initials(user.name)}
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-sm font-semibold text-ink">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="block text-[11px] text-faint">
                    {ROLE_LABEL[user.role]}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-brand-500"
              >
                <LogOut className="size-4" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-500"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-500"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg border-[1.5px] border-line text-ink"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="flex flex-col border-t border-line bg-white px-4 pb-4 pt-1 md:hidden">
          {user ? (
            <Link
              href={dashboardPathForRole(user.role)}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 text-sm font-semibold text-brand-500"
            >
              Mon espace ({user.name.split(" ")[0]})
            </Link>
          ) : (
            <Link
              href="/connexion"
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 text-sm font-medium text-brand-500"
            >
              Connexion
            </Link>
          )}
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-line px-5 py-3 text-sm font-semibold text-muted"
            >
              <LogOut className="size-4" />
              Se déconnecter
            </button>
          ) : (
            <Link
              href="/inscription"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-gold-400 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gold-500"
            >
              S&apos;inscrire
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
