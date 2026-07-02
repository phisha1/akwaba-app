"use client";

import { useState } from "react";
import { CheckCircle2, Mail, X } from "lucide-react";
import { saveOffer } from "@/lib/demo-store";

export function MakeOfferButton({
  propertyId,
  propertyTitle,
  askingPrice,
}: {
  propertyId: string;
  propertyTitle: string;
  askingPrice: number;
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function close() {
    setOpen(false);
    window.setTimeout(() => setSent(false), 200);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cleanAmount = Number(amount.replace(/[^\d]/g, ""));
    if (!cleanAmount) return;

    saveOffer({
      propertyId,
      propertyTitle,
      buyerName: name,
      phone: `+237 ${phone}`.trim(),
      email: email.trim() || undefined,
      amount: cleanAmount,
      askingPrice,
      message,
    });
    setSent(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-brand-500 py-[13px] text-[15px] font-bold text-brand-500 transition-colors hover:bg-brand-50"
      >
        <Mail className="size-[17px]" />
        Faire une offre
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-ink">
                  Faire une offre
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
                  Offre envoyée !
                </div>
                <p className="mx-auto mt-1.5 max-w-[320px] text-sm text-muted">
                  L&apos;agent la verra dans son tableau de bord et pourra la
                  traiter avec les autres demandes.
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
                      +237
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
                <Field label="E-mail (optionnel)">
                  <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                  />
                </Field>
                <Field label="Montant proposé">
                  <input
                    className={inputClass}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`${new Intl.NumberFormat("fr-FR").format(
                      askingPrice,
                    )} FCFA`}
                    inputMode="numeric"
                    required
                  />
                </Field>
                <Field label="Message (optionnel)">
                  <textarea
                    className={`${inputClass} min-h-20 resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conditions, délai, mode de paiement..."
                  />
                </Field>
                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl bg-gold-400 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
                >
                  Envoyer l&apos;offre
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
