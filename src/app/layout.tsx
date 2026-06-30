import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akwaba Immo — Plateforme immobilière du Cameroun",
    template: "%s · Akwaba Immo",
  },
  description:
    "Achetez, louez et vendez des biens immobiliers au Cameroun. Annonces vérifiées, agents certifiés et annuaire des acteurs de l'immobilier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full bg-surface text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
