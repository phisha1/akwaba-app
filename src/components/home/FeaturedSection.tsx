import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { featuredProperties } from "@/lib/mock/properties";

export function FeaturedSection() {
  const items = featuredProperties.slice(0, 3);

  return (
    <section className="bg-surface-warm px-6 py-[72px] sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[1.2px] text-gold-400">
              À la une
            </div>
            <h2 className="text-3xl font-extrabold tracking-[-0.8px] text-ink sm:text-[34px]">
              Biens en vedette
            </h2>
          </div>
          <Link
            href="/recherche"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg border-[1.5px] border-brand-500 px-5 py-2.5 text-[13px] font-semibold text-brand-500 transition-colors hover:bg-brand-500 hover:text-white"
          >
            <span className="hidden sm:inline">Voir tous les biens</span>
            <span className="sm:hidden">Voir tout</span>
            <ChevronRight className="size-[15px]" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
