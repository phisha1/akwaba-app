import { ScreenPlaceholder } from "@/components/dev/ScreenPlaceholder";

export const metadata = { title: "Métiers de l'immobilier" };

export default function MetiersPage() {
  return (
    <ScreenPlaceholder
      screen={8}
      title="Métiers de l'immobilier"
      description="Fiches métiers : missions, formations et acteurs associés."
    />
  );
}
