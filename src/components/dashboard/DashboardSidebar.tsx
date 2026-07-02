"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import {
  clearDemoUser,
  readDemoUser,
  ROLE_LABEL,
  type DemoRole,
  type DemoUser,
} from "@/lib/demo-store";
import { initials } from "@/lib/utils";

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  badgeStyle?: string;
};

const ADMIN_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Vue globale", href: "/tableau-de-bord/admin" },
  { icon: Home, label: "Tous les biens", href: "/recherche" },
  { icon: BookOpen, label: "Académie", href: "/academie" },
  { icon: CalendarDays, label: "Visites", href: "/tableau-de-bord/admin#visites", badge: "3", badgeStyle: "bg-gold-400 text-white" },
  { icon: Mail, label: "Offres", href: "/tableau-de-bord/admin#offres", badge: "2", badgeStyle: "bg-[#4DE8A0] text-[#0a3d2a]" },
];

const NAV_BY_ROLE: Record<Exclude<DemoRole, "admin">, NavItem[]> = {
  acheteur: [
    { icon: LayoutDashboard, label: "Mon espace", href: "/tableau-de-bord/acheteur" },
    { icon: Search, label: "Acheter", href: "/recherche?transaction=vente" },
    { icon: Home, label: "Louer", href: "/recherche?transaction=location" },
    { icon: BookOpen, label: "Académie", href: "/academie" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
  locataire: [
    { icon: LayoutDashboard, label: "Mon espace", href: "/tableau-de-bord/acheteur" },
    { icon: Home, label: "Louer", href: "/recherche?transaction=location" },
    { icon: Search, label: "Acheter", href: "/recherche?transaction=vente" },
    { icon: BookOpen, label: "Académie", href: "/academie" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
  apprenant: [
    { icon: GraduationCap, label: "Académie", href: "/academie" },
    { icon: BookOpen, label: "Articles", href: "/articles" },
    { icon: GraduationCap, label: "Formations", href: "/formations" },
    { icon: MessageCircle, label: "Forum", href: "/forum" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
  particulier: [
    { icon: LayoutDashboard, label: "Mes annonces", href: "/tableau-de-bord" },
    { icon: Home, label: "Publier mon bien", href: "/tableau-de-bord/biens/nouveau", badge: "+", badgeStyle: "bg-white/15 text-white" },
    { icon: CalendarDays, label: "Visites", href: "/tableau-de-bord#visites", badge: "3", badgeStyle: "bg-gold-400 text-white" },
    { icon: Mail, label: "Offres", href: "/tableau-de-bord#offres", badge: "2", badgeStyle: "bg-[#4DE8A0] text-[#0a3d2a]" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
  agent: [
    { icon: LayoutDashboard, label: "Portefeuille", href: "/tableau-de-bord" },
    { icon: Home, label: "Publier un bien", href: "/tableau-de-bord/biens/nouveau", badge: "+", badgeStyle: "bg-white/15 text-white" },
    { icon: CalendarDays, label: "Visites", href: "/tableau-de-bord#visites", badge: "3", badgeStyle: "bg-gold-400 text-white" },
    { icon: Mail, label: "Offres", href: "/tableau-de-bord#offres", badge: "2", badgeStyle: "bg-[#4DE8A0] text-[#0a3d2a]" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
  expert: [
    { icon: LayoutDashboard, label: "Espace expert", href: "/tableau-de-bord/expert" },
    { icon: GraduationCap, label: "Académie", href: "/academie" },
    { icon: PenLine, label: "Nouvel article", href: "/tableau-de-bord/articles/nouveau" },
    { icon: BookOpen, label: "Nouvelle formation", href: "/tableau-de-bord/formations/nouveau" },
    { icon: MessageCircle, label: "Forum", href: "/forum" },
    { icon: User, label: "Mon profil", href: "/tableau-de-bord/profil" },
  ],
};

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<DemoUser | null>(null);
  const name = user?.name ?? "Utilisateur Akwaba";
  const roleLabel = user ? ROLE_LABEL[user.role] : "Compte Akwaba";
  const nav = user
    ? user.role === "admin"
      ? ADMIN_NAV
      : NAV_BY_ROLE[user.role]
    : [];

  function logout() {
    clearDemoUser();
    router.push("/");
  }

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(readDemoUser());
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <aside className="hidden w-60 shrink-0 flex-col overflow-y-auto bg-brand-500 lg:flex">
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-[13px] text-[17px] font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.08))",
            }}
          >
            {initials(name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-white">{name}</div>
            <div className="text-xs text-white/55">{roleLabel}</div>
          </div>
        </div>
        {user?.role === "agent" && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1">
            <ShieldCheck className="size-[11px] text-[#4DE8A0]" />
            <span className="text-[11px] font-semibold text-white/85">
              Agent certifié
            </span>
          </span>
        )}
      </div>

      <nav className="flex-1 py-2">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                active
                  ? "border-l-[3px] border-gold-400 bg-white/10 font-semibold text-white"
                  : "font-medium text-white/70 hover:bg-white/[0.08]"
              }`}
            >
              <item.icon
                className={`size-[17px] ${active ? "text-gold-400" : "text-white/60"}`}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto rounded-[10px] px-1.5 py-0.5 text-[11px] font-bold ${item.badgeStyle}`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2.5 py-2 text-[13px] font-medium text-white/45 transition-opacity hover:opacity-70"
        >
          <LogOut className="size-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "#") return false;
  const cleanHref = href.split("#")[0].split("?")[0];
  if (cleanHref === "/tableau-de-bord") return pathname === cleanHref;
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}
