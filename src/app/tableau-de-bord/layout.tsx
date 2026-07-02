import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Gérez vos biens, visites et offres sur Akwaba Immo.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth
      title="Espace compte requis"
      message="Connectez-vous pour accéder à votre tableau de bord."
    >
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto bg-surface-warm p-5 sm:p-7 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
