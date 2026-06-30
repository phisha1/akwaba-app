import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Rechercher",
    links: [
      { href: "/recherche?transaction=vente&type=Maison", label: "Maisons à vendre" },
      { href: "/recherche?transaction=location", label: "Appartements à louer" },
      { href: "/recherche?type=Terrain", label: "Terrains" },
      { href: "/recherche?type=Local%20commercial", label: "Locaux commerciaux" },
    ],
  },
  {
    title: "Villes",
    links: [
      { href: "/recherche?ville=Yaoundé", label: "Yaoundé" },
      { href: "/recherche?ville=Douala", label: "Douala" },
      { href: "/recherche?ville=Bafoussam", label: "Bafoussam" },
      { href: "/recherche?ville=Kribi", label: "Kribi" },
    ],
  },
  {
    title: "Akwaba Immo",
    links: [
      { href: "#", label: "À propos" },
      { href: "/annuaire", label: "Nos agents" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Contact" },
    ],
  },
];

const SOCIALS = ["FB", "IN", "TW"];

export function Footer() {
  return (
    <footer className="bg-brand-500 px-6 pb-8 pt-14 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 grid gap-12 md:grid-cols-[2.5fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mb-6 mt-4 max-w-[280px] text-sm leading-relaxed text-white/60">
              La plateforme immobilière de référence au Cameroun.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <span
                  key={s}
                  className="grid size-9 cursor-pointer place-items-center rounded-lg bg-white/10 text-[11px] font-bold text-white transition-colors hover:bg-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-white/40">
                {col.title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Akwaba Immo · Tous droits réservés</span>
          <span>Fait au 🇨🇲 Cameroun</span>
        </div>
      </div>
    </footer>
  );
}
