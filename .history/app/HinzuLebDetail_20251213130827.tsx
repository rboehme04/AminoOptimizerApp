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

export default function HinzuLebDetailScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
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
