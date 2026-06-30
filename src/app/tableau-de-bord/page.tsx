import { ScreenPlaceholder } from "@/components/dev/ScreenPlaceholder";

export const metadata = { title: "Tableau de bord" };

export default function TableauDeBordPage() {
  return (
    <ScreenPlaceholder
      screen={6}
      title="Tableau de bord"
      description="Mes annonces, statistiques, messages et gestion du profil."
    />
  );
}
