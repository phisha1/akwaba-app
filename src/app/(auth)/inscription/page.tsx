import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupBrand } from "@/components/auth/AuthBrand";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte gratuit Akwaba Immo.",
};

export default function InscriptionPage() {
  return (
    <AuthShell brand={<SignupBrand />} align="start">
      <SignupForm />
    </AuthShell>
  );
}
