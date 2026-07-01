import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  MapPin,
  Heart,
  Share2,
  Images,
  Home,
  ArrowLeftRight,
  Ruler,
  LayoutGrid,
  Trees,
  ShieldCheck,
  Mail,
  Phone,
  MessageSquare,
  Info,
} from "lucide-react";
import { getProperty, properties } from "@/lib/mock/properties";
import { getActor } from "@/lib/mock/actors";
import {
  STATUS_INFO,
  ROLE_LABEL,
  formatPrice,
  pricePerM2,
  relativeDays,
  initials,
} from "@/lib/utils";
import { CITY_CENTERS, haversineKm, formatDistance } from "@/lib/geo";
import { DetailMapLoader } from "@/components/property/DetailMapLoader";
import { RequestVisitButton } from "@/components/property/RequestVisitButton";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return { title: "Bien introuvable" };
  return {
    title: property.title,
    description: property.description,
  };
}

export default async function FichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  const agent = getActor(property.agentId);
  const status = STATUS_INFO[property.status];
  const transactionLong =
    property.transaction === "vente" ? "À la vente" : "À la location";
  const center = CITY_CENTERS[property.city];
  const distance = center
    ? formatDistance(haversineKm(center, property))
    : null;

  const characteristics = [
    { icon: Home, bg: "#EEF6F8", color: "#0E4D5C", label: "Type de bien", value: property.type },
    { icon: ArrowLeftRight, bg: "#FEF3C7", color: "#B45309", label: "Transaction", value: transactionLong },
    { icon: Ruler, bg: "#EEF6F8", color: "#0E4D5C", label: "Surface habitable", value: `${property.surface} m²` },
    ...(property.pieces != null
      ? [{ icon: LayoutGrid, bg: "#F3E8FF", color: "#7C3AED", label: "Nombre de pièces", value: `${property.pieces} pièces` }]
      : []),
    ...(property.landArea
      ? [{ icon: Trees, bg: "#ECFDF5", color: "#047857", label: "Superficie terrain", value: `${property.landArea} m²` }]
      : []),
    { icon: ShieldCheck, bg: "#E6F4EC", color: "#1E7A4A", label: "Statut", value: status.label },
  ];

  const galleryLabels = property.amenities?.slice(0, 3) ?? ["Vue", "Séjour", "Extérieur"];
  const galleryGradients = [
    "linear-gradient(160deg,#0d3d4a,#1c8a7c)",
    "linear-gradient(130deg,#1a3d2a,#2a6a44)",
    "linear-gradient(150deg,#2a2a4a,#4a4a7c)",
  ];

  return (
    <div className="bg-surface-warm">
      {/* Breadcrumb */}
      <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-line bg-white px-6 text-[13px] sm:px-10 lg:px-14">
        <Link
          href="/recherche"
          className="flex shrink-0 items-center gap-1.5 font-medium text-brand-500 hover:text-brand-600"
        >
          <ArrowLeft className="size-3.5" />
          Retour aux résultats
        </Link>
        <span className="text-line">|</span>
        <Link href="/" className="shrink-0 text-brand-500 hover:underline">
          Accueil
        </Link>
        <span className="text-line-cool">›</span>
        <span className="shrink-0 text-brand-500">{property.city}</span>
        <span className="text-line-cool">›</span>
        <span className="shrink-0 text-brand-500">{property.neighborhood}</span>
        <span className="text-line-cool">›</span>
        <span className="truncate font-medium text-muted">{property.title}</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[1fr_384px] lg:px-14">
        {/* LEFT COLUMN */}
        <div>
          {/* Gallery */}
          <div className="overflow-hidden rounded-2xl bg-[#111]">
            <div
              className="relative h-[300px] overflow-hidden bg-cover bg-center sm:h-[456px]"
              style={
                property.imageUrl
                  ? { backgroundImage: `url('${property.imageUrl}')` }
                  : { background: "linear-gradient(145deg,#051e29 0%,#0a3d4a 42%,#1a7a8c 100%)" }
              }
            >
              <div className="absolute left-5 top-5 z-[2] flex gap-2">
                <span className="rounded-md bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                  {property.transaction === "vente" ? "Vente" : "Location"}
                </span>
                <span
                  className="rounded-md px-3 py-1 text-xs font-bold"
                  style={{ background: status.bg, color: status.color }}
                >
                  {status.label}
                </span>
              </div>
              <div className="absolute right-5 top-5 z-[2] flex gap-2">
                <IconButton>
                  <Heart className="size-[18px]" />
                </IconButton>
                <IconButton>
                  <Share2 className="size-[18px]" />
                </IconButton>
              </div>
              <button className="absolute bottom-5 right-5 z-[2] flex items-center gap-1.5 rounded-[9px] border border-white/20 bg-black/50 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-black/70">
                <Images className="size-3.5" />
                12 photos
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-4 pt-10">
                <span className="text-[13px] text-white/70">
                  {property.neighborhood}, {property.city}, Cameroun
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[3px] bg-[#111] p-[3px]">
              {galleryGradients.map((g, i) => (
                <div
                  key={i}
                  className="relative h-20 overflow-hidden rounded"
                  style={{ background: g }}
                >
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 to-transparent p-2">
                    <span className="text-[10px] font-medium text-white/85">
                      {galleryLabels[i]}
                    </span>
                  </div>
                </div>
              ))}
              <div
                className="relative h-20 overflow-hidden rounded"
                style={{ background: "linear-gradient(140deg,#3a2a1a,#6a4a2a)" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/50">
                  <span className="text-xl font-bold text-white">+8</span>
                  <span className="text-[10px] text-white/70">photos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-8">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{property.type}</Pill>
                <Pill>{transactionLong}</Pill>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs text-[#B0B7C0]">
                <span>Réf. {property.id.toUpperCase()}</span>
                <span className="text-line">·</span>
                <span>{relativeDays(property.createdAt)}</span>
              </div>
            </div>
            <h1 className="mb-3.5 text-2xl font-extrabold leading-tight tracking-[-0.6px] text-ink sm:text-[30px]">
              {property.title}
            </h1>
            <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
              <span className="text-3xl font-extrabold tracking-[-0.5px] text-brand-500 sm:text-[34px]">
                {formatPrice(property.price, property.transaction)}
              </span>
              {property.transaction === "vente" && (
                <span className="text-sm text-faint">
                  {pricePerM2(property.price, property.surface)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-3.5 text-faint" />
              <span>
                {property.neighborhood}, {property.city}, Cameroun
              </span>
              {distance && (
                <>
                  <span className="text-line-cool">·</span>
                  <span className="font-semibold text-brand-500">
                    {distance} du centre-ville
                  </span>
                </>
              )}
            </div>
          </div>

          <Divider />

          {/* Characteristics */}
          <h2 className="mb-5 text-lg font-bold tracking-[-0.3px] text-ink">
            Caractéristiques
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characteristics.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"
              >
                <div
                  className="grid size-[42px] shrink-0 place-items-center rounded-[10px]"
                  style={{ background: c.bg }}
                >
                  <c.icon className="size-5" style={{ color: c.color }} />
                </div>
                <div>
                  <div className="mb-0.5 text-[11px] uppercase tracking-wide text-faint">
                    {c.label}
                  </div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: c.label === "Statut" ? c.color : "#1E2A30" }}
                  >
                    {c.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Description */}
          <h2 className="mb-4 text-lg font-bold tracking-[-0.3px] text-ink">
            Description
          </h2>
          <p className="text-[15px] leading-[1.78] text-ink-soft">
            {property.description}
          </p>

          <Divider />

          {/* Localisation */}
          <h2 className="mb-4 text-lg font-bold tracking-[-0.3px] text-ink">
            Localisation
          </h2>
          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <DetailMapLoader lat={property.lat} lng={property.lng} />
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#B0B7C0]">
            <Info className="size-3.5" />
            <span>
              Position indicative — adresse exacte communiquée après confirmation
              de visite.
            </span>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
          {/* Price + CTA */}
          <div className="rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)]">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-faint">
              {property.transaction === "vente" ? "Prix de vente" : "Loyer mensuel"}
            </div>
            <div className="mb-1 text-[26px] font-extrabold leading-none tracking-[-0.5px] text-brand-500">
              {new Intl.NumberFormat("fr-FR").format(property.price)}
            </div>
            <div className="mb-6 text-[15px] font-bold text-muted">
              FCFA{" "}
              <span className="text-[13px] font-normal text-faint">
                {property.transaction === "vente"
                  ? `· ${pricePerM2(property.price, property.surface)}`
                  : "· par mois"}
              </span>
            </div>

            <div className="mb-5 flex overflow-hidden rounded-xl border-[1.5px] border-line">
              <QuickStat value={String(property.surface)} label="m² hab." divider />
              <QuickStat
                value={property.pieces != null ? String(property.pieces) : "—"}
                label="pièces"
                divider
              />
              <div className="flex-1 px-2 py-3 text-center">
                <div className="mb-0.5 flex justify-center">
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[11px] font-bold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label.slice(0, 6)}.
                  </span>
                </div>
                <div className="text-[11px] text-faint">statut</div>
              </div>
            </div>

            <RequestVisitButton
              propertyId={property.id}
              propertyTitle={property.title}
            />
            <button className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-brand-500 py-[13px] text-[15px] font-bold text-brand-500 transition-colors hover:bg-brand-50">
              <Mail className="size-[17px]" />
              Faire une offre
            </button>
            <p className="mt-3.5 text-center text-xs leading-relaxed text-[#C4C9D0]">
              Réf. {property.id.toUpperCase()} · Sans commission acheteur
            </p>
          </div>

          {/* Agent */}
          {agent && (
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-wider text-faint">
                Publié par
              </div>
              <div className="mb-3.5 flex items-center gap-3">
                <div
                  className="grid size-[52px] shrink-0 place-items-center rounded-[14px]"
                  style={{ background: "linear-gradient(135deg,#0E4D5C,#1a8a7c)" }}
                >
                  <span className="text-lg font-bold text-white">
                    {initials(agent.name)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 truncate text-[15px] font-bold text-ink">
                    {agent.name}
                  </div>
                  <div className="truncate text-[13px] text-muted">
                    {ROLE_LABEL[agent.role]} · {agent.city}
                  </div>
                </div>
              </div>

              {agent.verified && (
                <div className="mb-4 flex items-center gap-2 rounded-[9px] bg-brand-50 px-3 py-2.5">
                  <ShieldCheck className="size-3.5 text-brand-500" />
                  <span className="text-xs font-semibold text-brand-500">
                    Agent certifié Akwaba Immo
                  </span>
                </div>
              )}

              <div className="mb-4 flex gap-3 border-b border-line pb-4">
                <AgentStat value={String(agent.listingsCount)} label="biens actifs" />
                <span className="w-px bg-line" />
                <AgentStat
                  value={`${Math.round((agent.rating / 5) * 100)}%`}
                  label="satisfaction"
                />
                {agent.experienceYears != null && (
                  <>
                    <span className="w-px bg-line" />
                    <AgentStat value={`${agent.experienceYears} ans`} label="expérience" />
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <ContactButton>
                  <Phone className="size-[15px]" />
                  Appeler
                </ContactButton>
                <ContactButton>
                  <MessageSquare className="size-[15px]" />
                  Message
                </ContactButton>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-8 h-px bg-line" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-brand-50 px-3 py-1 text-xs font-bold text-brand-500">
      {children}
    </span>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="grid size-10 place-items-center rounded-[10px] border border-white/20 bg-black/35 text-white hover:bg-black/55">
      {children}
    </button>
  );
}

function QuickStat({
  value,
  label,
  divider = false,
}: {
  value: string;
  label: string;
  divider?: boolean;
}) {
  return (
    <div className={`flex-1 px-2 py-3 text-center ${divider ? "border-r border-line" : ""}`}>
      <div className="text-base font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] text-faint">{label}</div>
    </div>
  );
}

function AgentStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 text-center">
      <div className="text-base font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] text-faint">{label}</div>
    </div>
  );
}

function ContactButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-[10px] border-[1.5px] border-line bg-surface-warm px-2 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-500">
      {children}
    </button>
  );
}
