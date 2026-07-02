import { RequireAuth } from "@/components/auth/RequireAuth";
import { RoleDashboard } from "@/components/dashboard/role/RoleDashboard";

export default function ExpertDashboardPage() {
  return (
    <RequireAuth
      allowedRoles={["expert", "admin"]}
      message="Cet espace est réservé aux experts, formateurs et administrateurs."
    >
      <RoleDashboard role="expert" />
    </RequireAuth>
  );
}
