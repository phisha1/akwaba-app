import Link from "next/link";
import {
  Home,
  CalendarDays,
  Mail,
  Eye,
  PlusSquare,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";
import {
  currentUser,
  kpis,
  myListings,
  visitRequests,
  offers,
} from "@/lib/mock/dashboard";
import { STATUS_INFO } from "@/lib/utils";

const KPI_ICONS: Record<string, typeof Home> = {
  biens: Home,
  visites: CalendarDays,
  offres: Mail,
  vues: Eye,
};

const today = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

export default function TableauDeBordPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.4px] text-ink">
            Tableau de bord
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
        {kpis.map((kpi) => {
          const Icon = KPI_ICONS[kpi.key];
          return (
            <div key={kpi.key} className="rounded-2xl border border-line bg-white p-5">
              <div className="mb-3.5 flex items-start justify-between">
                <span
                  className="grid size-11 place-items-center rounded-xl"
                  style={{ background: kpi.iconBg }}
                >
                  <Icon className="size-[22px]" style={{ color: kpi.iconColor }} />
                </span>
                <span
                  className="rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{ background: kpi.badgeBg, color: kpi.badgeColor }}
                >
                  {kpi.badge}
                </span>
              </div>
              <div className="mb-1 text-[32px] font-extrabold tracking-[-0.5px] text-ink">
                {kpi.value}
              </div>
              <div className="text-[13px] font-medium text-muted">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* My listings table */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-bold text-ink">Mes biens publiés</h2>
          <button className="text-[13px] font-semibold text-brand-500 hover:underline">
            Voir tout →
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[2fr_90px_100px_140px_110px_70px_100px] items-center gap-2 border-b border-line bg-surface-cool px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
              <span>Bien</span>
              <span>Type</span>
              <span>Transaction</span>
              <span>Prix</span>
              <span>Statut</span>
              <span>Vues</span>
              <span>Actions</span>
            </div>
            {myListings.map((row) => {
              const status = STATUS_INFO[row.status];
              return (
                <div
                  key={row.id}
                  className="grid grid-cols-[2fr_90px_100px_140px_110px_70px_100px] items-center gap-2 border-b border-[#F3F4F6] px-5 py-3 transition-colors last:border-0 hover:bg-surface-cool"
                >
                  <Link href={`/annonces/${row.id}`} className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-9 w-10 shrink-0 rounded-[7px]"
                      style={{ background: row.gradient }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-semibold text-ink">
                        {row.title}
                      </span>
                      <span className="block text-[11px] text-faint">{row.city}</span>
                    </span>
                  </Link>
                  <span className="text-[13px] text-ink-soft">{row.type}</span>
                  <span className="text-[13px] text-ink-soft">{row.transaction}</span>
                  <span className="text-[13px] font-semibold text-brand-500">{row.price}</span>
                  <span>
                    <span
                      className="inline-block rounded-md px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {row.status === "publie" ? "Publié" : "Réservé"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Eye className="size-3 text-faint" />
                    {row.views}
                  </span>
                  <span className="flex gap-1.5">
                    <button className="rounded-md bg-brand-50 px-2.5 py-1.5 text-[11px] font-semibold text-brand-500 hover:bg-brand-100">
                      Éditer
                    </button>
                    <button className="grid place-items-center rounded-md bg-gray-100 px-2 text-muted hover:bg-gray-200">
                      <MoreHorizontal className="size-3.5" />
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visits + Offers */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Visits */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-[18px] py-3.5">
            <h2 className="text-[15px] font-bold text-ink">Demandes de visite</h2>
            <span className="rounded-md bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">
              3 en attente
            </span>
          </div>
          {visitRequests.map((v) => (
            <div
              key={v.name}
              className="flex items-center gap-3 border-b border-[#F3F4F6] px-[18px] py-3 last:border-0"
            >
              <Avatar initials={v.initials} gradient={v.gradient} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-ink">{v.name}</div>
                <div className="truncate text-xs text-faint">{v.detail}</div>
              </div>
              <StatusBadge
                label={v.status === "attente" ? "En attente" : "Confirmée"}
                tone={v.status === "attente" ? "warn" : "success"}
              />
              {v.status === "attente" ? (
                <div className="flex shrink-0 gap-1.5">
                  <ActionIcon tone="success">
                    <Check className="size-3.5" />
                  </ActionIcon>
                  <ActionIcon tone="danger">
                    <X className="size-3.5" />
                  </ActionIcon>
                </div>
              ) : (
                <ActionIcon tone="muted">
                  <MoreHorizontal className="size-3.5" />
                </ActionIcon>
              )}
            </div>
          ))}
        </div>

        {/* Offers */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-[18px] py-3.5">
            <h2 className="text-[15px] font-bold text-ink">Offres reçues</h2>
            <span className="rounded-md bg-[#E6F4EC] px-2.5 py-1 text-xs font-bold text-[#1E7A4A]">
              2 nouvelles
            </span>
          </div>
          {offers.map((o) => (
            <div key={o.name} className="border-b border-[#F3F4F6] px-[18px] py-3.5 last:border-0">
              <div className="mb-2.5 flex items-center gap-3">
                <Avatar initials={o.initials} gradient={o.gradient} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-ink">{o.name}</div>
                  <div className="truncate text-xs text-faint">{o.detail}</div>
                </div>
                <StatusBadge
                  label={o.status === "attente" ? "En attente" : "Refusée"}
                  tone={o.status === "attente" ? "warn" : "muted"}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`text-[15px] font-extrabold ${
                      o.status === "refusee"
                        ? "text-faint line-through"
                        : "text-brand-500"
                    }`}
                  >
                    {o.amount}
                  </span>
                  <span className="ml-1.5 text-xs text-faint">{o.ask}</span>
                </div>
                {o.status === "attente" ? (
                  <div className="flex gap-1.5">
                    <button className="rounded-[7px] bg-[#E6F4EC] px-2.5 py-1.5 text-[11px] font-semibold text-[#1E7A4A] hover:brightness-95">
                      Accepter
                    </button>
                    <button className="rounded-[7px] bg-brand-50 px-2.5 py-1.5 text-[11px] font-semibold text-brand-500 hover:bg-brand-100">
                      Négocier
                    </button>
                  </div>
                ) : (
                  <button className="rounded-[7px] bg-gray-100 px-2.5 py-1.5 text-[11px] font-semibold text-muted hover:bg-gray-200">
                    Voir détail
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold text-white"
      style={{ background: gradient }}
    >
      {initials}
    </span>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "warn" | "success" | "muted";
}) {
  const styles = {
    warn: "bg-gold-100 text-gold-700",
    success: "bg-[#E6F4EC] text-[#1E7A4A]",
    muted: "bg-gray-100 text-muted",
  }[tone];
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}

function ActionIcon({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "danger" | "muted";
}) {
  const styles = {
    success: "bg-[#E6F4EC] text-[#1E7A4A]",
    danger: "bg-[#FEE2E2] text-[#B91C1C]",
    muted: "bg-gray-100 text-muted",
  }[tone];
  return (
    <button
      className={`grid size-7 place-items-center rounded-md ${styles} hover:brightness-95`}
    >
      {children}
    </button>
  );
}
