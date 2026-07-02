import { RequireAuth } from "@/components/auth/RequireAuth";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";

export default function TableauDeBordPage() {
  return (
    <RequireAuth
      allowedRoles={["particulier", "agent", "admin"]}
      message="Cet espace est réservé aux propriétaires, agents et administrateurs."
    >
      <AgentDashboard />
    </RequireAuth>
  );
}
