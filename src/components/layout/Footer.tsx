import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Explorer",
    links: [
      { href: "/recherche", label: "Acheter" },
      { href: "/recherche?transaction=location", label: "Louer" },
      { href: "/annuaire", label: "Annuaire des acteurs" },
      { href: "/metiers", label: "Métiers de l'immobilier" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/connexion", label: "Connexion" },
      { href: "/inscription", label: "Inscription" },
      { href: "/tableau-de-bord", label: "Tableau de bord" },
    ],
  },
  {
    title: "Akwaba Immo",
    links: [
      { href: "#", label: "À propos" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Conditions d'utilisation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-warm">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            La plateforme immobilière du Cameroun. Annonces vérifiées, agents
            certifiés et acteurs de confiance.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-ink">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-faint sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Akwaba Immo. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
