import { Check } from "lucide-react";

export function LoginBrand() {
  return (
    <>
      <h2 className="mb-3.5 text-[30px] font-extrabold leading-tight tracking-[-0.6px] text-white">
        Votre patrimoine,
        <br />
        en toute confiance
      </h2>
      <p className="mb-9 max-w-[380px] text-[15px] leading-relaxed text-white/[0.62]">
        La première plateforme immobilière du Cameroun. Des milliers de biens
        vérifiés à Yaoundé, Douala et partout dans le pays.
      </p>

      {/* Floating listing cards */}
      <div className="relative h-48">
        <FloatingCard
          className="left-6 top-2 -rotate-2"
          gradient="linear-gradient(145deg,#1a3060,#2d5a9c)"
          badge="Location"
          price="350 000 FCFA/mois"
          title="Appartement Bonamoussadi"
          meta="Douala · 95 m² · 3 pièces"
        />
        <FloatingCard
          className="left-1 top-7 rotate-2"
          gradient="linear-gradient(145deg,#0a3d4a,#1a7a8c)"
          badge="Vente"
          price="285 000 000 FCFA"
          title="Villa contemporaine · Bastos"
          meta="Yaoundé · 450 m² · 6 pièces"
          elevated
        />
      </div>
    </>
  );
}

function FloatingCard({
  className,
  gradient,
  imageUrl,
  badge,
  price,
  title,
  meta,
  elevated = false,
}: {
  className: string;
  gradient: string;
  imageUrl?: string;
  badge: string;
  price: string;
  title: string;
  meta: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={`absolute w-[300px] overflow-hidden rounded-xl ${className} ${
        elevated
          ? "shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
          : "shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      }`}
    >
      <div
        className="relative flex h-[100px] items-end bg-cover bg-center px-3 pb-2.5"
        style={{
          background: imageUrl
            ? `linear-gradient(180deg, rgba(5, 30, 41, 0.06) 0%, rgba(5, 30, 41, 0.18) 42%, rgba(5, 30, 41, 0.86) 100%), url('${imageUrl}')`
            : gradient,
        }}
      >
        <span className="absolute left-2 top-2 rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {badge}
        </span>
        <span className="text-[13px] font-bold text-white">{price}</span>
      </div>
      <div className="bg-white px-3 py-2">
        <div className="mb-0.5 text-xs font-bold text-ink">{title}</div>
        <div className="text-[11px] text-faint">{meta}</div>
      </div>
    </div>
  );
}

const FEATURES = [
  "Inscription 100% gratuite",
  "Biens vérifiés, acteurs référencés",
  "Gérez vos biens et vos offres",
];

export function SignupBrand() {
  return (
    <>
      <h2 className="mb-3.5 text-[30px] font-extrabold leading-tight tracking-[-0.6px] text-white">
        Rejoignez Akwaba
        <br />
        Immo dès aujourd&apos;hui
      </h2>
      <p className="mb-9 max-w-[380px] text-[15px] leading-relaxed text-white/[0.62]">
        Créez votre compte gratuit et accédez à des milliers de biens ou publiez
        vos annonces en moins de 5 minutes.
      </p>
      <div className="flex flex-col gap-4">
        {FEATURES.map((f) => (
          <div key={f} className="flex items-center gap-3.5">
            <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-white/10">
              <Check className="size-[18px] text-gold-400" />
            </span>
            <span className="text-sm text-white/80">{f}</span>
          </div>
        ))}
      </div>
    </>
  );
}
