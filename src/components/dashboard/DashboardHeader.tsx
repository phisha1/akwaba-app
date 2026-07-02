"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import {
  readDemoUser,
  readOffers,
  readVisits,
  type DemoUser,
} from "@/lib/demo-store";
import { initials } from "@/lib/utils";

export function DashboardHeader() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [pendingVisits, setPendingVisits] = useState(0);
  const [pendingOffers, setPendingOffers] = useState(0);
  const name = user?.name ?? "Utilisateur Akwaba";
  const firstName = name.split(" ")[0] || "Utilisateur";
  const notificationsCount = pendingVisits + pendingOffers;
  const baseDashboardHref = user?.role === "admin" ? "/tableau-de-bord/admin" : "/tableau-de-bord";

  useEffect(() => {
    const id = window.setTimeout(() => {
      const nextUser = readDemoUser();
      const canManageRequests =
        nextUser?.role === "admin" ||
        nextUser?.role === "agent" ||
        nextUser?.role === "particulier";
      setUser(nextUser);
      setPendingVisits(
        canManageRequests
          ? readVisits().filter((visit) => visit.status === "attente").length
          : 0,
      );
      setPendingOffers(
        canManageRequests
          ? readOffers().filter((offer) => offer.status === "attente").length
          : 0,
      );
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-line bg-white px-5 sm:px-8 lg:px-14">
      <Logo />

      <div className="flex items-center gap-3.5">
        <div className="relative">
          <button
            type="button"
            className="relative grid size-9 place-items-center rounded-lg transition-colors hover:bg-surface-warm"
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            onClick={() => setNotificationOpen((value) => !value)}
          >
            <Bell className="size-[22px] text-muted" />
            {notificationsCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full border-2 border-white bg-gold-400 text-[8px] font-bold text-white">
                {notificationsCount}
              </span>
            )}
          </button>
          {notificationOpen && (
            <div className="absolute right-0 top-full z-[80] mt-3 w-72 overflow-hidden rounded-xl border border-line bg-white shadow-pop">
              <div className="border-b border-line px-4 py-3">
                <div className="text-sm font-extrabold text-ink">Notifications</div>
                <div className="mt-0.5 text-xs text-muted">
                  {notificationsCount > 0
                    ? `${notificationsCount} demande(s) à traiter`
                    : "Aucune demande en attente"}
                </div>
              </div>
              <Link
                href={`${baseDashboardHref}#visites`}
                className="block border-b border-line px-4 py-3 text-sm hover:bg-surface-warm"
                onClick={() => setNotificationOpen(false)}
              >
                <span className="font-bold text-ink">{pendingVisits} visite(s)</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Demandes de visite à confirmer
                </span>
              </Link>
              <Link
                href={`${baseDashboardHref}#offres`}
                className="block px-4 py-3 text-sm hover:bg-surface-warm"
                onClick={() => setNotificationOpen(false)}
              >
                <span className="font-bold text-ink">{pendingOffers} offre(s)</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Propositions à examiner
                </span>
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/tableau-de-bord/profil"
          className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-line bg-white py-1.5 pl-1.5 pr-3 transition-colors hover:border-brand-500"
        >
          <span
            className="grid size-8 place-items-center rounded-[9px] text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#0E4D5C,#1a8a7c)" }}
          >
            {initials(name)}
          </span>
          <span className="hidden text-sm font-semibold text-ink sm:block">
            {firstName}
          </span>
          <ChevronDown className="size-3.5 text-faint" />
        </Link>
      </div>
    </header>
  );
}
