import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6 sm:px-10">
        <Logo size={32} />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-brand-500"
        >
          <ArrowLeft className="size-3.5" />
          Retour au site
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
