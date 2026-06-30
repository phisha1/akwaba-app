# Akwaba Immo

Plateforme immobilière du Cameroun — _acheter, louer, vendre._

Implémentation de la maquette **Akwaba Immo** (Claude Design) en **Next.js 16
(App Router) · React 19 · TypeScript · Tailwind CSS v4**.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

## Stack

| Domaine    | Choix                          |
| ---------- | ------------------------------ |
| Framework  | Next.js 16 (App Router)        |
| UI         | React 19 + TypeScript          |
| Styles     | Tailwind CSS v4 (tokens dans `globals.css`) |
| Police     | Plus Jakarta Sans (`next/font`) |
| Cartes     | Leaflet + react-leaflet        |
| Icônes     | lucide-react                   |

## Arborescence

```
src/
├─ app/
│  ├─ layout.tsx                 # racine : <html>, police, métadonnées
│  ├─ globals.css                # tokens de design (couleurs, ombres, radii)
│  ├─ (site)/                    # pages publiques (Header + Footer)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                # Écran 1 — Accueil
│  │  ├─ recherche/              # Écran 2 — Résultats de recherche
│  │  ├─ annonces/[id]/          # Écran 3 — Fiche détaillée
│  │  ├─ annuaire/               # Écran 7 — Annuaire des acteurs
│  │  └─ metiers/                # Écran 8 — Métiers de l'immobilier
│  ├─ (auth)/                    # Écrans 4 & 5 (mise en page dédiée)
│  │  ├─ layout.tsx
│  │  ├─ connexion/
│  │  └─ inscription/
│  └─ tableau-de-bord/           # Écran 6 — Tableau de bord
├─ components/
│  ├─ layout/                    # Header, Footer, Logo
│  ├─ ui/                        # primitives (Button, …)
│  └─ dev/                       # ScreenPlaceholder (temporaire)
└─ lib/
   ├─ types.ts                   # types métier (Property, Actor, Profession)
   ├─ utils.ts                   # cn(), formatFCFA()
   └─ mock/                      # données fictives (annonces, acteurs, métiers)
```

## Les 8 écrans

| #   | Route                | Écran                       | État        |
| --- | -------------------- | --------------------------- | ----------- |
| 1   | `/`                  | Accueil                     | placeholder |
| 2   | `/recherche`         | Résultats de recherche      | placeholder |
| 3   | `/annonces/[id]`     | Fiche détaillée             | placeholder |
| 4   | `/connexion`         | Connexion                   | placeholder |
| 5   | `/inscription`       | Inscription                 | placeholder |
| 6   | `/tableau-de-bord`   | Tableau de bord             | placeholder |
| 7   | `/annuaire`          | Annuaire des acteurs        | placeholder |
| 8   | `/metiers`           | Métiers de l'immobilier     | placeholder |

## Maquette source

Les fichiers de référence du handoff Claude Design sont dans
[`design-reference/`](./design-reference) — `Akwaba Immo.dc.html` est le design
principal à recréer à l'identique.
