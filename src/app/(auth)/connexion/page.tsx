import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginBrand } from "@/components/auth/AuthBrand";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace Akwaba Immo.",
};

export default function ConnexionPage() {
  return (
    <AuthShell brand={<LoginBrand />}>
      <LoginForm />
    </AuthShell>
  );
}
