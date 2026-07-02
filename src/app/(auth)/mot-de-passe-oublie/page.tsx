import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginBrand } from "@/components/auth/AuthBrand";

export const metadata = {
  title: "Mot de passe oublié",
  description: "Récupération de compte Akwaba Immo.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell brand={<LoginBrand />}>
      <div className="w-full max-w-[420px]">
        <Link
          href="/connexion"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:underline"
        >
          <ArrowLeft className="size-4" />
          Retour connexion
        </Link>

        <div className="mb-6 grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
          <Mail className="size-6" />
        </div>

        <h1 className="mb-2 text-[28px] font-extrabold tracking-[-0.5px] text-ink">
          Mot de passe oublié
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Entrez votre adresse e-mail. Si un compte existe, vous recevrez les
          instructions de récupération.
        </p>

        <ForgotPasswordForm />

        <p className="mt-5 rounded-[10px] border border-line bg-surface-warm px-3.5 py-2.5 text-[12px] leading-relaxed text-muted">
          Vous pouvez aussi revenir à la connexion si vous connaissez déjà votre
          mot de passe.
        </p>
      </div>
    </AuthShell>
  );
}
