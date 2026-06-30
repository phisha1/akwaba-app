"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  ROLE_LABEL,
  dashboardPathForRole,
  saveDemoUser,
  type DemoRole,
} from "@/lib/demo-store";

const LOGIN_ROLES: DemoRole[] = ["lecteur", "auteur", "expert", "agent", "admin"];

export function LoginForm() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<DemoRole>("agent");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveDemoUser({
      name: role === "admin" ? "Admin Akwaba" : "Jean-Pierre Mbida",
      email: email || "demo@akwaba.cm",
      role,
    });
    router.push(dashboardPathForRole(role));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
      <h1 className="mb-1.5 text-[28px] font-extrabold tracking-[-0.5px] text-ink">
        Bon retour !
      </h1>
      <p className="mb-7 text-[15px] text-muted">
        Connectez-vous pour accéder à votre espace.
      </p>

      <div className="mb-4">
        <span className="mb-1.5 block text-[13px] font-semibold text-ink">
          Profil de démonstration
        </span>
        <div className="grid grid-cols-2 gap-2">
          {LOGIN_ROLES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`rounded-[10px] border-[1.5px] px-3 py-2 text-left text-xs font-bold transition-colors ${
                role === item
                  ? "border-brand-500 bg-brand-50 text-brand-500"
                  : "border-line text-muted hover:border-brand-500"
              }`}
            >
              {ROLE_LABEL[item]}
            </button>
          ))}
        </div>
      </div>

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

      <div className="mb-5 text-right">
        <Link href="#" className="text-[13px] font-medium text-brand-500 hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>

      <button
        type="submit"
        className="mb-[18px] w-full rounded-[11px] bg-gold-400 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] transition-colors hover:bg-gold-500"
      >
        Se connecter
      </button>

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
