import { ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import type { VerificationStatus } from "@/lib/types";
import { VERIFICATION_INFO } from "@/lib/utils";

const ICON: Record<VerificationStatus, typeof ShieldCheck> = {
  verifie: ShieldCheck,
  en_cours: Clock,
  non_verifie: ShieldAlert,
};

/** Small trust pill shown on cards and in the dashboard. */
export function VerificationBadge({
  status,
  className = "",
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const info = VERIFICATION_INFO[status];
  const Icon = ICON[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${className}`}
      style={{ background: info.bg, color: info.color }}
    >
      <Icon className="size-3" />
      {info.short}
    </span>
  );
}
