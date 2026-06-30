import { Header } from "@/components/layout/Header";

export default function RechercheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}
