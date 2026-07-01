"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  CalendarDays,
  Mail,
  Eye,
  PlusSquare,
  Check,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Property, PropertyStatus, Visit } from "@/lib/types";
import {
  myProperties,
  readVisits,
  setPropertyStatus,
  deleteStoredPropertyById,
  setVisitStatus,
  readDemoUser,
} from "@/lib/demo-store";
import { currentUser, offers } from "@/lib/mock/dashboard";
import { STATUS_INFO } from "@/lib/utils";

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: "publie", label: "Publié" },
  { value: "reserve", label: "Réservé" },
  { value: "vendu", label: "Vendu" },
  { value: "loue", label: "Loué" },
];

const today = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

function priceLabel(p: Property) {
  const v = new Intl.NumberFormat("fr-FR").format(p.price);
  return p.transaction === "location" ? `${v}/mois` : v;
}

export function AgentDashboard() {
  const [biens, setBiens] = useState<Property[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [userName, setUserName] = useState(currentUser.name);

  const refresh = useCallback(() => {
    setBiens(myProperties());
    setVisits(readVisits());
  }, []);

  useEffect(() => {
    refresh();
    const u = readDemoUser();
    if (u?.name) setUserName(u.name);
  }, [refresh]);

  const activeCount = biens.filter((b) => b.status === "publie").length;
  const pendingVisits = visits.filter((v) => v.status === "attente").length;
  const totalViews = biens.reduce((sum, b) => sum + (b.views ?? 0), 0);

  const kpis = [
    { key: "biens", icon: Home, value: String(biens.length), label: "Biens actifs", badge: `${activeCount} publiés`, iconBg: "#EEF6F8", iconColor: "#0E4D5C", badgeBg: "#E6F4EC", badgeColor: "#1E7A4A" },
    { key: "visites", icon: CalendarDays, value: String(pendingVisits), label: "Visites en attente", badge: "À confirmer", iconBg: "#FEF3C7", iconColor: "#B45309", badgeBg: "#FEF3C7", badgeColor: "#B45309" },
    { key: "offres", icon: Mail, value: String(offers.length), label: "Offres reçues", badge: "Nouvelles", iconBg: "#E6F4EC", iconColor: "#1E7A4A", badgeBg: "#E6F4EC", badgeColor: "#1E7A4A" },
    { key: "vues", icon: Eye, value: totalViews.toLocaleString("fr-FR"), label: "Vues cumulées", badge: "+23% vs mois dernier", iconBg: "#EDE9FE", iconColor: "#6D28D9", badgeBg: "#EDE9FE", badgeColor: "#6D28D9" },
  ];

  function handleStatus(id: string, status: PropertyStatus) {
    setPropertyStatus(id, status);
    refresh();
  }

  function handleDelete(id: string, title: string) {
    if (window.confirm(`Supprimer l'annonce « ${title} » ?`)) {
      deleteStoredPropertyById(id);
      refresh();
    }
  }

  function handleVisit(id: string, status: "confirmee" | "refusee") {
    setVisitStatus(id, status);
    refresh();
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.4px] text-ink">
            Bonjour {userName.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-[13px] capitalize text-faint">
            {today} · {currentUser.city}
          </p>
        </div>
        <Link
          href="/tableau-de-bord/biens/nouveau"
          className="flex items-center gap-2 rounded-[10px] bg-gold-400 px-5 py-2.5 text-sm font-bold text-white shadow-[0_3px_10px_rgba(224,163,62,0.3)] transition-colors hover:bg-gold-500"
        >
          <PlusSquare className="size-4" />
          Publier un bien
        </Link>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.key} className="rounded-2xl border border-line bg-white p-5">
            <div className="mb-3.5 flex items-start justify-between">
              <span className="grid size-11 place-items-center rounded-xl" style={{ background: kpi.iconBg }}>
                <kpi.icon className="size-[22px]" style={{ color: kpi.iconColor }} />
              </span>
              <span className="rounded-md px-2 py-1 text-[11px] font-semibold" style={{ background: kpi.badgeBg, color: kpi.badgeColor }}>
                {kpi.badge}
              </span>
            </div>
            <div className="mb-1 text-[32px] font-extrabold tracking-[-0.5px] text-ink">
              {kpi.value}
            </div>
            <div className="text-[13px] font-medium text-muted">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* My listings */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-bold text-ink">Mes biens publiés</h2>
          <Link href="/recherche" className="text-[13px] font-semibold text-brand-500 hover:underline">
            Voir dans la recherche →
          </Link>
        </div>

        {biens.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-muted">
            Aucun bien pour l&apos;instant.{" "}
            <Link href="/tableau-de-bord/biens/nouveau" className="font-semibold text-brand-500 hover:underline">
              Publiez votre premier bien
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[2fr_90px_100px_140px_130px_70px_90px] items-center gap-2 border-b border-line bg-surface-cool px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                <span>Bien</span>
                <span>Type</span>
                <span>Transaction</span>
                <span>Prix</span>
                <span>Statut</span>
                <span>Vues</span>
                <span>Actions</span>
              </div>
              {biens.map((b) => {
                const status = STATUS_INFO[b.status];
                return (
                  <div
                    key={b.id}
                    className="grid grid-cols-[2fr_90px_100px_140px_130px_70px_90px] items-center gap-2 border-b border-[#F3F4F6] px-5 py-3 transition-colors last:border-0 hover:bg-surface-cool"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="h-9 w-10 shrink-0 rounded-[7px]" style={{ background: b.gradient }} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold text-ink">{b.title}</span>
                        <span className="block text-[11px] text-faint">{b.neighborhood}, {b.city}</span>
                      </span>
                    </div>
                    <span className="text-[13px] text-ink-soft">{b.type}</span>
                    <span className="text-[13px] capitalize text-ink-soft">{b.transaction}</span>
                    <span className="text-[13px] font-semibold text-brand-500">{priceLabel(b)}</span>
                    <span>
                      <select
                        value={b.status}
                        onChange={(e) => handleStatus(b.id, e.target.value as PropertyStatus)}
                        className="cursor-pointer rounded-md border-[1.5px] px-2 py-1 text-[11px] font-semibold outline-none"
                        style={{ background: status.bg, color: status.color, borderColor: status.bg }}
                      >
                        {STATUS_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value} className="bg-white text-ink">
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Eye className="size-3 text-faint" />
                      {b.views ?? 0}
                    </span>
                    <span className="flex gap-1.5">
                      <Link
                        href={`/tableau-de-bord/biens/nouveau?id=${b.id}`}
                        aria-label="Éditer"
                        className="grid size-7 place-items-center rounded-md bg-brand-50 text-brand-500 hover:bg-brand-100"
                      >
                        <Pencil className="size-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id, b.title)}
                        aria-label="Supprimer"
                        className="grid size-7 place-items-center rounded-md bg-[#FEE2E2] text-[#B91C1C] hover:brightness-95"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Visits + Offers */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Visits */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-[18px] py-3.5">
            <h2 className="text-[15px] font-bold text-ink">Demandes de visite</h2>
            <span className="rounded-md bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">
              {pendingVisits} en attente
            </span>
          </div>
          {visits.length === 0 ? (
            <div className="px-[18px] py-8 text-center text-sm text-muted">
              Aucune demande de visite pour l&apos;instant.
            </div>
          ) : (
            visits.map((v) => (
              <div key={v.id} className="flex items-center gap-3 border-b border-[#F3F4F6] px-[18px] py-3 last:border-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg,#0E4D5C,#1a7a8c)" }}>
                  {initials(v.visitorName)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-ink">{v.visitorName}</div>
                  <div className="truncate text-xs text-faint">
                    {v.propertyTitle}{v.preferredDate ? ` · ${v.preferredDate}` : ""}
                  </div>
                </div>
                {v.status === "attente" ? (
                  <div className="flex shrink-0 gap-1.5">
                    <button onClick={() => handleVisit(v.id, "confirmee")} aria-label="Confirmer" className="grid size-7 place-items-center rounded-md bg-[#E6F4EC] text-[#1E7A4A] hover:brightness-95">
                      <Check className="size-3.5" />
                    </button>
                    <button onClick={() => handleVisit(v.id, "refusee")} aria-label="Refuser" className="grid size-7 place-items-center rounded-md bg-[#FEE2E2] text-[#B91C1C] hover:brightness-95">
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <span
                    className="shrink-0 whitespace-nowrap rounded-[5px] px-2 py-0.5 text-[10px] font-semibold"
                    style={
                      v.status === "confirmee"
                        ? { background: "#E6F4EC", color: "#1E7A4A" }
                        : { background: "#F3F4F6", color: "#6B7280" }
                    }
                  >
                    {v.status === "confirmee" ? "Confirmée" : "Refusée"}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Offers (statique) */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-[18px] py-3.5">
            <h2 className="text-[15px] font-bold text-ink">Offres reçues</h2>
            <span className="rounded-md bg-[#E6F4EC] px-2.5 py-1 text-xs font-bold text-[#1E7A4A]">
              {offers.length} nouvelles
            </span>
          </div>
          {offers.map((o) => (
            <div key={o.name} className="border-b border-[#F3F4F6] px-[18px] py-3.5 last:border-0">
              <div className="mb-2.5 flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold text-white" style={{ background: o.gradient }}>
                  {o.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-ink">{o.name}</div>
                  <div className="truncate text-xs text-faint">{o.detail}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[15px] font-extrabold ${o.status === "refusee" ? "text-faint line-through" : "text-brand-500"}`}>
                    {o.amount}
                  </span>
                  <span className="ml-1.5 text-xs text-faint">{o.ask}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
