export interface Filiere {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bg: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  filiere: string;
  authors: string[];
  readTime: string;
  premium: boolean;
  views: number;
  publishedAt: string;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  filiere: string;
  expert: string;
  duration: string;
  modules: number;
  price: string;
  level: string;
}

export interface ForumQuestion {
  id: string;
  title: string;
  detail: string;
  author: string;
  filiere: string;
  answers: number;
  solved: boolean;
  createdAt: string;
}

export const filieres: Filiere[] = [
  {
    slug: "acheter",
    title: "Acheter un bien",
    subtitle: "Budget, négociation et sécurisation",
    description:
      "Comprendre les étapes d'achat, comparer les prix et préparer les documents avant de signer.",
    color: "#0E4D5C",
    bg: "#EEF6F8",
  },
  {
    slug: "location",
    title: "Location",
    subtitle: "Trouver, visiter, louer",
    description:
      "Repérer les bons quartiers, organiser les visites et éviter les mauvaises surprises au bail.",
    color: "#B45309",
    bg: "#FEF3C7",
  },
  {
    slug: "foncier",
    title: "Foncier & titres",
    subtitle: "Documents, cadastre, vérification",
    description:
      "Apprendre à vérifier un titre foncier, une parcelle, un notaire ou un intermédiaire.",
    color: "#1E7A4A",
    bg: "#E6F4EC",
  },
  {
    slug: "investissement",
    title: "Investissement",
    subtitle: "Rentabilité et projets locatifs",
    description:
      "Calculer un rendement, choisir un type de bien et suivre un projet immobilier dans le temps.",
    color: "#6D28D9",
    bg: "#EDE9FE",
  },
];

export const articles: Article[] = [
  {
    id: "verifier-titre-foncier",
    title: "Comment vérifier un titre foncier avant d'acheter ?",
    excerpt:
      "Les réflexes simples à avoir avant de payer une avance ou de signer un compromis.",
    filiere: "foncier",
    authors: ["Me. Nadège Fomo", "Akwaba Immo"],
    readTime: "7 min",
    premium: false,
    views: 1240,
    publishedAt: "2026-06-18",
  },
  {
    id: "choisir-quartier-douala",
    title: "Choisir un quartier à Douala selon son budget",
    excerpt:
      "Bonamoussadi, Akwa, Makepe, Logpom : comment comparer sans se perdre.",
    filiere: "location",
    authors: ["Marlyse Ndongo"],
    readTime: "5 min",
    premium: false,
    views: 860,
    publishedAt: "2026-06-20",
  },
  {
    id: "rentabilite-studio-yaounde",
    title: "Studio meublé à Yaoundé : est-ce rentable ?",
    excerpt:
      "Un cas pratique pour calculer les charges, le loyer et le délai de retour.",
    filiere: "investissement",
    authors: ["Jean-Pierre Mbida", "Pierre Kamdem"],
    readTime: "9 min",
    premium: true,
    views: 642,
    publishedAt: "2026-06-24",
  },
];

export const formations: Formation[] = [
  {
    id: "bases-achat-immobilier",
    title: "Acheter son premier bien au Cameroun",
    description:
      "Une formation courte pour comprendre le budget, les visites, les documents et la négociation.",
    filiere: "acheter",
    expert: "Akwaba Academy",
    duration: "3h 20",
    modules: 6,
    price: "Gratuit",
    level: "Débutant",
  },
  {
    id: "documents-fonciers",
    title: "Documents fonciers : lire et vérifier",
    description:
      "Titre foncier, certificat de propriété, plan cadastral : reconnaître les pièces importantes.",
    filiere: "foncier",
    expert: "Me. Nadège Fomo",
    duration: "5h 10",
    modules: 8,
    price: "15 000 FCFA",
    level: "Intermédiaire",
  },
  {
    id: "publier-annonce-pro",
    title: "Publier une annonce immobilière professionnelle",
    description:
      "Photos, prix, description, réponses aux prospects et suivi des demandes de visite.",
    filiere: "location",
    expert: "Marlyse Ndongo",
    duration: "2h 45",
    modules: 5,
    price: "Premium",
    level: "Agent",
  },
];

export const forumQuestions: ForumQuestion[] = [
  {
    id: "avance-location",
    title: "Combien de mois d'avance demander pour une location à Yaoundé ?",
    detail:
      "Je veux louer un appartement et on me demande 12 mois d'avance. Est-ce normal ?",
    author: "Marie E.",
    filiere: "location",
    answers: 4,
    solved: true,
    createdAt: "Aujourd'hui",
  },
  {
    id: "terrain-non-borne",
    title: "Peut-on acheter un terrain non borné ?",
    detail:
      "Le vendeur dit que le bornage sera fait après paiement. Je ne suis pas rassuré.",
    author: "Patrick N.",
    filiere: "foncier",
    answers: 2,
    solved: false,
    createdAt: "Hier",
  },
  {
    id: "studio-meuble-rentabilite",
    title: "Quel prix viser pour un studio meublé à Tsinga ?",
    detail:
      "J'hésite entre location mensuelle classique et courte durée. Que conseillez-vous ?",
    author: "Stéphane K.",
    filiere: "investissement",
    answers: 6,
    solved: true,
    createdAt: "Il y a 3 jours",
  },
];

export function getFiliere(slug: string): Filiere | undefined {
  return filieres.find((f) => f.slug === slug);
}

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getFormation(id: string): Formation | undefined {
  return formations.find((f) => f.id === id);
}

export function getForumQuestion(id: string): ForumQuestion | undefined {
  return forumQuestions.find((q) => q.id === id);
}
