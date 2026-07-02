import { RequireAuth } from "@/components/auth/RequireAuth";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <RequireAuth
      allowedRoles={["admin"]}
      message="Cet espace est réservé à l'administrateur de la plateforme."
    >
      <AdminDashboard />
    </RequireAuth>
  );
}
