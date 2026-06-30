"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/recherche", label: "Acheter" },
  { href: "/recherche?transaction=location", label: "Louer" },
  { href: "/annuaire", label: "Annuaire" },
  { href: "/metiers", label: "Métiers" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href.split("?")[0];
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "border-b-2 pb-0.5 text-sm font-medium transition-colors",
                  active
                    ? "border-gold-400 text-brand-500"
                    : "border-transparent text-ink hover:text-brand-500",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="hidden px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-500 sm:block"
          >
            Se connecter
          </Link>
          <Link
            href="/inscription"
            className="rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-500"
          >
            Publier un bien
          </Link>
        </div>
      </div>
    </header>
  );
}
