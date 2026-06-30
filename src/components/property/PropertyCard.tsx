import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { STATUS_INFO, TRANSACTION_LABEL, formatPrice } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  const status = STATUS_INFO[property.status];

  return (
    <Link
      href={`/annonces/${property.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(14,77,92,0.15)]"
    >
      {/* Photo panel */}
      <div
        className="relative flex h-56 items-end overflow-hidden"
        style={{ background: property.gradient }}
      >
        <span className="pointer-events-none absolute -right-4 -top-4 select-none text-[140px] font-extrabold leading-none text-white/[0.07]">
          {property.letter}
        </span>

        <div className="absolute left-3.5 top-3.5 z-[2] flex gap-2">
          <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white">
            {TRANSACTION_LABEL[property.transaction]}
          </span>
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-bold"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        <div className="relative z-[2] w-full bg-gradient-to-t from-black/65 to-transparent px-4 py-3">
          <span className="text-lg font-extrabold text-white">
            {formatPrice(property.price, property.transaction)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-4">
        <h3 className="truncate text-base font-bold leading-snug text-ink">
          {property.title}
        </h3>
        <div className="mb-3.5 mt-1.5 flex items-center gap-1.5">
          <MapPin className="size-3.5 shrink-0 text-faint" />
          <span className="text-[13px] text-muted">
            {property.neighborhood}, {property.city}
          </span>
        </div>

        <div className="mb-3.5 flex border-y border-[#F3F4F6] py-2.5">
          <Stat value={`${property.surface} m²`} label="Surface" divider />
          {property.pieces != null && (
            <Stat value={String(property.pieces)} label="Pièces" divider />
          )}
          <Stat value={property.type} label="Type" />
        </div>

        <div className="w-full rounded-[10px] border-[1.5px] border-line bg-surface-warm py-2.5 text-center text-[13px] font-semibold text-brand-500 transition-all duration-200 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
          Voir le bien →
        </div>
      </div>
    </Link>
  );
}

function Stat({
  value,
  label,
  divider = false,
}: {
  value: string;
  label: string;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex-1 px-2 text-center ${divider ? "border-r border-[#F3F4F6]" : ""}`}
    >
      <div className="truncate text-sm font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] text-faint">{label}</div>
    </div>
  );
}
