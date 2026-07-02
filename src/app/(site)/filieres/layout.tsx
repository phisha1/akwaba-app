import { RequireAuth } from "@/components/auth/RequireAuth";

export default function FilieresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Filières réservées aux comptes"
      message="Connectez-vous pour accéder aux parcours thématiques de l'Académie."
    >
      {children}
    </RequireAuth>
  );
}
