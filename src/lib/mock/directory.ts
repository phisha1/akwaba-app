export type InstitutionCategory = "public" | "prive" | "professionnel";

export interface Institution {
  id: string;
  acronym: string;
  title: string;
  fullName: string;
  category: InstitutionCategory;
  cities: string[];
  description: string;
  website: string;
}

export const CATEGORY_THEME: Record<
  InstitutionCategory,
  { label: string; logo: string; badgeBg: string; accent: string }
> = {
  public: {
    label: "Public",
    logo: "#0E4D5C",
    badgeBg: "#EEF6F8",
    accent: "#0E4D5C",
  },
  prive: {
    label: "Privé",
    logo: "linear-gradient(135deg,#B45309,#d97706)",
    badgeBg: "#FEF3C7",
    accent: "#B45309",
  },
  professionnel: {
    label: "Professionnel",
    logo: "linear-gradient(135deg,#6D28D9,#7C3AED)",
    badgeBg: "#EDE9FE",
    accent: "#6D28D9",
  },
};

export const institutions: Institution[] = [
  {
    id: "sic",
    acronym: "SIC",
    title: "SIC",
    fullName: "Société Immobilière du Cameroun",
    category: "public",
    cities: ["Yaoundé", "Douala"],
    description:
      "Société d'État chargée de la production et de la gestion de logements sociaux au profit des Camerounais à revenus modestes.",
    website: "sic.cm",
  },
  {
    id: "maetur",
    acronym: "MAETUR",
    title: "MAETUR",
    fullName: "Mission d'Aménagement et d'Équipement des Terrains",
    category: "public",
    cities: ["Yaoundé"],
    description:
      "Structure publique dédiée à la viabilisation et à l'aménagement de lotissements urbains et périurbains à travers tout le Cameroun.",
    website: "maetur.cm",
  },
  {
    id: "cfc",
    acronym: "CFC",
    title: "CFC",
    fullName: "Crédit Foncier du Cameroun",
    category: "public",
    cities: ["Yaoundé"],
    description:
      "Banque spécialisée dans le financement de l'habitat. Accorde des prêts immobiliers aux particuliers et aux promoteurs depuis 1977.",
    website: "creditfoncier.cm",
  },
  {
    id: "mindcaf",
    acronym: "MINDCAF",
    title: "MINDCAF",
    fullName: "Min. des Domaines, du Cadastre et des Affaires Foncières",
    category: "public",
    cities: ["Yaoundé"],
    description:
      "Ministère en charge de la politique foncière nationale, de la tenue du cadastre et de la délivrance des titres fonciers au Cameroun.",
    website: "mindcaf.cm",
  },
  {
    id: "minhdu",
    acronym: "MINHDU",
    title: "MINHDU",
    fullName: "Min. de l'Habitat et du Développement Urbain",
    category: "public",
    cities: ["Yaoundé"],
    description:
      "Ministère de tutelle du secteur du logement. Définit et met en œuvre la politique nationale d'habitat et de planification urbaine.",
    website: "minhdu.cm",
  },
  {
    id: "promotec",
    acronym: "PROMO",
    title: "PROMOTEC",
    fullName: "Promotec Immobilier",
    category: "prive",
    cities: ["Douala"],
    description:
      "Groupe immobilier privé actif dans la promotion, la construction et la commercialisation de résidences haut de gamme à Douala et Yaoundé.",
    website: "promotec.cm",
  },
  {
    id: "afb",
    acronym: "AFB",
    title: "Afriland First",
    fullName: "Afriland First Bank — Pôle Immobilier",
    category: "prive",
    cities: ["Yaoundé", "Douala"],
    description:
      "Première banque privée camerounaise proposant des solutions de financement immobilier compétitives pour particuliers et promoteurs.",
    website: "afrilandfirstbank.com",
  },
  {
    id: "scb",
    acronym: "SCB",
    title: "SCB",
    fullName: "Société Camerounaise de Bâtiment",
    category: "prive",
    cities: ["Douala"],
    description:
      "Entreprise de construction et de promotion immobilière spécialisée dans les bâtiments résidentiels et commerciaux depuis 1985.",
    website: "scb-cameroun.cm",
  },
  {
    id: "cnai",
    acronym: "CNAI",
    title: "CNAI",
    fullName: "Chambre Nationale des Agents Immobiliers",
    category: "professionnel",
    cities: ["Yaoundé"],
    description:
      "Organisation professionnelle regroupant et réglementant l'activité des agents immobiliers agréés sur l'ensemble du territoire camerounais.",
    website: "cnai.cm",
  },
  {
    id: "apicam",
    acronym: "APICAM",
    title: "APICAM",
    fullName: "Association des Promoteurs Immobiliers du Cameroun",
    category: "professionnel",
    cities: ["Douala"],
    description:
      "Fédération professionnelle des promoteurs immobiliers. Défend les intérêts de la profession et promeut les bonnes pratiques du secteur.",
    website: "apicam.cm",
  },
  {
    id: "oa-cam",
    acronym: "OA-CAM",
    title: "OA-CAM",
    fullName: "Ordre des Architectes du Cameroun",
    category: "professionnel",
    cities: ["Yaoundé"],
    description:
      "Ordre professionnel habilité à délivrer les licences d'exercice aux architectes diplômés. Garant de la déontologie architecturale nationale.",
    website: "ordre-architectes-cm.org",
  },
  {
    id: "onige",
    acronym: "ONIGE",
    title: "ONIGE",
    fullName: "Ordre Nat. des Ingénieurs de Génie Civil et des Experts",
    category: "professionnel",
    cities: ["Yaoundé"],
    description:
      "Instance régulatrice des ingénieurs génie civil et géomètres-experts, chargée du contrôle de la qualité des études et relevés fonciers.",
    website: "onige.cm",
  },
];
