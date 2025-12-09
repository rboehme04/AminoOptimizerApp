import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Color, Typography } from "@/constants/GlobalStyles";
import OptimizerNavBar from "@/components/optimizerNavBar";
import QuestionButton from "@/components/questionButton";
import RezeptErstellenButton from "@/components/rezeptErstellenButton";
import RezSelectionAndFilterComponent from "@/components/rezSelectionAndFilterComponent";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.Content} edges={["left", "right", "bottom"]}>
      <LinearGradient
        colors={["#262626", Color.neutralBackgroundDark]}
        locations={[0, 0.97]}
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <OptimizerNavBar />
        <View style={styles.headerButtonsContainer}>
          <QuestionButton />
          <View style={styles.rezeptErstellenContainer}>
            <RezeptErstellenButton />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.oderAuswaehlenText}>oder auswählen:</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.rezepteUndFilterContainer}>
        <RezSelectionAndFilterComponent />
        <View style={styles.mealRowsContainer}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  headerContainer: {
    justifyContent: "center",
    paddingHorizontal: 0,
    gap: 12,
  },
  headerButtonsContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  rezeptErstellenContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  oderAuswaehlenText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 10,
  },
  ERROR  [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: number.

    Check the render method of `RezSelectionAndFilterComponent`.] 
    
    Code: rezSelectionAndFilterComponent.tsx
      49 |               <StarFullIcon width={16} height={16} />
      50 |             ) : (
    > 51 |               <StarLineIcon width={16} height={16} />
         |               ^
      52 |             )}
      53 |             <Text
      54 |               style={[
    Call Stack
      RezSelectionAndFilterComponent (components/rezSelectionAndFilterComponent.tsx:51:15)
      TabOneScreen (app/index.tsx:36:9)
      RootLayoutNav (app/_layout.tsx:33:7)
      RootLayout (app/_layout.tsx:26:10)
     ERROR  [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: number.
    
    Check the render method of `RezSelectionAndFilterComponent`.] 
    
    Code: rezSelectionAndFilterComponent.tsx
      49 |               <StarFullIcon width={16} height={16} />
      50 |             ) : (
    > 51 |               <StarLineIcon width={16} height={16} />
         |               ^
      52 |             )}
      53 |             <Text
      54 |               style={[
    Call Stack
      RezSelectionAndFilterComponent (components/rezSelectionAndFilterComponent.tsx:51:15)
      TabOneScreen (app/index.tsx:36:9)
      RootLayoutNav (app/_layout.tsx:33:7)
      RootLayout (app/_layout.tsx:26:10)
});
