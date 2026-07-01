import { Suspense } from "react";
import { PropertyPublishForm } from "@/components/dashboard/PropertyPublishForm";

export default function NouveauBienPage() {
  return (
    <Suspense
      fallback={
        <div className="grid place-items-center py-16 text-sm text-muted">
          Chargement…
        </div>
      }
    >
      <PropertyPublishForm />
    </Suspense>
  );
}
