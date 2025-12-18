import {
  naehrstoffprofilRows,
  type NaehrstoffRowConfig,
  type NutritionalValueConfig,
} from "@/assets/datasetConfig";
import { ChevronRightIcon, EatSymbolIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { supabase } from "@/utils/supabase";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "./progressBar";

interface ValueRowContainerProps {
  value: NutritionalValueConfig;
  /**
   * Protein content per 100 g food (from "Überblick" -> "Eiweiß").
   * Used to calculate Chemical Score (CS) for amino acids.
   */
  proteinPer100g?: number;
  /**
   * If true, the percentage is shown as Chemical Score (CS).
   */
  showChemicalScore?: boolean;
}

const ValueRowContainer = ({
  value,
  proteinPer100g,
  showChemicalScore,
}: ValueRowContainerProps) => {
  const { current, reference, label, measuringUnit } = value;

  // Amino acids that should be displayed in mg (values are stored in g)
  const AMINO_ACIDS_IN_MG = new Set([
    "Isoleucin",
    "Leucin",
    "Lysin",
    "Methionin + Cystin",
    "Phenylalanin + Tyrosin",
    "Threonin",
    "Tryptophan",
    "Valin",
    "Histidin",
  ]);

  const isAminoAcidMg = AMINO_ACIDS_IN_MG.has(label);

  // Default: simple percentage current / reference
  let percentage =
    reference === 0 ? 0 : Math.round((current / reference) * 100);

  // For amino acids, optionally compute Chemical Score (CS)
  if (
    showChemicalScore &&
    isAminoAcidMg &&
    typeof proteinPer100g === "number" &&
    proteinPer100g > 0 &&
    reference > 0
  ) {
    // Factor so that total protein is 100 g
    const proteinFactor = 100 / proteinPer100g;
    // Current amino acid amount normalized to 100 g protein
    const currentPer100gProtein = current * proteinFactor;
    const cs = (currentPer100gProtein / reference) * 100;
    percentage = Math.round(cs);
  }

  const unitFactor = isAminoAcidMg ? 1000 : 1; // g -> mg for amino acids
  const displayUnit = isAminoAcidMg ? "mg" : measuringUnit;
  const displayCurrent = current * unitFactor;
  const displayReference = reference * unitFactor;

  const formatNumber = (num: number, unit: string, lbl: string) => {
    if (num === null || num === undefined || Number.isNaN(num)) return "-";

    const lowerUnit = unit.toLowerCase();
    const lowerLabel = lbl.toLowerCase();

    // Treat calories specially: no decimal places
    const isCalories =
      lowerUnit.includes("kcal") ||
      lowerLabel.includes("kcal") ||
      lowerLabel.includes("kalorien");

    if (isCalories) {
      return Math.round(num).toString();
    }

    // Other nutrients: max 1 decimal place
    const rounded = Math.round(num * 10) / 10;
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1);
  };

  return (
    <View style={styles.valueRowOuterContainer}>
      <View style={styles.valueRowInnerContainer}>
        <View style={styles.valueRowLeftContainer}>
          <Text style={styles.valueRowWhiteText}>{label}</Text>
        </View>
        <View style={styles.valueRowRightContainer}>
          <Text style={styles.valueRowWhiteText}>
            {formatNumber(displayCurrent, displayUnit, label)} /{" "}
            {formatNumber(displayReference, displayUnit, label)} {displayUnit}
          </Text>
          <Text style={styles.valueRowGreyText}>
            {showChemicalScore && isAminoAcidMg ? "CS " : ""}
            {percentage}%
          </Text>
        </View>
      </View>
      <ProgressBar current={current} max={reference} />
    </View>
  );
};

interface NaehrstoffprofilRowProps {
  title?: string;
  values: NutritionalValueConfig[];
  onPress?: () => void;
  icon?: React.ComponentType<{ size?: number }>;
  proteinPer100g?: number;
  showChemicalScore?: boolean;
}

const NaehrstoffprofilRow = ({
  title = "Title",
  values = [],
  onPress,
  icon: Icon = EatSymbolIcon,
  proteinPer100g,
  showChemicalScore,
}: NaehrstoffprofilRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (onPress) {
      onPress();
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.rowOuterContainer}>
      <Pressable style={styles.rowInnerContainer} onPress={toggleExpanded}>
        <Icon size={28} />
        <Text style={styles.rowText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronRightIcon size={20} color={Color.neutralWhite} />
        </Animated.View>
      </Pressable>
      {isExpanded && values.length > 0 && (
        <View style={styles.valueRowListContainer}>
          {values.map((value, index) => (
            <ValueRowContainer
              key={`${value.label}-${index}`}
              value={value}
              proteinPer100g={proteinPer100g}
              showChemicalScore={showChemicalScore}
            />
          ))}
        </View>
      )}
    </View>
  );
};

