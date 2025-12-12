import { ChevronRightIcon, Lion3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "./progressBar";

interface ValueRowContainerProps {
  current: number;
  max: number;
  label: string;
}

const ValueRowContainer = ({ current, max, label }: ValueRowContainerProps) => {
  const percentage = Math.round((current / max) * 100);

  return (
    <View>
      <View style={styles.valueRowContainer}>
        <View style={styles.valueRowLeftContainer}>
          <Text style={styles.valueRowWhiteText}>{label}</Text>
        </View>
        <View style={styles.valueRowRightContainer}>
          <Text style={styles.valueRowWhiteText}>
            {current} / {max}
          </Text>
          <Text style={styles.valueRowGreyText}>{percentage}%</Text>
        </View>
      </View>
      <ProgressBar current={current} max={max} />
    </View>
  );
};

const NaehrstoffprofilRow = () => {
  return (
    <View style={styles.rowOuterContainer}>
      <Pressable style={styles.rowInnerContainer}>
        <Lion3dIcon size={28} />
        <Text style={styles.rowText}>Überblick</Text>
        <ChevronRightIcon size={20} color={Color.neutralWhite} />
      </Pressable>
      <View style={styles.valueRowListContainer}>
        <ValueRowContainer current={378} max={1950} label="Energie (kcal)" />
        <ValueRowContainer current={378} max={1950} label="Energie (kcal)" />
        <ValueRowContainer current={378} max={1950} label="Energie (kcal)" />
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
  },
  valueRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
