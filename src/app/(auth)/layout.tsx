import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div
        className="relative hidden flex-col justify-between p-12 text-white lg:flex"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Logo light />
        <div>
          <h2 className="max-w-sm text-3xl font-extrabold leading-tight">
            La plateforme immobilière du Cameroun
          </h2>
          <p className="mt-4 max-w-sm text-white/70">
            Annonces vérifiées, agents certifiés et acteurs de confiance.
          </p>
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Akwaba Immo</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
