import { ScreenPlaceholder } from "@/components/dev/ScreenPlaceholder";

export const metadata = { title: "Résultats de recherche" };

export default function RecherchePage() {
  return (
    <ScreenPlaceholder
      screen={2}
      title="Résultats de recherche"
      description="Filtres, liste d'annonces et carte interactive (Leaflet)."
    />
  );
}
