import { Suspense } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PropertyPublishForm } from "@/components/dashboard/PropertyPublishForm";

export default function NouveauBienPage() {
  return (
    <RequireAuth
      allowedRoles={["particulier", "agent", "admin"]}
      message="La publication d'un bien est réservée aux propriétaires, agents et administrateurs."
    >
      <Suspense
        fallback={
          <div className="grid place-items-center py-16 text-sm text-muted">
            Chargement…
          </div>
        }
      >
        <PropertyPublishForm />
      </Suspense>
    </RequireAuth>
  );
}
