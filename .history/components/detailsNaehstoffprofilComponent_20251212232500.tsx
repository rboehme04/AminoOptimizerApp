import { ChevronRightIcon, Lion3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ValueRowContainer = () => {
  return (
    <View style={styles.valueRowContainer}>
      <View style={styles.valueRowLeftContainer}>
        <Text style={styles.valueRowWhiteText}>Energie (kcal)</Text>
      </View>
      <View style={styles.valueRowRightContainer}>
        <Text style={styles.valueRowWhiteText}>378 / 1950</Text>
        <Text style={styles.valueRowGreyText}>19%</Text>
      </View>
    </View>
  );
};

const NaehrstoffprofilRow = () => {
  return (
    <View style={styles.rowContainer}>
      <Pressable>
        <Lion3dIcon size={28} />
        <Text style={styles.rowText}>Überblick</Text>
        <ChevronRightIcon size={20} color={Color.neutralWhite} />
      </Pressable>
      <View style={styles.valueRowListContainer}>
        <ValueRowContainer />
      </View>
    </View>
  );
};

function DetailsNaehrstoffprofilComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Details</Text>
      <View style={styles.rowsListContainer}>
        <NaehrstoffprofilRow />
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 16,
    borderRadius: 18,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  rowText: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  valueRowListContainer: {
    gap: 16,
  },
  valueRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
    ...Typography.bodyRegular,
    color: Color.neutralWhite,
  },
  valueRowGreyText: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default DetailsNaehrstoffprofilComponent;
