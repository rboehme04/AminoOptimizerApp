import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import {
    SafeAreaView,
    useSafeAreaInsets,
  } from "react-native-safe-area-context";
  
  import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
  import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
  import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
  import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
  import ZubereitungDropDown from "@/components/zubereitungDropDown";
  import ZutatenDropDown from "@/components/zutatenDropDown";
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
          <LebD navbarTitle="Hinzufügen" isOptimized={true} isPicture={false} />
          <View style={styles.innerContainer}>
            <HinzuRezAmountInput />
            <HinzufügenButton />
            <View style={styles.dropDownsContainer}>
              <ZutatenDropDown />
              <ZubereitungDropDown isExpanded={false} />
              <DetailsNaehstoffprofilComponent />
              <View style={styles.rezLoeschenOuterContainer}>
                <Pressable
                  style={[
                    styles.rezLoeschenInnerContainer,
                    {
                      paddingBottom:
                        insets.bottom + (Platform.OS === "android" ? 20 : 0),
                    },
                  ]}
                  onPress={() => {}}
                >
                  <Text style={styles.rezLoeschenLabel}>Rezept löschen?</Text>
                  <Text style={styles.rezLoeschenText}>löschen</Text>
                </Pressable>
              </View>
            </View>
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
  