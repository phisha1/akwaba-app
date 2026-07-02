"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown, GraduationCap } from "lucide-react";
import { Logo } from "./Logo";
import { initials } from "@/lib/utils";
import {
  readDemoUser,
  clearDemoUser,
  dashboardPathForRole,
  ROLE_LABEL,
  type DemoUser,
} from "@/lib/demo-store";

// Pilier 1 — Immobilier (la place de marché)
const NAV_MARKET = [
  { href: "/recherche?transaction=vente", label: "Acheter", transaction: "vente" },
  { href: "/recherche?transaction=location", label: "Louer", transaction: "location" },
];

// Pilier 2 — Académie (contenus & communauté)
const NAV_ACADEMY = [
  { href: "/articles", label: "Articles" },
  { href: "/formations", label: "Formations" },
  { href: "/filieres", label: "Filières" },
  { href: "/forum", label: "Forum" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // menu mobile
  const [acad, setAcad] = useState(false); // menu déroulant Académie (desktop)
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  const [navTransaction, setNavTransaction] = useState("vente");
  const acadRef = useRef<HTMLDivElement>(null);

  // Re-read the session on every navigation so the header stays in sync.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(readDemoUser());
      setReady(true);
      const query = new URLSearchParams(window.location.search);
      setNavTransaction(query.get("transaction") === "location" ? "location" : "vente");
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    function onTransactionChange(event: Event) {
      const detail = (event as CustomEvent<{ transaction?: string }>).detail;
      setNavTransaction(detail?.transaction === "location" ? "location" : "vente");
    }

    window.addEventListener("akwaba:transaction-change", onTransactionChange);
    return () =>
      window.removeEventListener("akwaba:transaction-change", onTransactionChange);
  }, []);

  // Close menus when the route changes.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setAcad(false);
      setOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Close the Académie dropdown on outside click.
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (acadRef.current && !acadRef.current.contains(e.target as Node)) {
        setAcad(false);
      }
    }
    if (acad) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [acad]);

  function logout() {
    clearDemoUser();
    setUser(null);
    setOpen(false);
    router.push("/");
  }

  const showAcademy = true;
  const academyItems = user ? NAV_ACADEMY : [];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-10 md:h-[70px] lg:px-14">
        {/* Left: logo + two-pillar nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Logo />
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_MARKET.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setNavTransaction(item.transaction)}
                className={`text-sm font-medium transition-colors ${
                  pathname === "/recherche" && navTransaction === item.transaction
                    ? "text-brand-500"
                    : "text-ink hover:text-brand-500"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {showAcademy && (
              <>
                <span className="h-4 w-px bg-line" />

                <div className="relative flex items-center gap-1.5" ref={acadRef}>
                  <Link
                    href="/academie"
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      pathname === "/academie"
                        ? "text-brand-500"
                        : "text-ink hover:text-brand-500"
                    }`}
                  >
                    <GraduationCap className="size-4 text-brand-500" />
                    Académie
                  </Link>
                  {academyItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setAcad((v) => !v)}
                      aria-label="Ouvrir le menu Académie"
                      aria-expanded={acad}
                      className="grid size-7 place-items-center rounded-md text-faint transition-colors hover:bg-surface-warm hover:text-brand-500"
                    >
                      <ChevronDown
                        className={`size-3.5 text-faint transition-transform ${acad ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                  {acad && (
                    <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-pop">
                      <div className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide text-faint">
                        Se former & échanger
                      </div>
                      {academyItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-warm hover:text-brand-500"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Right: auth actions (desktop) */}
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

        {/* Mobile menu button */}
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
        <nav className="flex flex-col border-t border-line bg-white px-4 pb-4 md:hidden">
          <Section label="Immobilier" />
          {NAV_MARKET.map((item) => (
            <MobileLink key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </MobileLink>
          ))}

          {showAcademy && (
            <>
              <Section label="Académie" />
              <MobileLink href="/academie" onClick={() => setOpen(false)}>
                Accueil Académie
              </MobileLink>
              {academyItems.map((item) => (
                <MobileLink key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
            </>
          )}

          <Section label="Compte" />
          {user ? (
            <>
              <MobileLink
                href={dashboardPathForRole(user.role)}
                onClick={() => setOpen(false)}
              >
                Mon espace ({user.name.split(" ")[0]})
              </MobileLink>
              <button
                type="button"
                onClick={logout}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-line px-5 py-3 text-sm font-semibold text-muted"
              >
                <LogOut className="size-4" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <MobileLink href="/connexion" onClick={() => setOpen(false)}>
                Se connecter
              </MobileLink>
              <Link
                href="/inscription"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-gold-400 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gold-500"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

function Section({ label }: { label: string }) {
  return (
    <div className="px-1 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wide text-faint">
      {label}
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-line/60 py-3 text-sm font-medium text-ink transition-colors hover:text-brand-500"
    >
      {children}
    </Link>
  );
}
