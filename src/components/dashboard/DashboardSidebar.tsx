"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Mail,
  User,
  LogOut,
  ShieldCheck,
  BookOpen,
  PenLine,
} from "lucide-react";
import {
  readDemoUser,
  clearDemoUser,
  ROLE_LABEL,
  type DemoUser,
} from "@/lib/demo-store";
import { initials } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/tableau-de-bord", active: true },
  { icon: Home, label: "Publier un bien", href: "/tableau-de-bord/biens/nouveau", badge: "+", badgeStyle: "bg-white/15 text-white" },
  { icon: BookOpen, label: "Articles experts", href: "/tableau-de-bord/articles/nouveau" },
  { icon: PenLine, label: "Formations", href: "/tableau-de-bord/expert" },
  { icon: CalendarDays, label: "Visites", href: "#", badge: "3", badgeStyle: "bg-gold-400 text-white" },
  { icon: Mail, label: "Offres", href: "#", badge: "2", badgeStyle: "bg-[#4DE8A0] text-[#0a3d2a]" },
  { icon: User, label: "Mon profil", href: "#" },
];

export function DashboardSidebar() {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);
  const name = user?.name ?? "Utilisateur Akwaba";
  const roleLabel = user ? ROLE_LABEL[user.role] : "Compte Akwaba";

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
      {/* User */}
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-[13px] text-[17px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,rgba(255,255,255,.15),rgba(255,255,255,.08))" }}
          >
            {initials(name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-white">
              {name}
            </div>
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

      {/* Nav */}
      <nav className="flex-1 py-2">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
              item.active
                ? "border-l-[3px] border-gold-400 bg-white/10 font-semibold text-white"
                : "font-medium text-white/70 hover:bg-white/[0.08]"
            }`}
          >
            <item.icon
              className={`size-[17px] ${item.active ? "text-gold-400" : "text-white/60"}`}
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
        ))}
      </nav>

      {/* Logout */}
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
