import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter l'équipe Akwaba Immo.",
};

export default function ContactPage() {
  return (
    <main className="bg-surface-warm">
      <section className="border-b border-line bg-white px-6 py-12 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[960px]">
          <p className="mb-2 text-xs font-bold uppercase text-gold-400">
            Contact
          </p>
          <h1 className="text-3xl font-extrabold text-ink">
            Parler à Akwaba Immo
          </h1>
          <p className="mt-4 max-w-[700px] text-sm leading-relaxed text-muted">
            Une question sur un bien, un compte, une formation ou une fiche
            annuaire ? Contactez l&apos;équipe par le canal le plus direct.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[960px] gap-4 px-6 py-10 sm:px-10 md:grid-cols-3">
        <ContactCard icon={Phone} title="Téléphone" value="+237 6 99 00 00 00" href="tel:+237699000000" />
        <ContactCard icon={Mail} title="E-mail" value="contact@akwaba.immo" href="mailto:contact@akwaba.immo" />
        <ContactCard icon={MapPin} title="Base" value="Yaoundé, Cameroun" href="/recherche?ville=Yaoundé" />
      </section>

      <div className="mx-auto max-w-[960px] px-6 pb-12 sm:px-10">
        <Link
          href="/annuaire"
          className="inline-flex rounded-xl border border-brand-500 px-5 py-3 text-sm font-bold text-brand-500 hover:bg-brand-50"
        >
          Voir l&apos;annuaire des acteurs
        </Link>
      </div>
    </main>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-500"
    >
      <Icon className="mb-4 size-6 text-brand-500" />
      <h2 className="text-base font-extrabold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-muted">{value}</p>
    </a>
  );
}
