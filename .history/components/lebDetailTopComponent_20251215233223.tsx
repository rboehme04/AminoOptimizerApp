import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import {
  addFavoriteLebensmittel,
  isLebensmittelFavorite,
  removeFavoriteLebensmittel,
} from "@/utils/favorites";

interface LebDetailTopComponentProps {
  navbarTitle?: string;
  name?: string;
  calories?: number | null;
  protein?: number | null;
  carbohydrates?: number | null;
  totalFat?: number | null;
  itemId?: string | number;
  portion?: string;
}

const LebDetailTopComponent = ({
  navbarTitle = "",
  name = "",
  calories = null,
  protein = null,
  carbohydrates = null,
  totalFat = null,
  itemId,
  portion,
}: LebDetailTopComponentProps) => {
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Load favorite status on mount
  React.useEffect(() => {
    if (!itemId) return;

    const checkFavorite = async () => {
      try {
        const favorite = await isLebensmittelFavorite(itemId);
        setIsFavorite(favorite);
      } catch (error) {
        console.error("Error checking favorite status", error);
      }
    };

    checkFavorite();
  }, [itemId]);

  const handleToggleFavorite = React.useCallback(async () => {
    if (!itemId || !name || isLoading) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFavoriteLebensmittel(itemId);
        setIsFavorite(false);
      } else {
        await addFavoriteLebensmittel({
          id: itemId,
          title: name,
          portion: portion || "100 g",
          calories: calories != null ? `${Math.round(calories)} kcal` : "0 kcal",
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite", error);
    } finally {
      setIsLoading(false);
    }
  }, [itemId, name, portion, calories, isFavorite, isLoading]);

  const rightActions = React.useMemo(
    () => [
      {
        icon: isFavorite ? (
          <StarFullIcon size={20} color={Color.neutralWhite} />
        ) : (
          <StarLineIcon size={20} color={Color.neutralWhite} />
        ),
        onPress: handleToggleFavorite,
      },
    ],
    [isFavorite, handleToggleFavorite]
  );

  const formatMacro = (value: number | null, unit: string) => {
    if (value === null || value === undefined) return "-";

    // Round to 1 decimal place and avoid trailing ".0" for whole numbers
    const rounded = Math.round(value * 10) / 10;
    const formatted = Number.isInteger(rounded)
      ? rounded.toString()
      : rounded.toFixed(1);

    return `${formatted}${unit}`;
  };

  return (
    <View
      style={[
        styles.imageBackground,
        styles.imageBackgroundNoPicture,
        { marginTop: -insets.top },
      ]}
    >
      <LinearGradient
        colors={["transparent", "transparent"]}
        locations={[0, 1]}
        style={[styles.overlay, { paddingTop: insets.top }]}
      >
        <NavBar title={navbarTitle} rightActions={rightActions} />
        <View style={styles.content}>
          <View style={[styles.titleContainer, { paddingTop: 32 }]}>
            <Text
              style={styles.titleText}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {name || "Lebensmittel"}
            </Text>
          </View>
          <View style={styles.macrosContainer}>
            {[
              {
                value: formatMacro(calories, " kcal"),
                label: "Kalorien",
                align: "left" as const,
              },
              {
                value: formatMacro(protein, "g"),
                label: "Protein",
                align: "center" as const,
              },
              {
                value: formatMacro(carbohydrates, "g"),
                label: "Carbs",
                align: "center" as const,
              },
              {
                value: formatMacro(totalFat, "g"),
                label: "Fett",
                align: "right" as const,
              },
            ].map((macro, index) => (
              <View key={index} style={styles.macroCard}>
                <Text style={[styles.macroValue, { textAlign: macro.align }]}>
                  {macro.value}
                </Text>
                <Text style={[styles.macroLabel, { textAlign: macro.align }]}>
                  {macro.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 330,
    justifyContent: "space-between",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  imageBackgroundNoPicture: {
    height: "auto",
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  overlay: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingVertical: 24,
    gap: 12,
  },
  titleText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    flexShrink: 1,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCard: {},
  macroValue: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
  macroLabel: {
    ...Typography.caption1Regular,
    color: Color.neutralWhite,
    opacity: 0.85,
    marginTop: 4,
    textAlign: "center",
  },
});

export default LebDetailTopComponent;
