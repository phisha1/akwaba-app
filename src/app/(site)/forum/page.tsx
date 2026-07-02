import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import {
  ForumQuestionComposer,
  LocalForumQuestions,
} from "@/components/forum/ForumQuestionComposer";
import { forumQuestions, getFiliere } from "@/lib/mock/learning";

export const metadata: Metadata = {
  title: "Forum",
  description:
    "Questions et réponses autour de l'immobilier, des documents et des démarches.",
};

export default function ForumPage() {
  return (
    <div className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-gold-400">
              Communauté
            </p>
            <h1 className="text-3xl font-extrabold text-ink">Forum Q&A</h1>
            <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted">
              Posez une question, consultez les réponses et retrouvez les
              solutions partagées par la communauté.
            </p>
          </div>
          <ForumQuestionComposer />
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] space-y-4 px-6 py-10 sm:px-10">
        <LocalForumQuestions />
        {forumQuestions.map((question) => {
          const filiere = getFiliere(question.filiere);
          return (
            <Link
              key={question.id}
              href={`/forum/${question.id}`}
              className="block rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md px-2.5 py-1 text-[11px] font-bold"
                  style={{ background: filiere?.bg, color: filiere?.color }}
                >
                  {filiere?.title}
                </span>
                {question.solved && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-success-bg px-2.5 py-1 text-[11px] font-bold text-success">
                    <CheckCircle2 className="size-3" />
                    Résolu
                  </span>
                )}
              </div>
              <h2 className="text-lg font-extrabold text-ink">
                {question.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {question.detail}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs font-medium text-faint">
                <span>{question.author}</span>
                <span>{question.createdAt}</span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="size-3.5" />
                  {question.answers} réponses
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
