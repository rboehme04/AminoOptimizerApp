import {
    Avocado3dIcon,
    Broccoli3dIcon,
    FlexedBiceps3dIcon,
    Grapes3dIcon,
    Lion3dIcon,
    Peach3dIcon,
    RedApple3dIcon,
    Spaghetti3dIcon,
} from "@/assets/icons/icons";
import type { ComponentType } from "react";

// Reference values (per day) for all nutrients displayed in DetailsNaehrstoffprofilComponent.
// Replace the placeholder numbers with your actual guideline values as needed.
export const nutrientReferences: Record<string, number> = {
  // Überblick
  Energie: 0,
  Eiweiß: 0,
  Gesamtfett: 0,
  Kohlenhydrate: 0,
  Ballaststoffe: 0,
  Cholesterin: 0,
  Wasser: 0,
  Alkohol: 0,

  // Vitamine
  "Vitamin A": 0,
  "Vitamin A (IU)": 0,
  "Vitamin B6": 0,
  "Vitamin B12": 0,
  "Vitamin C": 0,
  "Vitamin D": 0,
  "Vitamin D3": 0,
  "Vitamin D (IU)": 0,
  "Vitamin E": 0,
  "Vitamin E Alpha": 0,
  "Vitamin K": 0,
  Thiamin: 0,
  Riboflavin: 0,
  Niacin: 0,
  Pantothensäure: 0,
  Biotin: 0,
  Folsäure: 0,
  "Folat (DFE)": 0,
  Gesamtfolat: 0,

  // Mengenelemente
  Calcium: 0,
  Chlorid: 0,
  Magnesium: 0,
  Phosphor: 0,
  Kalium: 0,
  Natrium: 0,

  // Spurenelemente
  Chrom: 0,
  Kupfer: 0,
  Iod: 0,
  Eisen: 0,
  Mangan: 0,
  Molybdän: 0,
  Selen: 0,
  Zink: 0,

  // Kohlenhydrate
  Kohlenhydrate: 0,
  Gesamtzucker: 0,
  "Hinzugefügte Zucker": 0,
  "Andere Kohlenhydrate": 0,
  Ballaststoffe: 0,
  "Lösliche Faser": 0,
  "Unlösliche Faser": 0,
  Zuckeralkohole: 0,
  Sorbit: 0,
  Xylit: 0,

  // Aminosäuren
  Alanin: 0,
  Arginin: 0,
  Asparaginsäure: 0,
  Cystin: 0,
  Cystein: 0,
  Glutaminsäure: 0,
  Glycin: 0,
  Histidin: 0,
  Isoleucin: 0,
  Leucin: 0,
  Lysin: 0,
  Methionin: 0,
  Phenylalanin: 0,
  Prolin: 0,
  Serin: 0,
  Threonin: 0,
  Tryptophan: 0,
  Tyrosin: 0,
  Valin: 0,
  Taurin: 0,

  // Fettsäuren
  "Gesättigte Fettsäuren": 0,
  "Einfach ungesättigte Fettsäuren": 0,
  "Mehrfach ungesättigte Fettsäuren": 0,
  Transfette: 0,
  "Omega 3": 0,
  "Omega 6": 0,
  "Omega 9": 0,
  Laurinsäure: 0,
  Myristinsäure: 0,
  Palmitinsäure: 0,
  Stearinsäure: 0,
  Ölsäure: 0,
  Linolsäure: 0,
  Linolensäure: 0,
  "Alpha-Linolensäure": 0,
  Arachidonsäure: 0,
  "Dihomo-Gamma-Linolensäure": 0,
  "Docosahexaensäure (DHA)": 0,
  "Docosapentaensäure (DPA)": 0,
  "Eicosapentaensäure (EPA)": 0,
  Eicosensäure: 0,
  Erucasäure: 0,
  Caprinsäure: 0,
  Caprylsäure: 0,

  // Sekundäre Pflanzenstoffe
  Koffein: 0,
  "Nicht zugeordnet": 0,
};

export interface NutritionalValueConfig {
  label: string;
  current: number;
  reference: number;
  measuringUnit: string;
}

export interface NaehrstoffRowConfig {
  title: string;
  values: NutritionalValueConfig[];
  onPress?: () => void;
  icon?: ComponentType<{ size?: number }>;
}

const createValue = (
  label: string,
  measuringUnit = "g",
): NutritionalValueConfig => ({
  label,
  current: 0,
  reference: nutrientReferences[label] ?? 0,
  measuringUnit,
});

