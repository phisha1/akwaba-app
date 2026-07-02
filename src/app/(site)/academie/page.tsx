import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Layers,
  MessageCircle,
  PenLine,
} from "lucide-react";
import { articles, filieres, formations, forumQuestions } from "@/lib/mock/learning";

export const metadata: Metadata = {
  title: "Académie",
  description:
    "Le hub Académie Akwaba : articles, formations, filières et forum immobilier.",
};

const hubs = [
  {
    href: "/articles",
    title: "Articles",
    desc: "Guides courts, cas pratiques et conseils d'experts.",
    count: `${articles.length} guides`,
    icon: FileText,
    bg: "#EEF6F8",
    color: "#0E4D5C",
  },
  {
    href: "/formations",
    title: "Formations",
    desc: "Modules pour acheter, louer, publier et vérifier.",
    count: `${formations.length} parcours`,
    icon: GraduationCap,
    bg: "#FEF3C7",
    color: "#B45309",
  },
  {
    href: "/filieres",
    title: "Filières",
    desc: "Chemins thématiques pour progresser sans se disperser.",
    count: `${filieres.length} thèmes`,
    icon: Layers,
    bg: "#E6F4EC",
    color: "#1E7A4A",
  },
  {
    href: "/forum",
    title: "Forum",
    desc: "Questions, réponses et retours de terrain de la communauté.",
    count: `${forumQuestions.length} questions`,
    icon: MessageCircle,
    bg: "#EDE9FE",
    color: "#6D28D9",
  },
];

export default function AcademiePage() {
  const latestArticle = articles[0];
  const latestFormation = formations[0];
  const latestQuestion = forumQuestions[0];

  return (
    <div className="bg-surface-warm">
      <section
        className="relative overflow-hidden bg-cover bg-center px-6 py-16 text-white sm:px-10 lg:px-14"
        style={{ backgroundImage: "url('/images/appartement.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2530]/92 via-[#0B2530]/74 to-[#0B2530]/35" />
        <div className="relative mx-auto max-w-[1200px]">
          <span className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-1 text-xs font-bold uppercase text-white">
            <BookOpen className="size-3.5" />
            Pilier Académie
          </span>
          <h1 className="mt-5 max-w-[720px] text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Académie Akwaba
          </h1>
          <p className="mt-4 max-w-[720px] text-base leading-relaxed text-white/82">
            Un point d&apos;entrée unique pour apprendre, publier, structurer les
            parcours et répondre aux questions autour de l&apos;immobilier au
            Cameroun.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.35)] hover:bg-gold-500"
            >
              <GraduationCap className="size-4" />
              Explorer les formations
            </Link>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/16"
            >
              <MessageCircle className="size-4" />
              Aller au forum
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-4 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-14">
        {hubs.map((hub) => (
          <Link
            key={hub.title}
            href={hub.href}
            className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <span
              className="mb-4 grid size-12 place-items-center rounded-xl"
              style={{ background: hub.bg, color: hub.color }}
            >
              <hub.icon className="size-6" />
            </span>
            <span className="mb-2 block text-xs font-bold uppercase text-faint">
              {hub.count}
            </span>
            <h2 className="text-lg font-extrabold text-ink group-hover:text-brand-500">
              {hub.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{hub.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-500">
              Ouvrir
              <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-6 px-6 pb-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase text-gold-400">
                À suivre
              </p>
              <h2 className="text-2xl font-extrabold text-ink">
                Derniers contenus
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-bold text-brand-500 hover:underline"
            >
              Tout voir
            </Link>
          </div>

          <div className="grid gap-4">
            <ContentLink
              href={`/articles/${latestArticle.id}`}
              icon={FileText}
              label="Article"
              title={latestArticle.title}
              desc={latestArticle.excerpt}
            />
            <ContentLink
              href={`/formations/${latestFormation.id}`}
              icon={GraduationCap}
              label="Formation"
              title={latestFormation.title}
              desc={latestFormation.description}
            />
            <ContentLink
              href={`/forum/${latestQuestion.id}`}
              icon={MessageCircle}
              label="Forum"
              title={latestQuestion.title}
              desc={latestQuestion.detail}
            />
          </div>
        </div>

        <aside className="rounded-2xl border border-line bg-white p-6">
          <span className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
            <PenLine className="size-3.5" />
            Expert / formateur
          </span>
          <h2 className="mt-4 text-xl font-extrabold text-ink">
            Créer et animer l&apos;Académie
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            L&apos;expert dispose maintenant d&apos;une destination claire avant
            de publier un article, préparer une formation ou répondre au forum.
          </p>
          <div className="mt-5 grid gap-3">
            <Link
              href="/tableau-de-bord/articles/nouveau"
              className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
            >
              Nouvel article
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/tableau-de-bord/formations/nouveau"
              className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
            >
              Nouvelle formation
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/forum"
              className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:border-brand-500 hover:text-brand-500"
            >
              Répondre au forum
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ContentLink({
  href,
  icon: Icon,
  label,
  title,
  desc,
}: {
  href: string;
  icon: typeof FileText;
  label: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="mb-1 block text-xs font-bold uppercase text-faint">
          {label}
        </span>
        <span className="block text-base font-extrabold text-ink">{title}</span>
        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">
          {desc}
        </span>
      </span>
    </Link>
  );
}
