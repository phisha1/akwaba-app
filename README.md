# Akwaba Immo

Plateforme immobilière du Cameroun — achat, location et annuaire des acteurs de
l'immobilier. Implémentation fidèle de la maquette Claude Design
(`design-reference/Akwaba Immo.dc.html`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de design dans `src/app/globals.css`)
- **Leaflet** (cartes, tuiles CARTO) + **lucide-react** (icônes)
- Police **Plus Jakarta Sans** via `next/font`

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Écrans (8)

| Route | Écran |
|-------|-------|
| `/` | Accueil — hero + recherche, biens en vedette, atouts |
| `/recherche` | Résultats — filtres, liste + carte Leaflet synchronisées |
| `/annonces/[id]` | Fiche détaillée — galerie, caractéristiques, carte, agent |
| `/connexion` | Connexion |
| `/inscription` | Inscription (profil acheteur / agent) |
| `/tableau-de-bord` | Tableau de bord agent — KPIs, biens, visites, offres |
| `/annuaire` | Annuaire des acteurs (institutions publiques/privées/pro) |
| `/metiers` | Métiers de l'immobilier (8 fiches, 5 familles) |

## Structure

```
src/
├─ app/                  # routes (App Router)
│  ├─ (site)/            # pages avec Header + Footer
│  ├─ (auth)/            # connexion / inscription
│  ├─ recherche/         # recherche plein écran (carte)
│  └─ tableau-de-bord/   # espace agent (sidebar)
├─ components/           # ui, layout, home, property, search, auth, dashboard, directory
└─ lib/
   ├─ types.ts           # types du domaine
   ├─ utils.ts           # helpers (prix, statuts, dates…)
   ├─ geo.ts             # villes, distances, recherche
   └─ mock/              # données fictives (frontend-first)
```

> Les données sont des **mocks** (`src/lib/mock/`). Le backend (API, auth, base de
> données) sera branché dans une étape ultérieure.
