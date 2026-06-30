import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = {
  title: "Cartographie",
  description:
    "Explorez les biens Akwaba Immo sur une carte avec recherche par ville, type et rayon.",
};

export default function CartographiePage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-full place-items-center text-sm text-muted">
          Chargement de la cartographie...
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
