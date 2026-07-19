# AminoApp

**AminoApp** is a mobile app that helps you optimize the amino acid profile of your recipes, improving the biological value of a meal's protein by finding its limiting amino acid and suggesting ingredients that fill the gap.

The project started as part of a Bachelor's thesis looking at how nutritional science and AI-assisted recommendations can make everyday cooking more protein-efficient.

📺 [Watch a short demo of the optimization process](https://youtube.com/shorts/GubBGO2NFMk?feature=share)

## Why amino acids?

Protein quality isn't just about *how much* protein a meal contains, but about *which* amino acids it provides relative to what the body actually needs. A meal is only as good as its limiting amino acid: the essential amino acid present in the lowest relative amount compared to a reference protein. AminoOptimizer calculates this Chemical Score for any recipe and helps you raise it by tweaking ingredients, so more of the protein you eat can actually be put to use.

## Features

- **Recipe management**: create, edit, and browse recipes with ingredients, portions, and preparation steps.
- **Nutrition breakdown**: detailed macro- and micronutrient profile per recipe, computed from a curated food-composition database.
- **Amino acid score (Chemical Score)**: automatically calculates the limiting amino acid and an overall score for each recipe, visualized with bar and radar charts.
- **AI-powered optimization**: the Optimizer screen uses an LLM to suggest ingredient swaps or additions that raise the recipe's amino acid score, respecting allergies/dietary exclusions and calorie budget.
- **Ingredient search & substitution**: browse foods (`Lebensmittel`) from the nutrition database and swap them into recipes with live nutrition recalculation.
- **Personal settings**: dietary preferences, allergies, goals, and units, used to personalize recommendations.
- **Favorites & recent items**: quickly access frequently used recipes and ingredients.

## How it works

1. **Nutrition data**: Ingredient nutrition data (macronutrients, micronutrients, and essential amino acids) is sourced from the German *Bundeslebensmittelschlüssel* (BLS) food composition database, cleaned and transformed via scripts in `data_curation/`, and served through Supabase.
2. **Scoring**: For a given recipe, all ingredient nutrition values are aggregated by portion size. Each essential amino acid is compared to a reference requirement (optionally adjusted for protein digestibility) to compute a **Ref %** per amino acid; the lowest value is the recipe's **Amino Acid Score** (Chemical Score).
3. **Optimization**: The app identifies the limiting amino acid(s) and a shortlist of recommended foods rich in them. An LLM (Meta Llama 3.1 8B via Hugging Face, called through a Supabase Edge Function) then proposes concrete recipe variants (e.g. adding or swapping ingredients) to raise the score while keeping the recipe realistic and within dietary constraints.
4. **Comparison**: Proposed variants are re-scored and presented side-by-side with the original recipe (bar/radar charts) so you can pick and apply the best one.

## Tech stack

- **App**: [Expo](https://expo.dev) / [React Native](https://reactnative.dev) with [Expo Router](https://docs.expo.dev/router/introduction/), TypeScript
- **Backend / data**: [Supabase](https://supabase.com) (Postgres, Edge Functions, RLS policies)
- **Local storage**: `expo-sqlite`, `AsyncStorage`
- **Charts**: `d3-scale`, `d3-shape`, `react-native-svg`
- **AI**: Hugging Face Inference API (Meta Llama 3.1 8B) via a Supabase Edge Function
- **Data curation**: Python scripts for cleaning and transforming the BLS / OpenNutrition datasets

## Project structure

```
app/                    Screens (Expo Router file-based routing)
components/             Reusable UI components (forms, charts, popups, settings, ...)
hooks/                  Custom hooks (LLM calls, recipe drafts, delete popups, ...)
utils/                  Core logic: nutrition calculation, amino acid scoring,
                        LLM prompting/parsing, Supabase & SQLite clients
assets/                 Icons, images, and dataset/nutrient configuration
constants/              Global styles and mapping tables (e.g. digestibility factors)
data_curation/          Python scripts to clean/transform the BLS nutrition dataset
                        into the format used by the app's database
```

## Getting started

### Prerequisites

- **Node.js** (v18 or newer recommended; [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)
- **Expo Go** on your smartphone:
  - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)
  - [Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 1. Install dependencies

```bash
cd AminoOptimizer
npm install
```

### 2. Environment variables

The Supabase URL and public key are stored in `.env` and usually don't need to be changed.

LLM calls go through a Supabase Edge Function, so no LLM API tokens need to be added on the client. See `utils/HUGGINGFACE_SETUP.md` for details on the Hugging Face / Edge Function setup.

### 3. Start the development server

```bash
npx expo start
```

A QR code will appear in the terminal.

### 4. Open the app in Expo Go

- **iPhone**: Open the **Camera** app, scan the QR code, then tap the banner to open it in Expo Go.
- **Android**: Open the **Expo Go** app, tap **"Scan QR code"**, then scan the QR code from the terminal.

**Important:** Your phone and computer must be on the **same Wi-Fi/LAN**.

## Data curation

The `data_curation/` folder contains the scripts used to prepare the nutrition database:

- Cleaning and transforming the raw BLS (*Bundeslebensmittelschlüssel*) dataset (decimal points, filtering, column expansion).
- Cleaning OpenNutrition data as a supplementary source.
- SQL scripts to create the Supabase nutrition table and its row-level security policies.

## Cleaning up

To remove installed dependencies (and free up disk space), delete the `node_modules` folder from the project.

To remove the project entirely, delete the whole project folder (`AminoOptimizer`) from your computer.
