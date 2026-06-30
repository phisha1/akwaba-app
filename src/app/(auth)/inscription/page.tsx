import Link from "next/link";

export const metadata = { title: "Inscription" };

export default function InscriptionPage() {
  return (
    <div>
      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-500">
        Écran 5
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-ink">Inscription</h1>
      <p className="mt-2 text-sm text-muted">
        Formulaire d&apos;inscription — à implémenter d&apos;après la maquette.
      </p>
      <p className="mt-8 text-sm text-muted">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="font-semibold text-brand-500 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
