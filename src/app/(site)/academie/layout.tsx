import { RequireAuth } from "@/components/auth/RequireAuth";

export default function AcademieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Académie réservée aux comptes"
      message="Connectez-vous pour accéder aux articles, formations, filières et discussions."
    >
      {children}
    </RequireAuth>
  );
}
