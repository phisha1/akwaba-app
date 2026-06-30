import Link from "next/link";
import { Logo } from "./Logo";

const NAV = [
  { href: "/recherche", label: "Acheter" },
  { href: "/recherche?transaction=location", label: "Louer" },
  { href: "/annuaire", label: "Annuaire" },
  { href: "/metiers", label: "Métiers" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-brand-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="hidden text-sm font-semibold text-ink-soft hover:text-brand-500 sm:block"
          >
            Connexion
          </Link>
          <Link
            href="/inscription"
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Publier une annonce
          </Link>
        </div>
      </div>
    </header>
  );
}
