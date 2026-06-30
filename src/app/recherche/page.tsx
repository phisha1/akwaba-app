import { Suspense } from "react";
import { SearchView } from "@/components/search/SearchView";

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-full place-items-center text-sm text-muted">
          Chargement…
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
