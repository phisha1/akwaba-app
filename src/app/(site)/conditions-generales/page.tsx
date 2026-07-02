import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation d'Akwaba Immo.",
};

export default function TermsPage() {
  return (
    <main className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Conditions générales
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Règles d&apos;utilisation d&apos;Akwaba Immo
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Ces règles encadrent l&apos;accès aux annonces, à l&apos;annuaire, aux
            contenus de l&apos;Académie et aux espaces de compte.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[900px] space-y-5 px-6 py-10 text-sm leading-7 text-ink-soft sm:px-10">
        <Block title="Comptes">
          Chaque utilisateur choisit un rôle correspondant à son usage :
          acheter, louer, publier un bien, contribuer à l&apos;Académie ou administrer
          la plateforme.
        </Block>
        <Block title="Annonces">
          Les informations publiées doivent être exactes, compréhensibles et ne
          pas masquer les éléments essentiels du bien.
        </Block>
        <Block title="Académie">
          Les contenus doivent aider les utilisateurs à mieux comprendre les
          démarches immobilières et éviter les informations trompeuses.
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
