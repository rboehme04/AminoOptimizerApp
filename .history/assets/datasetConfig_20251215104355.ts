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

export interface NutrientReferenceGroup {
  title: string;
  values: NutrientReference[];
  icon?: ComponentType<{ size?: number }>;
}

export const nutrientReferences: NutrientReferenceGroup[] = [
  {
    title: "Überblick",
    values: [
      { label: "Energie", reference: 0, measuringUnit: "kcal" },
      { label: "Eiweiß", reference: 0, measuringUnit: "g" },
      { label: "Gesamtfett", reference: 0, measuringUnit: "g" },
      { label: "Kohlenhydrate", reference: 0, measuringUnit: "g" },
      { label: "Ballaststoffe", reference: 0, measuringUnit: "g" },
      { label: "Cholesterin", reference: 0, measuringUnit: "g" },
      { label: "Wasser", reference: 0, measuringUnit: "g" },
      { label: "Alkohol", reference: 0, measuringUnit: "g" },
    ],
    icon: Lion3dIcon,
  },
  {
    title: "Vitamine",
    values: [
      { label: "Vitamin A", reference: 0, measuringUnit: "g" },
      { label: "Vitamin A (IU)", reference: 0, measuringUnit: "IU" },
      { label: "Vitamin B6", reference: 0, measuringUnit: "g" },
      { label: "Vitamin B12", reference: 0, measuringUnit: "g" },
      { label: "Vitamin C", reference: 0, measuringUnit: "g" },
      { label: "Vitamin D", reference: 0, measuringUnit: "g" },
      { label: "Vitamin D3", reference: 0, measuringUnit: "g" },
      { label: "Vitamin D (IU)", reference: 0, measuringUnit: "IU" },
      { label: "Vitamin E", reference: 0, measuringUnit: "g" },
      { label: "Vitamin E Alpha", reference: 0, measuringUnit: "g" },
      { label: "Vitamin K", reference: 0, measuringUnit: "g" },
      { label: "Thiamin", reference: 0, measuringUnit: "g" },
      { label: "Riboflavin", reference: 0, measuringUnit: "g" },
      { label: "Niacin", reference: 0, measuringUnit: "g" },
      { label: "Pantothensäure", reference: 0, measuringUnit: "g" },
      { label: "Biotin", reference: 0, measuringUnit: "g" },
      { label: "Folsäure", reference: 0, measuringUnit: "g" },
      { label: "Folat (DFE)", reference: 0, measuringUnit: "g" },
      { label: "Gesamtfolat", reference: 0, measuringUnit: "g" },
    ],
    icon: RedApple3dIcon,
  },
  {
    title: "Mengenelemente",
    values: [
      { label: "Calcium", reference: 0, measuringUnit: "g" },
      { label: "Chlorid", reference: 0, measuringUnit: "g" },
      { label: "Magnesium", reference: 0, measuringUnit: "g" },
      { label: "Phosphor", reference: 0, measuringUnit: "g" },
      { label: "Kalium", reference: 0, measuringUnit: "g" },
      { label: "Natrium", reference: 0, measuringUnit: "g" },
    ],
    icon: Broccoli3dIcon,
  },
  {
    title: "Spurenelemente",
    values: [
      { label: "Chrom", reference: 0, measuringUnit: "g" },
      { label: "Kupfer", reference: 0, measuringUnit: "g" },
      { label: "Iod", reference: 0, measuringUnit: "g" },
      { label: "Eisen", reference: 0, measuringUnit: "g" },
      { label: "Mangan", reference: 0, measuringUnit: "g" },
      { label: "Molybdän", reference: 0, measuringUnit: "g" },
      { label: "Selen", reference: 0, measuringUnit: "g" },
      { label: "Zink", reference: 0, measuringUnit: "g" },
    ],
    icon: Peach3dIcon,
  },
  {
    title: "Kohlenhydrate",
    values: [
      { label: "Kohlenhydrate", reference: 0, measuringUnit: "g" },
      { label: "Gesamtzucker", reference: 0, measuringUnit: "g" },
      { label: "Hinzugefügte Zucker", reference: 0, measuringUnit: "g" },
      { label: "Andere Kohlenhydrate", reference: 0, measuringUnit: "g" },
      { label: "Ballaststoffe", reference: 0, measuringUnit: "g" },
      { label: "Lösliche Faser", reference: 0, measuringUnit: "g" },
      { label: "Unlösliche Faser", reference: 0, measuringUnit: "g" },
      { label: "Zuckeralkohole", reference: 0, measuringUnit: "g" },
      { label: "Sorbit", reference: 0, measuringUnit: "g" },
      { label: "Xylit", reference: 0, measuringUnit: "g" },
    ],
    icon: Spaghetti3dIcon,
  },
  {
    title: "Aminosäuren",
    values: [
      { label: "Alanin", reference: 0, measuringUnit: "g" },
      { label: "Arginin", reference: 0, measuringUnit: "g" },
      { label: "Asparaginsäure", reference: 0, measuringUnit: "g" },
      { label: "Cystin", reference: 0, measuringUnit: "g" },
      { label: "Cystein", reference: 0, measuringUnit: "g" },
      { label: "Glutaminsäure", reference: 0, measuringUnit: "g" },
      { label: "Glycin", reference: 0, measuringUnit: "g" },
      { label: "Histidin", reference: 0, measuringUnit: "g" },
      { label: "Isoleucin", reference: 0, measuringUnit: "g" },
      { label: "Leucin", reference: 0, measuringUnit: "g" },
      { label: "Lysin", reference: 0, measuringUnit: "g" },
      { label: "Methionin", reference: 0, measuringUnit: "g" },
      { label: "Phenylalanin", reference: 0, measuringUnit: "g" },
      { label: "Prolin", reference: 0, measuringUnit: "g" },
      { label: "Serin", reference: 0, measuringUnit: "g" },
      { label: "Threonin", reference: 0, measuringUnit: "g" },
      { label: "Tryptophan", reference: 0, measuringUnit: "g" },
      { label: "Tyrosin", reference: 0, measuringUnit: "g" },
      { label: "Valin", reference: 0, measuringUnit: "g" },
      { label: "Taurin", reference: 0, measuringUnit: "g" },
    ],
    icon: FlexedBiceps3dIcon,
  },
  {
    title: "Fettsäuren",
    values: [
      { label: "Gesamtfett", reference: 0, measuringUnit: "g" },
      { label: "Gesättigte Fettsäuren", reference: 0, measuringUnit: "g" },
      {
        label: "Einfach ungesättigte Fettsäuren",
        reference: 0,
        measuringUnit: "g",
      },
      {
        label: "Mehrfach ungesättigte Fettsäuren",
        reference: 0,
        measuringUnit: "g",
      },
      { label: "Transfette", reference: 0, measuringUnit: "g" },
      { label: "Omega 3", reference: 0, measuringUnit: "g" },
      { label: "Omega 6", reference: 0, measuringUnit: "g" },
      { label: "Omega 9", reference: 0, measuringUnit: "g" },
      { label: "Laurinsäure", reference: 0, measuringUnit: "g" },
      { label: "Myristinsäure", reference: 0, measuringUnit: "g" },
      { label: "Palmitinsäure", reference: 0, measuringUnit: "g" },
      { label: "Stearinsäure", reference: 0, measuringUnit: "g" },
      { label: "Ölsäure", reference: 0, measuringUnit: "g" },
      { label: "Linolsäure", reference: 0, measuringUnit: "g" },
      { label: "Linolensäure", reference: 0, measuringUnit: "g" },
      { label: "Alpha-Linolensäure", reference: 0, measuringUnit: "g" },
      { label: "Arachidonsäure", reference: 0, measuringUnit: "g" },
      {
        label: "Dihomo-Gamma-Linolensäure",
        reference: 0,
        measuringUnit: "g",
      },
      {
        label: "Docosahexaensäure (DHA)",
        reference: 0,
        measuringUnit: "g",
      },
      {
        label: "Docosapentaensäure (DPA)",
        reference: 0,
        measuringUnit: "g",
      },
      {
        label: "Eicosapentaensäure (EPA)",
        reference: 0,
        measuringUnit: "g",
      },
      { label: "Eicosensäure", reference: 0, measuringUnit: "g" },
      { label: "Erucasäure", reference: 0, measuringUnit: "g" },
      { label: "Caprinsäure", reference: 0, measuringUnit: "g" },
      { label: "Caprylsäure", reference: 0, measuringUnit: "g" },
    ],
    icon: Avocado3dIcon,
  },
  {
    title: "Sekundäre Pflanzenstoffe",
    values: [
      { label: "Koffein", reference: 0, measuringUnit: "g" },
      { label: "Nicht zugeordnet", reference: 0, measuringUnit: "g" },
    ],
    icon: Grapes3dIcon,
  },
];

const nutrientReferenceMap = nutrientReferences.reduce<
  Record<string, NutrientReference>
>((acc, group) => {
  group.values.forEach((value) => {
    acc[value.label] = value;
  });
  return acc;
}, {});

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

