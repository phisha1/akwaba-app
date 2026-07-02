import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité d'Akwaba Immo.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Confidentialité
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Données et confidentialité
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Akwaba Immo limite les informations demandées à ce qui sert le
            parcours : compte, contact, annonces, visites, offres et contenus.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[900px] space-y-5 px-6 py-10 text-sm leading-7 text-ink-soft sm:px-10">
        <Block title="Informations de compte">
          Le nom, l&apos;adresse e-mail, le téléphone et le rôle servent à adapter
          l&apos;espace de travail et les actions disponibles.
        </Block>
        <Block title="Demandes et offres">
          Les coordonnées renseignées dans une demande de visite ou une
          proposition sont utilisées pour permettre le suivi du dossier.
        </Block>
        <Block title="Contrôle utilisateur">
          Chaque compte garde accès à son espace et peut se déconnecter depuis
          le tableau de bord.
        </Block>
      </section>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="mb-2 text-base font-extrabold text-ink">{title}</h2>
      <p>{children}</p>
    </article>
  );
}
