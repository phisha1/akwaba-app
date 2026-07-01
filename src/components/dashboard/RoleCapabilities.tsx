import { Check, X } from "lucide-react";
import { ROLE_CAPABILITIES, ROLE_LABEL, type DemoRole } from "@/lib/demo-store";

/** Shows what the current profile can (✓) and cannot (✗) do. */
export function RoleCapabilities({ role }: { role: DemoRole }) {
  const { can, cannot } = ROLE_CAPABILITIES[role];
  const isAdmin = role === "admin";

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-base font-bold text-ink">Votre profil</h2>
        <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-500">
          {ROLE_LABEL[role]}
        </span>
      </div>
      <p className="mb-5 text-[13px] text-muted">
        Ce que vous pouvez faire — et ce qui n&apos;est pas disponible avec ce
        profil.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#1E7A4A]">
            Autorisé
          </div>
          <ul className="flex flex-col gap-2.5">
            {can.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#E6F4EC]">
                  <Check className="size-3 text-[#1E7A4A]" />
                </span>
                <span className="text-[13px] leading-snug text-ink-soft">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-faint">
            {isAdmin ? "Restrictions" : "Non disponible"}
          </div>
          <ul className="flex flex-col gap-2.5">
            {cannot.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#F3F4F6]">
                  <X className="size-3 text-[#9CA3AF]" />
                </span>
                <span className="text-[13px] leading-snug text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
