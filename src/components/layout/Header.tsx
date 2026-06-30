"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/recherche", label: "Acheter" },
  { href: "/recherche?transaction=location", label: "Louer" },
  { href: "/articles", label: "Articles" },
  { href: "/formations", label: "Formations" },
  { href: "/filieres", label: "Filières" },
  { href: "/forum", label: "Forum" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href.split("?")[0];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-10 md:h-[70px] lg:px-14">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "border-b-2 pb-0.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "border-gold-400 text-brand-500"
                  : "border-transparent text-ink hover:text-brand-500",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
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
            Publier un bien
          </Link>
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
          <Link
            href="/connexion"
            onClick={() => setOpen(false)}
            className="border-b border-line/60 py-3 text-sm font-medium text-brand-500"
          >
            Connexion
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-line/60 py-3 text-sm font-medium transition-colors",
                isActive(item.href) ? "text-brand-500" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/inscription"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-lg bg-gold-400 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gold-500"
          >
            Publier un bien
          </Link>
        </nav>
      )}
    </header>
  );
}
