import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import HinzuLebAmountInput from "@/components/erstellenComponents/hinzuLebAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
import LebDetailTopComponent from "@/components/lebDetailTopComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { supabase } from "@/utils/supabase";

export default function HinzuLebDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [amount, setAmount] = React.useState<number | null>(100);
  const [unit, setUnit] = React.useState<"g" | "kg">("g");
  const [food, setFood] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return; // just check presence

    const fetchFood = async () => {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from("opennutrition_foods")
        .select("name, calories, protein, carbohydrates, total_fat")
        .eq("id", id) // <-- use id as string
        .single();

      if (supabaseError) {
        console.error("Failed to fetch food", supabaseError);
        setError(supabaseError.message);
        setFood(null);
      } else if (!data) {
        setError("Lebensmittel nicht gefunden.");
        setFood(null);
      } else {
        setFood(data);
      }
      setLoading(false);
    };

    fetchFood();
  }, [id]);

  const portionInGrams =
    amount != null ? (unit === "g" ? amount : amount * 1000) : undefined;

  const factor =
    food && typeof portionInGrams === "number" ? portionInGrams / 100 : 1;

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <LebDetailTopComponent
          navbarTitle="Hinzufügen"
          name={food?.name}
          calories={food?.calories != null ? food.calories * factor : undefined}
          protein={food?.protein != null ? food.protein * factor : undefined}
          carbohydrates={
            food?.carbohydrates != null
              ? food.carbohydrates * factor
              : undefined
          }
          totalFat={
            food?.total_fat != null ? food.total_fat * factor : undefined
          }
        />
        <View style={styles.innerContainer}>
          <HinzuLebAmountInput
            initialValue={100}
            onChange={setAmount}
            onUnitChange={setUnit}
          />
          <HinzufügenButton />
          <DetailsNaehstoffprofilComponent
            type="leb"
            id={id}
            portionInGrams={portionInGrams}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  innerContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  dropDownsContainer: {
    paddingHorizontal: 16,
  },
  rezLoeschenOuterContainer: {
    paddingTop: 16,
    alignItems: "center",
  },
  rezLoeschenInnerContainer: {
    flexWrap: "wrap",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  rezLoeschenLabel: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  rezLoeschenText: {
    ...Typography.subheadlineRegular,
    color: Color.destructive50,
  },
});
