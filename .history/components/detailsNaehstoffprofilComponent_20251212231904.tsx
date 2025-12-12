import { ChevronRightIcon, Lion3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ValueRowContainer = () => {
  return (
    <View style={styles.valueRowContainer}>
      <Text style={[styles.valueRowWhiteText, styles.valueRowLeftContainer]}>Energie (kcal)</Text>
    </View>
  );
};

const NaehrstoffprofilRow = () => {
  return (
    <View>
      <Pressable style={styles.rowContainer}>
        <Lion3dIcon size={28} />
        <Text style={styles.rowText}>Überblick</Text>
        <ChevronRightIcon size={20} color={Color.neutralWhite} />
      </Pressable>
      <View>
        ValueRowContainer />
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
  valueRowContainer: {
    padding: 12,
    gap: 16,
  },
  valueRowLeftContainer: {
    flex: 1,
  },
  valueRowRightContainer: {
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
