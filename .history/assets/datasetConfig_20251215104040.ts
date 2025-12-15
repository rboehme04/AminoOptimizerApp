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
// Replace the placeholder numbers and measuring units with your actual guideline values as needed.
export interface NutrientReference {
  label: string;
  reference: number;
  measuringUnit: string;
}

export const nutrientReferences: Record<string, NutrientReference> = {
  // Überblick
  {
    title: "Überblick",
    values: [
      Energie: { label: "Energie", reference: 0, measuringUnit: "kcal" },
      Eiweiß: { label: "Eiweiß", reference: 0, measuringUnit: "g" },
      Gesamtfett: { label: "Gesamtfett", reference: 0, measuringUnit: "g" },
      Kohlenhydrate: { label: "Kohlenhydrate", reference: 0, measuringUnit: "g" },
      Ballaststoffe: { label: "Ballaststoffe", reference: 0, measuringUnit: "g" },
      Cholesterin: { label: "Cholesterin", reference: 0, measuringUnit: "g" },
      Wasser: { label: "Wasser", reference: 0, measuringUnit: "g" },
      Alkohol: { label: "Alkohol", reference: 0, measuringUnit: "g" },
    ],
    icon: Lion3dIcon,
  }
  

  // Vitamine
  "Vitamin A": { label: "Vitamin A", reference: 0, measuringUnit: "g" },
  "Vitamin A (IU)": {
    label: "Vitamin A (IU)",
    reference: 0,
    measuringUnit: "IU",
  },
  "Vitamin B6": { label: "Vitamin B6", reference: 0, measuringUnit: "g" },
  "Vitamin B12": { label: "Vitamin B12", reference: 0, measuringUnit: "g" },
  "Vitamin C": { label: "Vitamin C", reference: 0, measuringUnit: "g" },
  "Vitamin D": { label: "Vitamin D", reference: 0, measuringUnit: "g" },
  "Vitamin D3": { label: "Vitamin D3", reference: 0, measuringUnit: "g" },
  "Vitamin D (IU)": {
    label: "Vitamin D (IU)",
    reference: 0,
    measuringUnit: "IU",
  },
  "Vitamin E": { label: "Vitamin E", reference: 0, measuringUnit: "g" },
  "Vitamin E Alpha": {
    label: "Vitamin E Alpha",
    reference: 0,
    measuringUnit: "g",
  },
  "Vitamin K": { label: "Vitamin K", reference: 0, measuringUnit: "g" },
  Thiamin: { label: "Thiamin", reference: 0, measuringUnit: "g" },
  Riboflavin: { label: "Riboflavin", reference: 0, measuringUnit: "g" },
  Niacin: { label: "Niacin", reference: 0, measuringUnit: "g" },
  Pantothensäure: {
    label: "Pantothensäure",
    reference: 0,
    measuringUnit: "g",
  },
  Biotin: { label: "Biotin", reference: 0, measuringUnit: "g" },
  Folsäure: { label: "Folsäure", reference: 0, measuringUnit: "g" },
  "Folat (DFE)": {
    label: "Folat (DFE)",
    reference: 0,
    measuringUnit: "g",
  },
  Gesamtfolat: { label: "Gesamtfolat", reference: 0, measuringUnit: "g" },

  // Mengenelemente
  Calcium: { label: "Calcium", reference: 0, measuringUnit: "g" },
  Chlorid: { label: "Chlorid", reference: 0, measuringUnit: "g" },
  Magnesium: { label: "Magnesium", reference: 0, measuringUnit: "g" },
  Phosphor: { label: "Phosphor", reference: 0, measuringUnit: "g" },
  Kalium: { label: "Kalium", reference: 0, measuringUnit: "g" },
  Natrium: { label: "Natrium", reference: 0, measuringUnit: "g" },

  // Spurenelemente
  Chrom: { label: "Chrom", reference: 0, measuringUnit: "g" },
  Kupfer: { label: "Kupfer", reference: 0, measuringUnit: "g" },
  Iod: { label: "Iod", reference: 0, measuringUnit: "g" },
  Eisen: { label: "Eisen", reference: 0, measuringUnit: "g" },
  Mangan: { label: "Mangan", reference: 0, measuringUnit: "g" },
  Molybdän: { label: "Molybdän", reference: 0, measuringUnit: "g" },
  Selen: { label: "Selen", reference: 0, measuringUnit: "g" },
  Zink: { label: "Zink", reference: 0, measuringUnit: "g" },

  // Kohlenhydrate
  Kohlenhydrate: {
    label: "Kohlenhydrate",
    reference: 0,
    measuringUnit: "g",
  },
  Gesamtzucker: { label: "Gesamtzucker", reference: 0, measuringUnit: "g" },
  "Hinzugefügte Zucker": {
    label: "Hinzugefügte Zucker",
    reference: 0,
    measuringUnit: "g",
  },
  "Andere Kohlenhydrate": {
    label: "Andere Kohlenhydrate",
    reference: 0,
    measuringUnit: "g",
  },
  Ballaststoffe: { label: "Ballaststoffe", reference: 0, measuringUnit: "g" },
  "Lösliche Faser": {
    label: "Lösliche Faser",
    reference: 0,
    measuringUnit: "g",
  },
  "Unlösliche Faser": {
    label: "Unlösliche Faser",
    reference: 0,
    measuringUnit: "g",
  },
  Zuckeralkohole: {
    label: "Zuckeralkohole",
    reference: 0,
    measuringUnit: "g",
  },
  Sorbit: { label: "Sorbit", reference: 0, measuringUnit: "g" },
  Xylit: { label: "Xylit", reference: 0, measuringUnit: "g" },

  // Aminosäuren
  Alanin: { label: "Alanin", reference: 0, measuringUnit: "g" },
  Arginin: { label: "Arginin", reference: 0, measuringUnit: "g" },
  Asparaginsäure: {
    label: "Asparaginsäure",
    reference: 0,
    measuringUnit: "g",
  },
  Cystin: { label: "Cystin", reference: 0, measuringUnit: "g" },
  Cystein: { label: "Cystein", reference: 0, measuringUnit: "g" },
  Glutaminsäure: {
    label: "Glutaminsäure",
    reference: 0,
    measuringUnit: "g",
  },
  Glycin: { label: "Glycin", reference: 0, measuringUnit: "g" },
  Histidin: { label: "Histidin", reference: 0, measuringUnit: "g" },
  Isoleucin: { label: "Isoleucin", reference: 0, measuringUnit: "g" },
  Leucin: { label: "Leucin", reference: 0, measuringUnit: "g" },
  Lysin: { label: "Lysin", reference: 0, measuringUnit: "g" },
  Methionin: { label: "Methionin", reference: 0, measuringUnit: "g" },
  Phenylalanin: {
    label: "Phenylalanin",
    reference: 0,
    measuringUnit: "g",
  },
  Prolin: { label: "Prolin", reference: 0, measuringUnit: "g" },
  Serin: { label: "Serin", reference: 0, measuringUnit: "g" },
  Threonin: { label: "Threonin", reference: 0, measuringUnit: "g" },
  Tryptophan: { label: "Tryptophan", reference: 0, measuringUnit: "g" },
  Tyrosin: { label: "Tyrosin", reference: 0, measuringUnit: "g" },
  Valin: { label: "Valin", reference: 0, measuringUnit: "g" },
  Taurin: { label: "Taurin", reference: 0, measuringUnit: "g" },

  // Fettsäuren
  "Gesättigte Fettsäuren": {
    label: "Gesättigte Fettsäuren",
    reference: 0,
    measuringUnit: "g",
  },
  "Einfach ungesättigte Fettsäuren": {
    label: "Einfach ungesättigte Fettsäuren",
    reference: 0,
    measuringUnit: "g",
  },
  "Mehrfach ungesättigte Fettsäuren": {
    label: "Mehrfach ungesättigte Fettsäuren",
    reference: 0,
    measuringUnit: "g",
  },
  Transfette: { label: "Transfette", reference: 0, measuringUnit: "g" },
  "Omega 3": { label: "Omega 3", reference: 0, measuringUnit: "g" },
  "Omega 6": { label: "Omega 6", reference: 0, measuringUnit: "g" },
  "Omega 9": { label: "Omega 9", reference: 0, measuringUnit: "g" },
  Laurinsäure: { label: "Laurinsäure", reference: 0, measuringUnit: "g" },
  Myristinsäure: {
    label: "Myristinsäure",
    reference: 0,
    measuringUnit: "g",
  },
  Palmitinsäure: {
    label: "Palmitinsäure",
    reference: 0,
    measuringUnit: "g",
  },
  Stearinsäure: { label: "Stearinsäure", reference: 0, measuringUnit: "g" },
  Ölsäure: { label: "Ölsäure", reference: 0, measuringUnit: "g" },
  Linolsäure: { label: "Linolsäure", reference: 0, measuringUnit: "g" },
  Linolensäure: { label: "Linolensäure", reference: 0, measuringUnit: "g" },
  "Alpha-Linolensäure": {
    label: "Alpha-Linolensäure",
    reference: 0,
    measuringUnit: "g",
  },
  Arachidonsäure: {
    label: "Arachidonsäure",
    reference: 0,
    measuringUnit: "g",
  },
  "Dihomo-Gamma-Linolensäure": {
    label: "Dihomo-Gamma-Linolensäure",
    reference: 0,
    measuringUnit: "g",
  },
  "Docosahexaensäure (DHA)": {
    label: "Docosahexaensäure (DHA)",
    reference: 0,
    measuringUnit: "g",
  },
  "Docosapentaensäure (DPA)": {
    label: "Docosapentaensäure (DPA)",
    reference: 0,
    measuringUnit: "g",
  },
  "Eicosapentaensäure (EPA)": {
    label: "Eicosapentaensäure (EPA)",
    reference: 0,
    measuringUnit: "g",
  },
  Eicosensäure: {
    label: "Eicosensäure",
    reference: 0,
    measuringUnit: "g",
  },
  Erucasäure: { label: "Erucasäure", reference: 0, measuringUnit: "g" },
  Caprinsäure: { label: "Caprinsäure", reference: 0, measuringUnit: "g" },
  Caprylsäure: { label: "Caprylsäure", reference: 0, measuringUnit: "g" },

  // Sekundäre Pflanzenstoffe
  Koffein: { label: "Koffein", reference: 0, measuringUnit: "g" },
  "Nicht zugeordnet": {
    label: "Nicht zugeordnet",
    reference: 0,
    measuringUnit: "g",
  },
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
): NutritionalValueConfig => {
  const ref = nutrientReferences[label];
  return {
    label,
    current: 0,
    reference: ref?.reference ?? 0,
    measuringUnit: ref?.measuringUnit ?? measuringUnit,
  };
};

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
