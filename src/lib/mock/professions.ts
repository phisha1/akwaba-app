import type { Profession } from "@/lib/types";

export const professions: Profession[] = [
  {
    id: "prof-agent",
    title: "Agent immobilier",
    category: "Transaction",
    summary:
      "Met en relation vendeurs/bailleurs et acheteurs/locataires, et accompagne la transaction.",
    missions: [
      "Estimer la valeur d'un bien",
      "Constituer et diffuser des annonces",
      "Organiser les visites",
      "Négocier et sécuriser la transaction",
    ],
    formation: "BTS / Licence en immobilier ou commerce",
  },
  {
    id: "prof-notaire",
    title: "Notaire",
    category: "Juridique",
    summary:
      "Officier public qui authentifie les actes de vente et sécurise le transfert de propriété.",
    missions: [
      "Vérifier les titres fonciers",
      "Rédiger les actes authentiques",
      "Percevoir les droits et taxes",
    ],
    formation: "Master en droit + stage notarial",
  },
  {
    id: "prof-geometre",
    title: "Géomètre-expert",
    category: "Technique",
    summary:
      "Mesure et délimite les terrains, établit les plans et garantit les limites de propriété.",
    missions: ["Bornage", "Lotissement", "Levés topographiques"],
    formation: "Ingénieur géomètre-topographe",
  },
  {
    id: "prof-promoteur",
    title: "Promoteur immobilier",
    category: "Développement",
    summary:
      "Conçoit, finance et pilote des programmes de construction destinés à la vente ou location.",
    missions: [
      "Identifier le foncier",
      "Monter le financement",
      "Coordonner la construction",
      "Commercialiser les lots",
    ],
  },
  {
    id: "prof-architecte",
    title: "Architecte",
    category: "Conception",
    summary:
      "Conçoit les bâtiments, établit les plans et assure le suivi de la qualité du chantier.",
    missions: ["Concevoir les plans", "Déposer le permis de construire", "Suivre le chantier"],
    formation: "Diplôme d'État d'architecte",
  },
  {
    id: "prof-gestionnaire",
    title: "Gestionnaire de biens",
    category: "Gestion",
    summary:
      "Administre les biens pour le compte des propriétaires : loyers, entretien, relation locataire.",
    missions: ["Encaisser les loyers", "Gérer l'entretien", "Gérer les baux et litiges"],
  },
];
