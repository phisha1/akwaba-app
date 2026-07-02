"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import {
  authenticate,
  dashboardPathForRole,
  saveDemoUser,
} from "@/lib/demo-store";

export function LoginForm() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = authenticate(email, password);
    if (!user) {
      setError("E-mail ou mot de passe incorrect.");
      return;
    }
    setError("");
    saveDemoUser(user);
    router.push(dashboardPathForRole(user.role));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
      <h1 className="mb-1.5 text-[28px] font-extrabold tracking-[-0.5px] text-ink">
        Bon retour !
      </h1>
      <p className="mb-7 text-[15px] text-muted">
        Connectez-vous pour accéder à votre espace.
      </p>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-[13px] font-semibold text-ink">
          Adresse e-mail
        </span>
        <div className="relative flex items-center">
          <Mail className="pointer-events-none absolute left-3.5 size-4 text-faint" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            autoComplete="email"
            className="w-full rounded-[10px] border-[1.5px] border-line py-3 pl-[42px] pr-3.5 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10"
          />
        </div>
      </label>

      <label className="mb-2.5 block">
        <span className="mb-1.5 block text-[13px] font-semibold text-ink">
          Mot de passe
        </span>
        <div className="relative flex items-center">
          <Lock className="pointer-events-none absolute left-3.5 size-4 text-brand-500" />
          <input
            type={showPwd ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            className="w-full rounded-[10px] border-[1.5px] border-line py-3 pl-[42px] pr-[42px] text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3.5 text-faint hover:text-muted"
            aria-label={showPwd ? "Masquer" : "Afficher"}
          >
            {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </label>

      <div className="mb-4 text-right">
        <Link href="/mot-de-passe-oublie" className="text-[13px] font-medium text-brand-500 hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#FCA5A5] bg-[#FEF2F2] px-3.5 py-2.5 text-[13px] font-medium text-[#B91C1C]">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        className="mb-3.5 w-full rounded-[11px] bg-gold-400 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] transition-colors hover:bg-gold-500"
      >
        Se connecter
      </button>

      <div className="mb-[18px] rounded-[10px] border border-line bg-surface-warm px-3.5 py-2.5 text-[12px] leading-relaxed text-muted">
        Une seule connexion pour tous les comptes. L&apos;espace affiché dépend
        simplement du profil enregistré sur le compte.
      </div>

      <div className="mb-[18px] flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[13px] text-faint">ou</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <p className="text-center text-sm text-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-bold text-brand-500 hover:underline">
          Créer un compte gratuitement
        </Link>
      </p>
    </form>
  );
}
