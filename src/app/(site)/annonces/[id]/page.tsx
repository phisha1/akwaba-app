import { ScreenPlaceholder } from "@/components/dev/ScreenPlaceholder";
import { getProperty } from "@/lib/mock/properties";

export default async function FichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getProperty(id);

  return (
    <ScreenPlaceholder
      screen={3}
      title="Fiche détaillée"
      description={
        property
          ? `Galerie, caractéristiques et contact pour : ${property.title}.`
          : "Galerie, caractéristiques, localisation et contact de l'agent."
      }
    />
  );
}
