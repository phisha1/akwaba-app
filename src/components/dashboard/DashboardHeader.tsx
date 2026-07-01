"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { readDemoUser, type DemoUser } from "@/lib/demo-store";
import { initials } from "@/lib/utils";

export function DashboardHeader() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const name = user?.name ?? "Utilisateur Akwaba";
  const firstName = name.split(" ")[0] || "Utilisateur";

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUser(readDemoUser());
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-line bg-white px-5 sm:px-8 lg:px-14">
      <Logo />

      <div className="flex items-center gap-3.5">
        <button className="relative" aria-label="Notifications">
          <Bell className="size-[22px] text-muted" />
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full border-2 border-white bg-gold-400 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        <button className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-line bg-white py-1.5 pl-1.5 pr-3 transition-colors hover:border-brand-500">
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
        </button>
      </div>
    </header>
  );
}
