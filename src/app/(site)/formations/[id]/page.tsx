import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Layers } from "lucide-react";
import { formations, getFiliere, getFormation } from "@/lib/mock/learning";

export function generateStaticParams() {
  return formations.map((formation) => ({ id: formation.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const formation = getFormation(id);
  return {
    title: formation?.title ?? "Formation introuvable",
    description: formation?.description,
  };
}

export default async function FormationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const formation = getFormation(id);
  if (!formation) notFound();
  const filiere = getFiliere(formation.filiere);

  return (
    <div className="bg-surface-warm">
      <div className="mx-auto max-w-[1040px] px-6 py-10 sm:px-10">
        <Link
          href="/formations"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500"
        >
          <ArrowLeft className="size-4" />
          Retour aux formations
        </Link>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold"
              style={{ background: filiere?.bg, color: filiere?.color }}
            >
              {filiere?.title}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink">
              {formation.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {formation.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Info icon={Clock} label="Durée" value={formation.duration} />
              <Info icon={Layers} label="Modules" value={`${formation.modules}`} />
              <Info icon={CheckCircle2} label="Niveau" value={formation.level} />
            </div>
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-extrabold text-ink">
                Programme
              </h2>
              {[
                "Comprendre le contexte et les risques",
                "Préparer les documents et les questions",
                "Comparer les options avant de décider",
                "Suivre ses actions dans le tableau de bord",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-t border-line py-3 text-sm text-ink-soft"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-500">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>
          <aside className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="text-[11px] font-bold uppercase text-faint">
              Accès
            </div>
            <div className="mt-2 text-3xl font-extrabold text-brand-500">
              {formation.price}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Continuez depuis l&apos;Académie pour comparer les formations et
              choisir le prochain contenu à suivre.
            </p>
            <Link
              href="/academie"
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-gold-400 py-3 text-sm font-bold text-white hover:bg-gold-500"
            >
              Continuer dans l&apos;Académie
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-warm p-4">
      <Icon className="mb-3 size-5 text-brand-500" />
      <div className="text-[11px] uppercase text-faint">{label}</div>
      <div className="mt-1 text-sm font-bold text-ink">{value}</div>
    </div>
  );
}
