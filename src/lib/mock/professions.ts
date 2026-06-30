import type { Profession, ProfessionFamily } from "@/lib/types";

export const FAMILY_THEME: Record<
  ProfessionFamily,
  { label: string; subtitle: string; emoji: string; accent: string; bg: string }
> = {
  offre: {
    label: "Offre",
    subtitle: "Production et conception de biens immobiliers",
    emoji: "🏗",
    accent: "#0E4D5C",
    bg: "#EEF6F8",
  },
  intermediaire: {
    label: "Intermédiaire",
    subtitle: "Mise en relation acheteurs/vendeurs, locataires/propriétaires",
    emoji: "🤝",
    accent: "#B45309",
    bg: "#FEF3C7",
  },
  technique: {
    label: "Finance & Technique",
    subtitle: "Mesure, évaluation, topographie et cadastre foncier",
    emoji: "📏",
    accent: "#047857",
    bg: "#ECFDF5",
  },
  droit: {
    label: "Droit",
    subtitle:
      "Authentification, sécurité juridique et conseil fiscal des transactions",
    emoji: "⚖",
    accent: "#6D28D9",
    bg: "#EDE9FE",
  },
  gestion: {
    label: "Gestion",
    subtitle: "Administration de biens, gestion locative et syndic de copropriété",
    emoji: "🏢",
    accent: "#1D4ED8",
    bg: "#DBEAFE",
  },
};

export const FAMILY_ORDER: ProfessionFamily[] = [
  "offre",
  "intermediaire",
  "technique",
  "droit",
  "gestion",
];

export const professions: Profession[] = [
  {
    id: "promoteur",
    title: "Promoteur immobilier",
    family: "offre",
    emoji: "🏗",
    badge: "Offre",
    description:
      "Conçoit, finance et commercialise des programmes immobiliers neufs résidentiels ou commerciaux.",
    missions: [
      "Acquérir des terrains et monter les dossiers de permis de construire",
      "Superviser la construction et coordonner les intervenants",
      "Commercialiser les biens produits auprès des acheteurs finaux",
      "Gérer le financement et la rentabilité du programme",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "600 000 – 3 000 000 FCFA",
    formations: [
      "Licence/Master Gestion Immobilière (Univ. Yaoundé I)",
      "BTS Immobilier (instituts privés agréés)",
      "Formation professionnelle APICAM",
    ],
  },
  {
    id: "architecte",
    title: "Architecte",
    family: "offre",
    emoji: "📐",
    badge: "Offre",
    description:
      "Conçoit des bâtiments, rédige les plans et supervise les travaux dans le respect des normes locales.",
    missions: [
      "Concevoir les plans et documents techniques de construction",
      "Déposer les permis de construire auprès du MINDCAF",
      "Diriger l'exécution et contrôler la conformité des travaux",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "300 000 – 1 500 000 FCFA",
    formations: [
      "École Polytechnique de Yaoundé",
      "ENSTP – École Nat. Sup. des Travaux Publics",
      "Agrément OA-CAM obligatoire",
    ],
  },
  {
    id: "agent",
    title: "Agent immobilier",
    family: "intermediaire",
    emoji: "🏠",
    badge: "Intermédiaire",
    description:
      "Met en relation acheteurs/locataires et vendeurs/propriétaires. Accompagne les transactions de A à Z.",
    missions: [
      "Prospecter et constituer un portefeuille de biens à vendre ou à louer",
      "Réaliser les estimations de prix du marché local",
      "Organiser les visites et négocier les conditions de transaction",
      "Rédiger mandats et suivre jusqu'à la signature chez le notaire",
    ],
    salaryNote: "Fixe + commissions (2–5% du prix)",
    salaryRange: "150 000 – 800 000 FCFA",
    formations: [
      "BTS Profession Immobilière",
      "Certification CNAI (obligatoire)",
      "Formation continue 40h/an (CNAI)",
    ],
  },
  {
    id: "courtier",
    title: "Courtier en financement",
    family: "intermediaire",
    emoji: "💱",
    badge: "Intermédiaire",
    description:
      "Trouve et négocie les meilleures conditions de crédit immobilier auprès des banques (CFC, AFB…).",
    missions: [
      "Analyser la capacité d'emprunt du client",
      "Comparer les offres des banques partenaires",
      "Monter et déposer les dossiers de crédit",
    ],
    salaryNote: "Fixe + commissions bancaires",
    salaryRange: "200 000 – 1 200 000 FCFA",
    formations: [
      "BTS Banque/Finance (Univ. de Douala)",
      "Licence Pro Finance – Yaoundé II",
      "Formation CFC/COBAC agréée",
    ],
  },
  {
    id: "geometre",
    title: "Géomètre-expert",
    family: "technique",
    emoji: "📏",
    badge: "Technique",
    description:
      "Mesure, délimite et certifie les propriétés foncières. Établit les documents pour l'obtention des titres fonciers.",
    missions: [
      "Réaliser les levés topographiques et plans cadastraux",
      "Borner et délimiter les propriétés foncières",
      "Établir les certificats géomètre pour transactions et TF",
      "Intervenir dans les litiges de bornage et voisinage",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "250 000 – 900 000 FCFA",
    formations: [
      "Institut National de Cartographie (INC) – Yaoundé",
      "Licence Géomatique – Univ. Yaoundé I",
      "Inscription ONIGE obligatoire",
    ],
  },
  {
    id: "notaire",
    title: "Notaire",
    family: "droit",
    emoji: "⚖",
    badge: "Droit",
    description:
      "Officier public chargé d'authentifier les actes de vente, contrats de bail et successions immobilières.",
    missions: [
      "Rédiger et authentifier les actes de vente immobilière",
      "Vérifier les titres fonciers et purger les hypothèques",
      "Conseiller sur les aspects fiscaux et juridiques",
      "Publier les actes au livre foncier (MINDCAF)",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "400 000 – 2 500 000 FCFA",
    formations: [
      "Maîtrise Droit Privé (Univ. Yaoundé II)",
      "ENAM + stage notarial (2 ans)",
      "Chambre des Notaires du Cameroun",
    ],
  },
  {
    id: "gestionnaire",
    title: "Gestionnaire de biens",
    family: "gestion",
    emoji: "🏢",
    badge: "Gestion",
    description:
      "Administre un parc immobilier pour le compte de propriétaires : loyers, entretien, locataires.",
    missions: [
      "Percevoir les loyers et reverser les comptes propriétaires",
      "Sélectionner les locataires et rédiger les baux",
      "Coordonner l'entretien et les réparations",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "180 000 – 700 000 FCFA",
    formations: [
      "BTS Profession Immobilière",
      "Licence Gestion (Univ. Yaoundé II)",
      "Formation CNAI – Module Gestion Locative",
    ],
  },
  {
    id: "syndic",
    title: "Syndic de copropriété",
    family: "gestion",
    emoji: "🏛",
    badge: "Gestion",
    description:
      "Administre les parties communes d'une résidence, gère le budget et représente les copropriétaires.",
    missions: [
      "Convoquer et organiser les assemblées générales",
      "Gérer le budget commun et les charges",
      "Entretenir les parties communes et équipements",
    ],
    salaryNote: "Fourchette mensuelle",
    salaryRange: "200 000 – 800 000 FCFA",
    formations: [
      "BTS Immobilier – Gestion de Copropriété",
      "Formation spécialisée CNAI",
      "Exp. gestion administrative (2+ ans)",
    ],
  },
];
