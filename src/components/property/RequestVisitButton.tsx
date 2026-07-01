"use client";

import { useState } from "react";
import { Calendar, X, CheckCircle2 } from "lucide-react";
import { saveVisit } from "@/lib/demo-store";

export function RequestVisitButton({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  function close() {
    setOpen(false);
    // reset after the closing transition
    window.setTimeout(() => setSent(false), 200);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    saveVisit({
      propertyId,
      propertyTitle,
      visitorName: name,
      phone: `+237 ${phone}`.trim(),
      preferredDate: date,
      message,
    });
    setSent(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-2.5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gold-400 py-[15px] text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.32)] transition-colors hover:bg-gold-500"
      >
        <Calendar className="size-[17px]" />
        Demander une visite
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-ink">
                  Demander une visite
                </h2>
                <p className="mt-1 text-[13px] text-muted">{propertyTitle}</p>
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
                  Demande envoyée !
                </div>
                <p className="mx-auto mt-1.5 max-w-[320px] text-sm text-muted">
                  L&apos;agent recevra votre demande dans son tableau de bord et
                  vous recontactera pour confirmer le créneau.
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
              <form onSubmit={submit} className="flex flex-col gap-3.5">
                <Field label="Votre nom">
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex. Jean Fotso"
                    required
                  />
                </Field>
                <Field label="Téléphone">
                  <div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-line px-3.5 py-2.5 focus-within:border-brand-500">
                    <span className="border-r border-line pr-2 text-sm font-semibold text-muted">
                      🇨🇲 +237
                    </span>
                    <input
                      className="flex-1 bg-transparent text-sm text-ink outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="6 99 45 23 17"
                      inputMode="tel"
                      required
                    />
                  </div>
                </Field>
                <Field label="Créneau souhaité">
                  <input
                    className={inputClass}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ex. Samedi 12 juillet, matin"
                    required
                  />
                </Field>
                <Field label="Message (optionnel)">
                  <textarea
                    className={`${inputClass} min-h-20 resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Une précision pour l'agent ?"
                  />
                </Field>
                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl bg-gold-400 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
                >
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

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
