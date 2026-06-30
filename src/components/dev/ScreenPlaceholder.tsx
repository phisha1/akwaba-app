import { Button } from "@/components/ui/Button";

/**
 * Temporary placeholder for screens not yet implemented.
 * Each route is wired and navigable; the visual build follows screen by screen.
 */
export function ScreenPlaceholder({
  screen,
  title,
  description,
}: {
  screen: number;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-500">
        Écran {screen}
      </span>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 max-w-md text-muted">{description}</p>
      <p className="mt-6 text-sm text-faint">
        Interface en cours de construction — la maquette sera implémentée à
        l&apos;identique.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/" variant="secondary">
          Accueil
        </Button>
        <Button href="/recherche">Voir les annonces</Button>
      </div>
    </section>
  );
}
