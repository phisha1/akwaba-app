import { Fragment } from "react";

const STATS = [
  { value: "2 400+", label: "biens actifs" },
  { value: "850+", label: "agents certifiés" },
  { value: "12", label: "villes couvertes" },
];

export function AuthShell({
  brand,
  children,
  align = "center",
}: {
  brand: React.ReactNode;
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Brand panel */}
      <div
        className="relative hidden w-[560px] shrink-0 flex-col justify-between overflow-hidden bg-brand-900 bg-cover bg-center p-10 lg:flex"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(5, 30, 41, 0.86) 0%, rgba(14, 77, 92, 0.7) 55%, rgba(5, 30, 41, 0.72) 100%), url('/images/cameroun-transport-routier.jpg')",
        }}
      >
        <span className="pointer-events-none absolute -right-20 -top-24 size-[340px] rounded-full bg-white/[0.05]" />
        <span className="pointer-events-none absolute -bottom-20 -left-14 size-[280px] rounded-full bg-gold-400/[0.08]" />
        <div className="relative z-[2]">{brand}</div>
        <div className="relative z-[2] flex items-center gap-6 border-t border-white/12 pt-5">
          {STATS.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <span className="h-8 w-px bg-white/12" />}
              <div>
                <div className="mb-0.5 text-lg font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-[11px] text-white/50">{s.label}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Form panel */}
      <div
        className={`flex flex-1 justify-center overflow-y-auto bg-white px-6 py-10 sm:px-12 ${
          align === "center" ? "items-center" : "items-start"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
