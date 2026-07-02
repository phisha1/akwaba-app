"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Home,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import type { DemoAccount, DemoRole } from "@/lib/demo-store";
import {
  ROLE_LABEL,
  getAllProperties,
  readAllDemoAccounts,
  readOffers,
  readVisits,
} from "@/lib/demo-store";
import type { Offer, Property, Visit } from "@/lib/types";
import { getVerification } from "@/lib/utils";
import { actors } from "@/lib/mock/actors";
import { articles, filieres, formations, forumQuestions } from "@/lib/mock/learning";

const ROLE_ORDER: DemoRole[] = [
  "acheteur",
  "locataire",
  "apprenant",
  "particulier",
  "agent",
  "expert",
  "admin",
];

export function AdminDashboard() {
  const [accounts, setAccounts] = useState<DemoAccount[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setAccounts(readAllDemoAccounts());
      setProperties(getAllProperties());
      setVisits(readVisits());
      setOffers(readOffers());
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  const roleRows = useMemo(
    () =>
      ROLE_ORDER.map((role) => ({
        role,
        label: ROLE_LABEL[role],
        count: accounts.filter((account) => account.role === role).length,
      })),
    [accounts],
  );

  const published = properties.filter((property) => property.status === "publie").length;
  const verified = properties.filter((property) => getVerification(property) === "verifie").length;
  const pendingVerification = properties.filter(
    (property) => getVerification(property) === "en_cours",
  ).length;
  const pendingVisits = visits.filter((visit) => visit.status === "attente").length;
  const pendingOffers = offers.filter((offer) => offer.status === "attente").length;
  const unresolvedForum = forumQuestions.filter((question) => !question.solved).length;
  const unverifiedActors = actors.filter((actor) => !actor.verified).length;

  const kpis = [
    {
      label: "Comptes",
      value: accounts.length,
      detail: `${roleRows.find((row) => row.role === "admin")?.count ?? 0} admin`,
      icon: Users,
      bg: "#EEF6F8",
      color: "#0E4D5C",
    },
    {
      label: "Biens",
      value: properties.length,
      detail: `${published} publiés`,
      icon: Home,
      bg: "#FEF3C7",
      color: "#B45309",
    },
    {
      label: "Demandes",
      value: visits.length + offers.length,
      detail: `${pendingVisits + pendingOffers} à traiter`,
      icon: Mail,
      bg: "#E6F4EC",
      color: "#1E7A4A",
    },
    {
      label: "Académie",
      value: articles.length + formations.length + forumQuestions.length,
      detail: `${filieres.length} filières`,
      icon: GraduationCap,
      bg: "#EDE9FE",
      color: "#6D28D9",
    },
  ];

  const queues = [
    {
      label: "Vérifications de biens",
      value: pendingVerification,
      desc: `${verified} biens déjà vérifiés`,
      icon: ShieldCheck,
      href: "/recherche",
    },
    {
      label: "Visites en attente",
      value: pendingVisits,
      desc: "Demandes à confirmer ou refuser",
      icon: CalendarDays,
      href: "/tableau-de-bord/admin#visites",
    },
    {
      label: "Offres en attente",
      value: pendingOffers,
      desc: "Offres acheteurs à traiter",
      icon: Mail,
      href: "/tableau-de-bord/admin#offres",
    },
    {
      label: "Forum non résolu",
      value: unresolvedForum,
      desc: "Questions encore ouvertes",
      icon: MessageCircle,
      href: "/forum",
    },
    {
      label: "Acteurs non vérifiés",
      value: unverifiedActors,
      desc: "Annuaire à contrôler",
      icon: AlertTriangle,
      href: "/annuaire",
    },
  ];

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
            <UserCog className="size-3.5" />
            Administrateur
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-ink">
            Vue globale Akwaba
          </h1>
          <p className="mt-1 max-w-[760px] text-sm leading-relaxed text-muted">
            Supervision des comptes, des biens, des demandes, des offres et du
            pilier Académie depuis un seul tableau.
          </p>
        </div>
        <Link
          href="/academie"
          className="inline-flex items-center gap-2 rounded-[10px] bg-gold-400 px-5 py-2.5 text-sm font-bold text-white shadow-[0_3px_10px_rgba(224,163,62,0.3)] hover:bg-gold-500"
        >
          <GraduationCap className="size-4" />
          Voir Académie
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-line bg-white p-5">
            <div className="mb-3.5 flex items-start justify-between">
              <span
                className="grid size-11 place-items-center rounded-xl"
                style={{ background: kpi.bg }}
              >
                <kpi.icon className="size-[22px]" style={{ color: kpi.color }} />
              </span>
              <span className="rounded-md bg-surface-cool px-2 py-1 text-[11px] font-semibold text-muted">
                {kpi.detail}
              </span>
            </div>
            <div className="mb-1 text-[32px] font-extrabold tracking-[-0.5px] text-ink">
              {kpi.value}
            </div>
            <div className="text-[13px] font-medium text-muted">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-base font-bold text-ink">Points à traiter</h2>
          </div>
          <div>
            {queues.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 border-b border-[#F3F4F6] px-5 py-4 last:border-0 hover:bg-surface-cool"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
                  <item.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">{item.label}</span>
                  <span className="block text-xs text-muted">{item.desc}</span>
                </span>
                <span className="grid size-8 place-items-center rounded-lg bg-surface-warm text-sm font-extrabold text-ink">
                  {item.value}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-4 text-base font-bold text-ink">Répartition des comptes</h2>
          <div className="space-y-3">
            {roleRows.map((row) => {
              const percent = accounts.length ? Math.round((row.count / accounts.length) * 100) : 0;
              return (
                <div key={row.role}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-ink">{row.label}</span>
                    <span className="text-xs font-bold text-muted">{row.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-cool">
                    <div
                      className="h-2 rounded-full bg-brand-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PillarPanel
          icon={Building2}
          title="Immobilier"
          rows={[
            ["Biens publiés", String(published)],
            ["Biens vérifiés", String(verified)],
            ["Acteurs annuaire", String(actors.length)],
          ]}
          href="/recherche"
        />
        <PillarPanel
          icon={GraduationCap}
          title="Académie"
          rows={[
            ["Articles", String(articles.length)],
            ["Formations", String(formations.length)],
            ["Filières", String(filieres.length)],
            ["Questions forum", String(forumQuestions.length)],
          ]}
          href="/academie"
        />
        <PillarPanel
          icon={CheckCircle2}
          title="Transactions"
          rows={[
            ["Visites", String(visits.length)],
            ["Offres", String(offers.length)],
            ["Demandes en attente", String(pendingVisits + pendingOffers)],
          ]}
          href="/tableau-de-bord/admin#visites"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section
          id="visites"
          className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white"
        >
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-base font-bold text-ink">Visites à superviser</h2>
            <p className="mt-1 text-xs text-muted">
              Toutes les demandes de visite visibles par l&apos;administration.
            </p>
          </div>
          <div>
            {visits.length ? (
              visits.map((visit) => (
                <AdminRequestRow
                  key={visit.id}
                  href={`/annonces/${visit.propertyId}`}
                  title={visit.propertyTitle}
                  primary={visit.visitorName}
                  meta={visit.preferredDate ?? visit.createdAt}
                  badge={VISIT_STATUS_LABEL[visit.status]}
                  detail={visit.phone}
                />
              ))
            ) : (
              <EmptyRow label="Aucune visite enregistrée." />
            )}
          </div>
        </section>

        <section
          id="offres"
          className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white"
        >
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-base font-bold text-ink">Offres à superviser</h2>
            <p className="mt-1 text-xs text-muted">
              Propositions reçues sur les biens à vendre ou à louer.
            </p>
          </div>
          <div>
            {offers.length ? (
              offers.map((offer) => (
                <AdminRequestRow
                  key={offer.id}
                  href={`/annonces/${offer.propertyId}`}
                  title={offer.propertyTitle}
                  primary={offer.buyerName}
                  meta={formatAdminMoney(offer.amount)}
                  badge={OFFER_STATUS_LABEL[offer.status]}
                  detail={offer.phone}
                />
              ))
            ) : (
              <EmptyRow label="Aucune offre enregistrée." />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const VISIT_STATUS_LABEL: Record<Visit["status"], string> = {
  attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
};

const OFFER_STATUS_LABEL: Record<Offer["status"], string> = {
  attente: "En attente",
  acceptee: "Acceptée",
  refusee: "Refusée",
};

function PillarPanel({
  icon: Icon,
  title,
  rows,
  href,
}: {
  icon: typeof FileText;
  title: string;
  rows: [string, string][];
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <Icon className="mb-4 size-6 text-brand-500" />
      <h2 className="mb-4 text-base font-extrabold text-ink">{title}</h2>
      <div className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">{label}</span>
            <span className="font-extrabold text-ink">{value}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

function AdminRequestRow({
  href,
  title,
  primary,
  meta,
  badge,
  detail,
}: {
  href: string;
  title: string;
  primary: string;
  meta: string;
  badge: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 border-b border-[#F3F4F6] px-5 py-4 last:border-0 hover:bg-surface-cool"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
        <FileText className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-ink">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-muted">
          {primary} · {detail}
        </span>
      </span>
      <span className="hidden text-xs font-bold text-muted sm:block">{meta}</span>
      <span className="rounded-md bg-surface-warm px-2 py-1 text-[11px] font-bold text-ink">
        {badge}
      </span>
    </Link>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div className="px-5 py-5 text-sm text-muted">{label}</div>;
}

function formatAdminMoney(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}
