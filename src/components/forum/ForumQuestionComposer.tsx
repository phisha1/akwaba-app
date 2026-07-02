"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle, PlusCircle, X } from "lucide-react";

const FORUM_KEY = "akwaba-forum-questions";
const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

type LocalQuestion = {
  id: string;
  title: string;
  filiere: string;
  detail: string;
  createdAt: string;
};

const FILIERES = ["Achat", "Location", "Documents", "Métiers"];

export function ForumQuestionComposer() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("");
  const [filiere, setFiliere] = useState(FILIERES[0]);
  const [detail, setDetail] = useState("");

  function close() {
    setOpen(false);
    window.setTimeout(() => setSent(false), 200);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const question: LocalQuestion = {
      id: `local-question-${Date.now()}`,
      title: title.trim(),
      filiere,
      detail: detail.trim(),
      createdAt: "À l'instant",
    };
    writeQuestions([question, ...readQuestions()]);
    window.dispatchEvent(new Event("akwaba:forum-question"));
    setSent(true);
    setTitle("");
    setDetail("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
      >
        <PlusCircle className="size-4" />
        Poser une question
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-ink">
                  Poser une question
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Formulez une question précise pour obtenir une réponse utile.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-faint hover:bg-surface-cool hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            {sent ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 size-12 text-success" />
                <div className="text-base font-bold text-ink">
                  Question publiée
                </div>
                <p className="mx-auto mt-1.5 max-w-[320px] text-sm text-muted">
                  Elle apparaît dans le forum et pourra être traitée par la
                  communauté.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-3.5">
                <Field label="Titre">
                  <input
                    className={inputClass}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex. Comment vérifier un bail avant signature ?"
                    required
                  />
                </Field>
                <Field label="Filière">
                  <select
                    className={inputClass}
                    value={filiere}
                    onChange={(e) => setFiliere(e.target.value)}
                  >
                    {FILIERES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Détail">
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="Contexte, ville, document concerné, ce que vous avez déjà vérifié..."
                    required
                  />
                </Field>
                <button
                  type="submit"
                  className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
                >
                  Publier la question
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function LocalForumQuestions() {
  const [questions, setQuestions] = useState<LocalQuestion[]>([]);

  useEffect(() => {
    function refresh() {
      setQuestions(readQuestions());
    }
    refresh();
    window.addEventListener("akwaba:forum-question", refresh);
    return () => window.removeEventListener("akwaba:forum-question", refresh);
  }, []);

  if (!questions.length) return null;

  return (
    <>
      {questions.map((question) => (
        <article
          key={question.id}
          className="block rounded-2xl border border-line bg-white p-5 shadow-card"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
              {question.filiere}
            </span>
            <span className="rounded-md bg-success-bg px-2.5 py-1 text-[11px] font-bold text-success">
              Votre question
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-ink">{question.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {question.detail}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-faint">
            <span>{question.createdAt}</span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" />0 réponse
            </span>
          </div>
        </article>
      ))}
    </>
  );
}

function readQuestions(): LocalQuestion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FORUM_KEY);
    return raw ? (JSON.parse(raw) as LocalQuestion[]) : [];
  } catch {
    return [];
  }
}

function writeQuestions(questions: LocalQuestion[]) {
  window.localStorage.setItem(FORUM_KEY, JSON.stringify(questions));
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}