interface DetailsNaehrstoffprofilComponentProps {
  type: "rez" | "leb";
  label?: string;
  id?: string;
  rows?: NaehrstoffRowConfig[];
  /**
   * Portion size in grams for foods (type === "leb").
   * If omitted, values are shown for the base amount from the database (typically 100 g).
   */
  portionInGrams?: number;
  /**
   * Pre-calculated nutrition rows for recipes (type === "rez").
   * If provided, these will be used instead of loading from database.
   */
  recipeNutritionRows?: NaehrstoffRowConfig[];
}

function DetailsNaehrstoffprofilComponent({
  type,
  label = "Details",
  id,
  rows = naehrstoffprofilRows,
  portionInGrams,
  recipeNutritionRows,
}: DetailsNaehrstoffprofilComponentProps) {
  const insets = useSafeAreaInsets();
  const [baseRows, setBaseRows] = useState<NaehrstoffRowConfig[]>(rows);

  useEffect(() => {
    // For recipes with pre-calculated nutrition, use it directly
    if (type === "rez" && recipeNutritionRows) {
      setBaseRows(recipeNutritionRows);
      return;
    }

    // For Lebensmittel, load from database
    if (type !== "leb" || !id) {
      setBaseRows(rows);
      return;
    }

    const loadNutrients = async () => {
      // collect all column names we need for the current rows
      const columns = Array.from(
        new Set(
          rows
            .flatMap(row =>
              row.values.flatMap(value => {
                if (!value.column) return [];
                return Array.isArray(value.column)
                  ? value.column
                  : [value.column];
              })
            )
            .filter((col): col is string => !!col)
        )
      );

      if (columns.length === 0) {
        setBaseRows(rows);
        return;
      }

      const { data, error } = await supabase
        .from("opennutrition_foods")
        .select(columns.join(","))
        .eq("id", id)
        .single();

      if (error || !data) {
        console.warn("Failed to load nutrient details for food", { id, error });
        setBaseRows(rows);
        return;
      }
      // Use a loose type here because the Supabase row shape is dynamic and
      // depends on the selected columns.
      const rowData = data as unknown as Record<string, number | null>;

      const updatedRows: NaehrstoffRowConfig[] = rows.map(row => ({
        ...row,
        values: row.values.map(value => {
          const parseRaw = (raw: unknown): number => {
            if (typeof raw === "number") return raw;
            if (typeof raw === "string") {
              const n = Number(raw);
              return Number.isFinite(n) ? n : 0;
            }
            return 0;
          };

          let numeric = 0;

          if (Array.isArray(value.column)) {
            // Sum values from multiple columns (e.g. "Methionin + Cystin")
            numeric = value.column.reduce((sum, col) => {
              const raw = rowData[col];
              return sum + parseRaw(raw);
            }, 0);
          } else if (value.column) {
            const raw = rowData[value.column];
            numeric = parseRaw(raw);
          }

          return {
            ...value,
            current: numeric,
          };
        }),
      }));

      setBaseRows(updatedRows);
    };

    loadNutrients();
  }, [type, id, rows, recipeNutritionRows]);

  // Protein content per 100 g food from "Überblick" -> "Eiweiß"
  const proteinPer100g =
    baseRows
      .find(row => row.title === "Überblick")
      ?.values.find(value => value.label === "Eiweiß")?.current ?? undefined;

  const factor =
    type === "leb" && typeof portionInGrams === "number"
      ? portionInGrams / 100
      : 1;

  const resolvedRows: NaehrstoffRowConfig[] = baseRows.map(row => ({
    ...row,
    values: row.values.map(value => ({
      ...value,
      // Scale to requested portion; formatting is handled in the row component
      current: value.current * factor,
    })),
  }));

  return (
    <View
      style={[
        styles.container,
        type === "leb" && {
          paddingBottom: insets.bottom + (Platform.OS === "android" ? 20 : 0),
        },
      ]}
    >
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.rowsListContainer}>
        {resolvedRows.map((row, index) => (
          <NaehrstoffprofilRow
            key={`${row.title}-${index}`}
            title={row.title}
            values={row.values}
            onPress={row.onPress}
            icon={row.icon}
            proteinPer100g={
              row.title === "Aminosäuren" ? proteinPer100g : undefined
            }
            showChemicalScore={row.title === "Aminosäuren"}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    gap: 16,
  },
  labelText: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
  },
  rowsListContainer: {
    gap: 12,
  },
  rowOuterContainer: {
    gap: 16,
    borderRadius: 18,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  rowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 16,
  },
  rowText: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  valueRowListContainer: {
    gap: 16,
    paddingBottom: 12,
  },
  valueRowOuterContainer: {
    gap: 16,
    paddingHorizontal: 12,
  },
  valueRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  valueRowLeftContainer: {
    flex: 1,
  },
  valueRowRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  valueRowWhiteText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  valueRowGreyText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default DetailsNaehrstoffprofilComponent;
