import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import {
  forumQuestions,
  getFiliere,
  getForumQuestion,
} from "@/lib/mock/learning";

export function generateStaticParams() {
  return forumQuestions.map((question) => ({ id: question.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const question = getForumQuestion(id);
  return {
    title: question?.title ?? "Question introuvable",
    description: question?.detail,
  };
}

export default async function ForumQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = getForumQuestion(id);
  if (!question) notFound();
  const filiere = getFiliere(question.filiere);

  return (
    <div className="bg-surface-warm">
      <div className="mx-auto max-w-[920px] px-6 py-10 sm:px-10">
        <Link
          href="/forum"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500"
        >
          <ArrowLeft className="size-4" />
          Retour au forum
        </Link>
        <section className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold"
              style={{ background: filiere?.bg, color: filiere?.color }}
            >
              {filiere?.title}
            </span>
            {question.solved && (
              <span className="inline-flex items-center gap-1 rounded-md bg-success-bg px-2.5 py-1 text-[11px] font-bold text-success">
                <CheckCircle2 className="size-3" />
                Solution marquée
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-ink">
            {question.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {question.detail}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-line pb-6 text-xs text-faint">
            <span>{question.author}</span>
            <span>{question.createdAt}</span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" />
              {question.answers} réponses
            </span>
          </div>
          <div className="mt-6 space-y-4">
            <Answer
              name="Expert Akwaba"
              label="Réponse conseillée"
              text="Commencez par demander une preuve écrite, puis comparez la demande avec les pratiques du quartier. Si le paiement demandé semble excessif, négociez ou faites relire le bail avant de signer."
            />
            <Answer
              name="Marlyse Ndongo"
              label="Agent immobilier"
              text="Gardez une trace de la visite, du propriétaire et des échanges. Ne payez jamais sans reçu clair et sans vérifier l'identité de la personne qui encaisse."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Answer({
  name,
  label,
  text,
}: {
  name: string;
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-warm p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="font-bold text-ink">{name}</div>
        <span className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-500">
          {label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
