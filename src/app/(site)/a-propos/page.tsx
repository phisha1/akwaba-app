import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description: "Mission et piliers d'Akwaba Immo.",
};

export default function AboutPage() {
  return (
    <main className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[960px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            À propos
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Un point d&apos;entrée fiable pour l&apos;immobilier au Cameroun
          </h1>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-muted">
            Akwaba Immo réunit la recherche de biens, les acteurs du secteur et
            l&apos;Académie pour aider chaque profil à avancer avec plus de clarté.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[960px] gap-4 px-6 py-10 sm:px-10 md:grid-cols-3">
        <Pillar icon={Building2} title="Biens" text="Acheter, louer ou publier un bien avec des informations lisibles." />
        <Pillar icon={ShieldCheck} title="Confiance" text="Mettre en avant les statuts, les documents et les acteurs vérifiés." />
        <Pillar icon={GraduationCap} title="Académie" text="Former les acheteurs, locataires, propriétaires et experts." />
      </section>
      <div className="mx-auto max-w-[960px] px-6 pb-12 sm:px-10">
        <Link
          href="/recherche"
          className="inline-flex rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white hover:bg-gold-500"
        >
          Explorer les biens
        </Link>
      </div>
    </main>
  );
}

function Pillar({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Building2;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <Icon className="mb-4 size-6 text-brand-500" />
      <h2 className="text-base font-extrabold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}
