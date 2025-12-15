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
  column?: string;
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
      { label: "Energie", reference: 0, measuringUnit: "kcal", column: "calories" },
      { label: "Eiweiß", reference: 0, measuringUnit: "g", column: "protein" },
      { label: "Kohlenhydrate", reference: 0, measuringUnit: "g", column: "carbohydrates" },
      { label: "Fett", reference: 0, measuringUnit: "g", column: "total_fat" },
      { label: "Ballaststoffe", reference: 0, measuringUnit: "g", column: "dietary_fiber" },
      { label: "Wasser", reference: 0, measuringUnit: "g", column: "water" },
      { label: "Alkohol", reference: 0, measuringUnit: "g", column: "ethyl_alcohol" },
    ],
    icon: Lion3dIcon,
  },
  {
    title: "Vitamine",
    values: [
      { label: "Vitamin A", reference: 0, measuringUnit: "g", column: "vitamin_a" },
      { label: "Vitamin A (IU)", reference: 0, measuringUnit: "IU", column: "vitamin_a_iu" },
      { label: "Vitamin B6", reference: 0, measuringUnit: "g", column: "vitamin_b6" },
      { label: "Vitamin B12", reference: 0, measuringUnit: "g", column: "vitamin_b12" },
      { label: "Vitamin C", reference: 0, measuringUnit: "g", column: "vitamin_c" },
      { label: "Vitamin D", reference: 0, measuringUnit: "g", column: "vitamin_d" },
      { label: "Vitamin D3", reference: 0, measuringUnit: "g", column: "vitamin_d3" },
      { label: "Vitamin D (IU)", reference: 0, measuringUnit: "IU", column: "vitamin_d_iu" },
      { label: "Vitamin E", reference: 0, measuringUnit: "g", column: "vitamin_e" },
      { label: "Vitamin E Alpha", reference: 0, measuringUnit: "g", column: "vitamin_e_alpha" },
      { label: "Vitamin K", reference: 0, measuringUnit: "g", column: "vitamin_k" },
      { label: "Thiamin", reference: 0, measuringUnit: "g", column: "thiamin" },
      { label: "Riboflavin", reference: 0, measuringUnit: "g", column: "riboflavin" },
      { label: "Niacin", reference: 0, measuringUnit: "g", column: "niacin" },
      { label: "Pantothensäure", reference: 0, measuringUnit: "g", column: "pantothenic_acid" },
      { label: "Biotin", reference: 0, measuringUnit: "g", column: "biotin" },
      { label: "Folsäure", reference: 0, measuringUnit: "g", column: "folic_acid" },
      { label: "Folat (DFE)", reference: 0, measuringUnit: "g", column: "folate_dfe" },
      { label: "Gesamtfolat", reference: 0, measuringUnit: "g", column: "total_folate" },
    ],
    icon: RedApple3dIcon,
  },
  {
    title: "Mengenelemente",
    values: [
      { label: "Calcium", reference: 0, measuringUnit: "g", column: "calcium" },
      { label: "Chlorid", reference: 0, measuringUnit: "g", column: "chlorine" },
      { label: "Magnesium", reference: 0, measuringUnit: "g", column: "magnesium" },
      { label: "Phosphor", reference: 0, measuringUnit: "g", column: "phosphorus" },
      { label: "Kalium", reference: 0, measuringUnit: "g", column: "potassium" },
      { label: "Natrium", reference: 0, measuringUnit: "g", column: "sodium" },
    ],
    icon: Broccoli3dIcon,
  },
  {
    title: "Spurenelemente",
    values: [
      { label: "Chrom", reference: 0, measuringUnit: "g", column: "chromium" },
      { label: "Kupfer", reference: 0, measuringUnit: "g", column: "copper" },
      { label: "Iod", reference: 0, measuringUnit: "g", column: "iodine" },
      { label: "Eisen", reference: 0, measuringUnit: "g", column: "iron" },
      { label: "Mangan", reference: 0, measuringUnit: "g", column: "manganese" },
      { label: "Molybdän", reference: 0, measuringUnit: "g", column: "molybdenum" },
      { label: "Selen", reference: 0, measuringUnit: "g", column: "selenium" },
      { label: "Zink", reference: 0, measuringUnit: "g", column: "zinc" },
    ],
    icon: Peach3dIcon,
  },
  {
    title: "Kohlenhydrate",
    values: [
      { label: "Kohlenhydrate", reference: 0, measuringUnit: "g", column: "carbohydrates" },
      { label: "Gesamtzucker", reference: 0, measuringUnit: "g", column: "total_sugars" },
      { label: "Hinzugefügte Zucker", reference: 0, measuringUnit: "g", column: "added_sugars" },
      { label: "Andere Kohlenhydrate", reference: 0, measuringUnit: "g", column: "other_carbohydrates" },
      { label: "Ballaststoffe", reference: 0, measuringUnit: "g", column: "dietary_fiber" },
      { label: "Lösliche Faser", reference: 0, measuringUnit: "g", column: "soluble_fiber" },
      { label: "Unlösliche Faser", reference: 0, measuringUnit: "g", column: "insoluble_fiber" },
      { label: "Zuckeralkohole", reference: 0, measuringUnit: "g", column: "sugar_alcohols" },
      { label: "Sorbit", reference: 0, measuringUnit: "g", column: "sorbitol" },
      { label: "Xylit", reference: 0, measuringUnit: "g", column: "xylitol" },
    ],
    icon: Spaghetti3dIcon,
  },
  {
    title: "Aminosäuren",
    values: [
      { label: "Alanin", reference: 0, measuringUnit: "g", column: "alanine" },
      { label: "Arginin", reference: 0, measuringUnit: "g", column: "arginine" },
      { label: "Asparaginsäure", reference: 0, measuringUnit: "g", column: "aspartic_acid" },
      { label: "Cystin", reference: 0, measuringUnit: "g", column: "cystine" },
      { label: "Cystein", reference: 0, measuringUnit: "g", column: "cysteine" },
      { label: "Glutaminsäure", reference: 0, measuringUnit: "g", column: "glutamic_acid" },
      { label: "Glycin", reference: 0, measuringUnit: "g", column: "glycine" },
      { label: "Histidin", reference: 0, measuringUnit: "g", column: "histidine" },
      { label: "Isoleucin", reference: 0, measuringUnit: "g", column: "isoleucine" },
      { label: "Leucin", reference: 0, measuringUnit: "g", column: "leucine" },
      { label: "Lysin", reference: 0, measuringUnit: "g", column: "lysine" },
      { label: "Methionin", reference: 0, measuringUnit: "g", column: "methionine" },
      { label: "Phenylalanin", reference: 0, measuringUnit: "g", column: "phenylalanine" },
      { label: "Prolin", reference: 0, measuringUnit: "g", column: "proline" },
      { label: "Serin", reference: 0, measuringUnit: "g", column: "serine" },
      { label: "Threonin", reference: 0, measuringUnit: "g", column: "threonine" },
      { label: "Tryptophan", reference: 0, measuringUnit: "g", column: "tryptophan" },
      { label: "Tyrosin", reference: 0, measuringUnit: "g", column: "tyrosine" },
      { label: "Valin", reference: 0, measuringUnit: "g", column: "valine" },
      { label: "Taurin", reference: 0, measuringUnit: "g", column: "taurine" },
    ],
    icon: FlexedBiceps3dIcon,
  },
  {
    title: "Fettsäuren",
    values: [
      { label: "Gesamtfett", reference: 0, measuringUnit: "g", column: "total_fat" },
      { label: "Gesättigte Fettsäuren", reference: 0, measuringUnit: "g", column: "saturated_fats" },
      {
        label: "Einfach ungesättigte Fettsäuren",
        reference: 0,
        measuringUnit: "g",
        column: "monounsaturated_fats",
      },
      {
        label: "Mehrfach ungesättigte Fettsäuren",
        reference: 0,
        measuringUnit: "g",
        column: "polyunsaturated_fats",
      },
      { label: "Transfette", reference: 0, measuringUnit: "g", column: "trans_fats" },
      { label: "Omega 3", reference: 0, measuringUnit: "g", column: "omega_3" },
      { label: "Omega 6", reference: 0, measuringUnit: "g", column: "omega_6" },
      { label: "Omega 9", reference: 0, measuringUnit: "g", column: "omega_9" },
      { label: "Laurinsäure", reference: 0, measuringUnit: "g", column: "lauric_acid" },
      { label: "Myristinsäure", reference: 0, measuringUnit: "g", column: "myristic_acid" },
      { label: "Palmitinsäure", reference: 0, measuringUnit: "g", column: "palmitic_acid" },
      { label: "Stearinsäure", reference: 0, measuringUnit: "g", column: "stearic_acid" },
      { label: "Ölsäure", reference: 0, measuringUnit: "g", column: "oleic_acid" },
      { label: "Linolsäure", reference: 0, measuringUnit: "g", column: "linoleic_acid" },
      { label: "Linolensäure", reference: 0, measuringUnit: "g", column: "linolenic_acid" },
      { label: "Alpha-Linolensäure", reference: 0, measuringUnit: "g", column: "alpha_linolenic_acid" },
      { label: "Arachidonsäure", reference: 0, measuringUnit: "g", column: "arachidonic_acid" },
      {
        label: "Dihomo-Gamma-Linolensäure",
        reference: 0,
        measuringUnit: "g",
        column: "dihomo_gamma_linolenic_acid",
      },
      {
        label: "Docosahexaensäure (DHA)",
        reference: 0,
        measuringUnit: "g",
        column: "docosahexaenoic_acid",
      },
      {
        label: "Docosapentaensäure (DPA)",
        reference: 0,
        measuringUnit: "g",
        column: "docosapentaenoic_acid",
      },
      {
        label: "Eicosapentaensäure (EPA)",
        reference: 0,
        measuringUnit: "g",
        column: "eicosapentaenoic_acid",
      },
      { label: "Eicosensäure", reference: 0, measuringUnit: "g", column: "eicosenoic_acid" },
      { label: "Erucasäure", reference: 0, measuringUnit: "g", column: "erucic_acid" },
      { label: "Caprinsäure", reference: 0, measuringUnit: "g", column: "capric_acid" },
      { label: "Caprylsäure", reference: 0, measuringUnit: "g", column: "caprylic_acid" },
    ],
    icon: Avocado3dIcon,
  },
  {
    title: "Sekundäre Pflanzenstoffe",
    values: [
      { label: "Koffein", reference: 0, measuringUnit: "g", column: "caffeine" },
      { label: "Nicht zugeordnet", reference: 0, measuringUnit: "g", column: "undefined" },
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
  column: string;
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
  const ref = nutrientReferenceMap[label];
  return {
    label,
    current: 0,
    reference: ref?.reference ?? 0,
    measuringUnit: ref?.measuringUnit ?? measuringUnit,
    column: ref?.column ?? "",
  };
};

export const naehrstoffprofilRows: NaehrstoffRowConfig[] = nutrientReferences.map(
  ({ title, values, icon }) => ({
    title,
    values: values.map(({ label, measuringUnit }) =>
      createValue(label, measuringUnit),
    ),
    icon,
  }),
);

const oldNutrientReferencesBeforeEditing: NutrientReferenceGroup[] = [
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