export const naehrstoffprofilRows: NaehrstoffRowConfig[] = [
  {
    title: "Überblick",
    values: [
      createValue("Energie", "kcal"),
      createValue("Eiweiß"),
      createValue("Gesamtfett"),
      createValue("Kohlenhydrate"),
      createValue("Ballaststoffe"),
      createValue("Cholesterin"),
      createValue("Wasser"),
      createValue("Alkohol"),
    ],
    icon: Lion3dIcon,
  },
  {
    title: "Vitamine",
    values: [
      createValue("Vitamin A"),
      createValue("Vitamin A (IU)"),
      createValue("Vitamin B6"),
      createValue("Vitamin B12"),
      createValue("Vitamin C"),
      createValue("Vitamin D"),
      createValue("Vitamin D3"),
      createValue("Vitamin D (IU)"),
      createValue("Vitamin E"),
      createValue("Vitamin E Alpha"),
      createValue("Vitamin K"),
      createValue("Thiamin"),
      createValue("Riboflavin"),
      createValue("Niacin"),
      createValue("Pantothensäure"),
      createValue("Biotin"),
      createValue("Folsäure"),
      createValue("Folat (DFE)"),
      createValue("Gesamtfolat"),
    ],
    icon: RedApple3dIcon,
  },
  {
    title: "Mengenelemente",
    values: [
      createValue("Calcium"),
      createValue("Chlorid"),
      createValue("Magnesium"),
      createValue("Phosphor"),
      createValue("Kalium"),
      createValue("Natrium"),
    ],
    icon: Broccoli3dIcon,
  },
  {
    title: "Spurenelemente",
    values: [
      createValue("Chrom"),
      createValue("Kupfer"),
      createValue("Iod"),
      createValue("Eisen"),
      createValue("Mangan"),
      createValue("Molybdän"),
      createValue("Selen"),
      createValue("Zink"),
    ],
    icon: Peach3dIcon,
  },
  {
    title: "Kohlenhydrate",
    values: [
      createValue("Kohlenhydrate"),
      createValue("Gesamtzucker"),
      createValue("Hinzugefügte Zucker"),
      createValue("Andere Kohlenhydrate"),
      createValue("Ballaststoffe"),
      createValue("Lösliche Faser"),
      createValue("Unlösliche Faser"),
      createValue("Zuckeralkohole"),
      createValue("Sorbit"),
      createValue("Xylit"),
    ],
    icon: Spaghetti3dIcon,
  },
  {
    title: "Aminosäuren",
    values: [
      createValue("Alanin"),
      createValue("Arginin"),
      createValue("Asparaginsäure"),
      createValue("Cystin"),
      createValue("Cystein"),
      createValue("Glutaminsäure"),
      createValue("Glycin"),
      createValue("Histidin"),
      createValue("Isoleucin"),
      createValue("Leucin"),
      createValue("Lysin"),
      createValue("Methionin"),
      createValue("Phenylalanin"),
      createValue("Prolin"),
      createValue("Serin"),
      createValue("Threonin"),
      createValue("Tryptophan"),
      createValue("Tyrosin"),
      createValue("Valin"),
      createValue("Taurin"),
    ],
    icon: FlexedBiceps3dIcon,
  },
  {
    title: "Fettsäuren",
    values: [
      createValue("Gesamtfett"),
      createValue("Gesättigte Fettsäuren"),
      createValue("Einfach ungesättigte Fettsäuren"),
      createValue("Mehrfach ungesättigte Fettsäuren"),
      createValue("Transfette"),
      createValue("Omega 3"),
      createValue("Omega 6"),
      createValue("Omega 9"),
      createValue("Laurinsäure"),
      createValue("Myristinsäure"),
      createValue("Palmitinsäure"),
      createValue("Stearinsäure"),
      createValue("Ölsäure"),
      createValue("Linolsäure"),
      createValue("Linolensäure"),
      createValue("Alpha-Linolensäure"),
      createValue("Arachidonsäure"),
      createValue("Dihomo-Gamma-Linolensäure"),
      createValue("Docosahexaensäure (DHA)"),
      createValue("Docosapentaensäure (DPA)"),
      createValue("Eicosapentaensäure (EPA)"),
      createValue("Eicosensäure"),
      createValue("Erucasäure"),
      createValue("Caprinsäure"),
      createValue("Caprylsäure"),
    ],
    icon: Avocado3dIcon,
  },
  {
    title: "Sekundäre Pflanzenstoffe",
    values: [createValue("Koffein"), createValue("Nicht zugeordnet")],
    icon: Grapes3dIcon,
  },
];
