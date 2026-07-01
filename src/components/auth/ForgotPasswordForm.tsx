"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-ink">
            Adresse e-mail
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-[11px] bg-gold-400 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] transition-colors hover:bg-gold-500"
        >
          Envoyer le lien
        </button>
      </form>

      {sent && (
        <div className="mt-4 flex items-start gap-2 rounded-[10px] border border-success bg-success-bg px-3.5 py-3 text-[13px] font-medium text-success">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          Lien de recuperation simule envoye a {email}.
        </div>
      )}
    </>
  );
}
