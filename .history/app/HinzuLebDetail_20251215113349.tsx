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
  const [food, setFood] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const foodId = id ? Number(id) : null;
    if (!foodId) return;

    const fetchFood = async () => {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from("opennutrition_foods")
        .select("*")
        .eq("id", foodId)
        .single();

      if (supabaseError) {
        console.error("Failed to fetch food", supabaseError);
        setError(supabaseError.message);
        setFood(null);
      } else {
        setFood(data);
      }
      setLoading(false);
    };

    fetchFood();
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <LebDetailTopComponent navbarTitle="Hinzufügen" />
        <View style={styles.innerContainer}>
          <HinzuLebAmountInput />
          <HinzufügenButton />
          <DetailsNaehstoffprofilComponent type="leb" />
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
