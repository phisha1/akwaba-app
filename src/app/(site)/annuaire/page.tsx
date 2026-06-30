import type { Metadata } from "next";
import Link from "next/link";
import { institutions } from "@/lib/mock/directory";
import { DirectoryView } from "@/components/directory/DirectoryView";

export const metadata: Metadata = {
  title: "Annuaire des acteurs",
  description:
    "Institutions publiques, entreprises privées et organisations professionnelles de l'immobilier camerounais.",
};

export default function AnnuairePage() {
  return (
    <div className="bg-surface-warm">
      {/* Hero */}
      <div className="border-b border-line bg-white px-6 pb-7 pt-9 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 flex items-center gap-1.5 text-[13px]">
            <Link href="/" className="text-brand-500 hover:underline">
              Accueil
            </Link>
            <span className="text-line-cool">›</span>
            <span className="text-muted">Annuaire des acteurs</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="mb-2.5 text-2xl font-extrabold leading-tight tracking-[-0.6px] text-ink sm:text-[30px]">
                Annuaire des acteurs de
                <br className="hidden sm:block" /> l&apos;immobilier camerounais
              </h1>
              <p className="max-w-[600px] text-[15px] text-muted">
                Retrouvez les institutions publiques, entreprises privées et
                organisations professionnelles qui structurent le marché
                immobilier au Cameroun.
              </p>
            </div>
            <div className="text-right">
              <div className="text-[44px] font-extrabold leading-none tracking-[-1px] text-brand-500">
                {institutions.length}
              </div>
              <div className="text-[13px] text-faint">acteurs référencés</div>
            </div>
          </div>
        </div>
      </div>

      <DirectoryView />
    </div>
  );
}
