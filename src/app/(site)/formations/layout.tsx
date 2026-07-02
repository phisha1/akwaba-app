import { RequireAuth } from "@/components/auth/RequireAuth";

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Formations réservées aux comptes"
      message="Connectez-vous pour consulter les formations de l'Académie."
    >
      {children}
    </RequireAuth>
  );
}
