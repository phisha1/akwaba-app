import { RequireAuth } from "@/components/auth/RequireAuth";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Forum réservé aux comptes"
      message="Connectez-vous pour lire les discussions et participer au forum."
    >
      {children}
    </RequireAuth>
  );
}
