import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  EditPencilIcon,
  OptimizedIcon,
  ShareIcon,
  StarFullIcon,
  StarLineIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import {
  addFavoriteRecipe,
  isRecipeFavorite,
  removeFavoriteRecipe,
  type FavoriteRecipeItem,
} from "@/utils/favorites";
const breakfastImage = require("@/assets/images/FrühstücksBowlPicture.png");

interface RecipeDetailTopComponentProps {
  title?: string;
  calories?: number;
  macros?: { protein: number; carbs: number; fat: number };
  isOptimized?: boolean;
  isPicture?: boolean;
  navbarTitle?: string;
  recipeId?: number;
  ingredients?: string;
}

const RecipeDetailTopComponent = ({
  title = "Recipe Title",
  calories,
  macros,
  isOptimized,
  isPicture = true,
  navbarTitle = "",
  recipeId,
  ingredients = "",
}: RecipeDetailTopComponentProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Load favorite status on mount
  React.useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (recipeId !== undefined) {
        const favorite = await isRecipeFavorite(recipeId);
        setIsFavorite(favorite);
      }
    };
    checkFavoriteStatus();
  }, [recipeId]);

  const handleToggleFavorite = React.useCallback(async () => {
    if (recipeId === undefined) return;

    try {
      if (isFavorite) {
        await removeFavoriteRecipe(recipeId);
        setIsFavorite(false);
      } else {
        // Create favorite item with available data
        const favoriteItem: FavoriteRecipeItem = {
          id: recipeId,
          title: title,
          ingredients: ingredients,
          calories: calories !== undefined ? `${calories} kcal` : "0 kcal",
          isOptimized: isOptimized || false,
        };
        await addFavoriteRecipe(favoriteItem);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }, [recipeId, isFavorite, title, calories, isOptimized]);

  const rightActions = React.useMemo(
    () => [
      {
        icon: <EditPencilIcon size={20} />,
        onPress: () => router.push("/EditRecipe"),
      },
      { icon: <ShareIcon size={20} />, onPress: () => {} },
      {
        icon: isFavorite ? (
          <StarFullIcon size={20} />
        ) : (
          <StarLineIcon size={20} />
        ),
        onPress: handleToggleFavorite,
      },
    ],
    [router, isFavorite, handleToggleFavorite]
  );

  const content = (
    <LinearGradient
      colors={
        isPicture
          ? [
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.45)",
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.80)",
            ]
          : ["transparent", "transparent"]
      }
      locations={isPicture ? [0, 0.4, 0.66, 0.83, 1] : [0, 1]}
      style={[styles.overlay, { paddingTop: insets.top }]}
    >
      <NavBar title={navbarTitle} rightActions={rightActions} />
      <View style={styles.content}>
        <View style={[styles.titleContainer, !isPicture && { paddingTop: 32 }]}>
          <Text style={styles.titleText} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          {isOptimized && (
            <View style={styles.optimizedIconContainer}>
              <OptimizedIcon size={30} />
              <Text style={styles.optimizedText}>Optimized</Text>
            </View>
          )}
        </View>
        <View style={styles.macrosContainer}>
          {[
            {
              value: calories !== undefined ? `${calories} kcal` : "0 kcal",
              label: "Kalorien",
              align: "left" as const,
            },
            {
              value: macros ? `${Math.round(macros.protein)}g` : "0g",
              label: "Protein",
              align: "center" as const,
            },
            {
              value: macros ? `${Math.round(macros.carbs)}g` : "0g",
              label: "Carbs",
              align: "center" as const,
            },
            {
              value: macros ? `${Math.round(macros.fat)}g` : "0g",
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
  );

  if (isPicture) {
    return (
      <ImageBackground
        source={breakfastImage}
        style={[styles.imageBackground, { marginTop: -insets.top }]}
        resizeMode="cover"
      >
        {content}
      </ImageBackground>
    );
  }

  return (
    <View
      style={[
        styles.imageBackground,
        styles.imageBackgroundNoPicture,
        { marginTop: -insets.top },
      ]}
    >
      {content}
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
  optimizedIconContainer: {
    alignItems: "center",
    gap: 2,
  },
  optimizedText: {
    ...Typography.caption1Emphasized,
    color: Color.neutralTextOrTabGrey,
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

export default RecipeDetailTopComponent;
