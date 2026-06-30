import Link from "next/link";

export const metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div>
      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-500">
        Écran 4
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-ink">Connexion</h1>
      <p className="mt-2 text-sm text-muted">
        Formulaire de connexion — à implémenter d&apos;après la maquette.
      </p>
      <p className="mt-8 text-sm text-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-semibold text-brand-500 hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
}
