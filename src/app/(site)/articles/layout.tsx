import { RequireAuth } from "@/components/auth/RequireAuth";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Articles réservés aux comptes"
      message="Connectez-vous pour lire les conseils et guides de l'Académie."
    >
      {children}
    </RequireAuth>
  );
}
