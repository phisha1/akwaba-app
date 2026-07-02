import { RequireAuth } from "@/components/auth/RequireAuth";
import { AcheteurDashboard } from "@/components/dashboard/AcheteurDashboard";

export default function AcheteurDashboardPage() {
  return (
    <RequireAuth
      allowedRoles={["acheteur", "locataire", "admin"]}
      message="Cet espace est réservé aux acheteurs et locataires."
    >
      <AcheteurDashboard />
    </RequireAuth>
  );
}
