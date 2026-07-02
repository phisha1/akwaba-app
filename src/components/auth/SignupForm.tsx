"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Home, KeyRound, Search, Check, Eye, EyeOff } from "lucide-react";
import {
  dashboardPathForRole,
  registerAccount,
  saveDemoUser,
  type DemoRole,
} from "@/lib/demo-store";

type Role = Extract<
  DemoRole,
  "acheteur" | "locataire" | "apprenant" | "particulier"
>;

const ROLES: {
  value: Role;
  icon: typeof Search;
  title: string;
  desc: string;
}[] = [
  {
    value: "acheteur",
    icon: Search,
    title: "Je veux acheter",
    desc: "Je consulte les biens à vendre et je peux faire une offre.",
  },
  {
    value: "locataire",
    icon: Home,
    title: "Je veux louer",
    desc: "Je consulte les biens à louer et je peux demander une visite.",
  },
  {
    value: "apprenant",
    icon: GraduationCap,
    title: "Je veux aller à l'Académie",
    desc: "Je veux lire les articles, suivre les formations et participer au forum.",
  },
  {
    value: "particulier",
    icon: KeyRound,
    title: "Je publie mon bien",
    desc: "Je publie mon propre bien à vendre ou à louer.",
  },
];

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-[11px] text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

export function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("acheteur");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    if (!cleanFirstName || !cleanLastName || !cleanEmail || !cleanPhone || !cleanPassword) {
      setError("Tous les champs doivent être remplis.");
      return;
    }
    if (cleanPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (!/^[\d\s+().-]{8,}$/.test(cleanPhone)) {
      setError("Entrez un numéro de téléphone valide.");
      return;
    }

    setError("");
    const name = `${cleanFirstName} ${cleanLastName}`;
    // Register the account so it can be used to log in afterwards.
    registerAccount({ name, email: cleanEmail, password: cleanPassword, role });
    saveDemoUser({ name, email: cleanEmail, role });
    router.push(dashboardPathForRole(role));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[480px]">
      <h1 className="mb-1.5 text-[26px] font-extrabold tracking-[-0.5px] text-ink">
        Créer mon compte
      </h1>
      <p className="mb-6 text-sm text-muted">
        Choisissez votre profil pour commencer.
      </p>

      {/* Role selector */}
      <div className="mb-6 grid grid-cols-1 gap-3">
        {ROLES.map((r) => {
          const selected = role === r.value;
          return (
            <button
              type="button"
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`relative rounded-xl border-[1.5px] p-4 text-left transition-colors ${
                selected
                  ? "border-2 border-brand-500 bg-brand-50"
                  : "border-line bg-white hover:border-brand-500"
              }`}
            >
              {selected && (
                <span className="absolute right-3 top-3 grid size-[22px] place-items-center rounded-full bg-brand-500">
                  <Check className="size-3 text-white" />
                </span>
              )}
              <span
                className={`mb-2.5 grid size-10 place-items-center rounded-[10px] ${
                  selected ? "border-[1.5px] border-brand-500 bg-white" : "bg-gray-100"
                }`}
              >
                <r.icon
                  className={`size-[19px] ${selected ? "text-brand-500" : "text-muted"}`}
                />
              </span>
              <div
                className={`mb-1 text-sm font-bold ${selected ? "text-brand-500" : "text-ink"}`}
              >
                {r.title}
              </div>
              <div className="text-xs leading-snug text-faint">{r.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Name */}
      <div className="mb-3.5 grid grid-cols-2 gap-3">
        <Field label="Prénom">
          <input
            className={inputClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            required
          />
        </Field>
        <Field label="Nom de famille">
          <input
            className={inputClass}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            required
          />
        </Field>
      </div>

      <Field label="Adresse e-mail" className="mb-3.5">
        <input
          type="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          autoComplete="email"
          required
        />
      </Field>

      <Field label="Téléphone" className="mb-3.5">
        <div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-line px-3.5 py-[11px] focus-within:border-brand-500">
          <span className="border-r border-line pr-2 text-sm font-semibold text-muted">
            🇨🇲 +237
          </span>
          <input
            className="flex-1 bg-transparent text-sm text-ink outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="6 99 45 23 17"
            autoComplete="tel"
            required
          />
        </div>
      </Field>

      <Field label="Mot de passe" className="mb-3.5">
        <div className="relative flex items-center">
          <input
            type={showPwd ? "text" : "password"}
            className={`${inputClass} pr-10`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Créez un mot de passe sécurisé"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 text-faint hover:text-muted"
            aria-label={showPwd ? "Masquer" : "Afficher"}
          >
            {showPwd ? <EyeOff className="size-[15px]" /> : <Eye className="size-[15px]" />}
          </button>
        </div>
      </Field>

      {error && (
        <div className="mb-4 rounded-[10px] border border-[#FCA5A5] bg-[#FEF2F2] px-3.5 py-2.5 text-[13px] font-medium text-[#B91C1C]">
          {error}
        </div>
      )}

      {/* Terms */}
      <label className="mb-5 flex cursor-pointer items-start gap-2.5">
        <span
          onClick={(e) => {
            e.preventDefault();
            setAccepted((v) => !v);
          }}
          className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded ${
            accepted ? "bg-brand-500" : "border-[1.5px] border-line bg-white"
          }`}
        >
          {accepted && <Check className="size-3 text-white" />}
        </span>
        <span className="text-[13px] leading-relaxed text-muted">
          J&apos;accepte les{" "}
          <Link href="/conditions-generales" className="font-semibold text-brand-500 hover:underline">
            Conditions Générales
          </Link>{" "}
          et la{" "}
          <Link href="/confidentialite" className="font-semibold text-brand-500 hover:underline">
            Politique de confidentialité
          </Link>{" "}
          d&apos;Akwaba Immo.
        </span>
      </label>

      <button
        type="submit"
        disabled={!accepted}
        className="mb-3.5 w-full rounded-[11px] bg-gold-400 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] transition-colors hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Créer mon compte
      </button>
      <p className="text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-bold text-brand-500 hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}
