import { ScreenPlaceholder } from "@/components/dev/ScreenPlaceholder";

export const metadata = { title: "Annuaire des acteurs" };

export default function AnnuairePage() {
  return (
    <ScreenPlaceholder
      screen={7}
      title="Annuaire des acteurs"
      description="Agences, agents, notaires, promoteurs et géomètres vérifiés."
    />
  );
}
