import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { STATUS_INFO, TRANSACTION_LABEL, formatPrice } from "@/lib/utils";
import { formatDistance } from "@/lib/geo";

export function CompactPropertyCard({
  property,
  distanceKm,
  active = false,
  onActivate,
  onDeactivate,
}: {
  property: Property;
  distanceKm?: number | null;
  active?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
}) {
  const status = STATUS_INFO[property.status];

  return (
    <Link
      href={`/annonces/${property.id}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      className={`flex overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 hover:translate-x-[3px] hover:shadow-[0_4px_16px_rgba(14,77,92,0.12)] ${
        active ? "ring-2 ring-brand-500" : ""
      }`}
    >
      <div
        className="relative w-32 shrink-0 overflow-hidden bg-cover bg-center"
        style={
          property.imageUrl
            ? { backgroundImage: `url('${property.imageUrl}')` }
            : { background: property.gradient }
        }
      >
        {!property.imageUrl && (
          <span className="pointer-events-none absolute -bottom-2 -right-2 select-none text-[72px] font-extrabold leading-none text-white/[0.09]">
            {property.letter}
          </span>
        )}
        <span className="absolute left-2 top-2 z-[2] rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {TRANSACTION_LABEL[property.transaction]}
        </span>
      </div>

      <div className="min-w-0 flex-1 px-3.5 py-3">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-bold leading-tight text-ink">
            {property.title}
          </h3>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        <div className="mb-1.5 text-[15px] font-extrabold text-brand-500">
          {formatPrice(property.price, property.transaction)}
        </div>

        <div className="mb-2 flex items-center gap-1 text-xs text-muted">
          <MapPin className="size-3 shrink-0 text-faint" />
          <span className="truncate">
            {property.neighborhood}, {property.city}
          </span>
          {distanceKm != null && (
            <>
              <span className="text-line-cool">·</span>
              <span className="shrink-0 font-semibold text-brand-500">
                {formatDistance(distanceKm)}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Tag>{property.surface} m²</Tag>
          {property.pieces != null && <Tag>{property.pieces} pcs</Tag>}
          <Tag muted>{property.type}</Tag>
        </div>
      </div>
    </Link>
  );
}

function Tag({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`rounded-md bg-[#F9FAFB] px-1.5 py-0.5 text-[11px] ${
        muted ? "font-medium text-muted" : "font-semibold text-[#4B5563]"
      }`}
    >
      {children}
    </span>
  );
}
