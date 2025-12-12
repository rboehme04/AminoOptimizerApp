import { ChevronRightIcon, Lion3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "./progressBar";

interface NutritionalValue {
  current: number;
  reference: number;
  label: string;
}

interface ValueRowContainerProps {
  value: NutritionalValue;
}

const ValueRowContainer = ({ value }: ValueRowContainerProps) => {
  const { current, reference, label } = value;
  const percentage = Math.round((current / reference) * 100);

  return (
    <View style={styles.valueRowOuterContainer}>
      <View style={styles.valueRowInnerContainer}>
        <View style={styles.valueRowLeftContainer}>
          <Text style={styles.valueRowWhiteText}>{label}</Text>
        </View>
        <View style={styles.valueRowRightContainer}>
          <Text style={styles.valueRowWhiteText}>
            {current} / {reference}
          </Text>
          <Text style={styles.valueRowGreyText}>{percentage}%</Text>
        </View>
      </View>
      <ProgressBar current={current} reference={max} />
    </View>
  );
};

interface NaehrstoffprofilRowProps {
  title?: string;
  values: NutritionalValue[];
  onPress?: () => void;
}

const NaehrstoffprofilRow = ({
  title = "Überblick",
  values,
  onPress,
}: NaehrstoffprofilRowProps) => {
  return (
    <View style={styles.rowOuterContainer}>
      <Pressable style={styles.rowInnerContainer} onPress={onPress}>
        <Lion3dIcon size={28} />
        <Text style={styles.rowText}>{title}</Text>
        <ChevronRightIcon size={20} color={Color.neutralWhite} />
      </Pressable>
      {values.length > 0 && (
        <View style={styles.valueRowListContainer}>
          {values.map((value, index) => (
            <ValueRowContainer key={`${value.label}-${index}`} value={value} />
          ))}
        </View>
      )}
    </View>
  );
};

interface DetailsNaehrstoffprofilComponentProps {
  label?: string;
  rows?: Array<{
    title: string;
    values: NutritionalValue[];
    onPress?: () => void;
  }>;
}

function DetailsNaehrstoffprofilComponent({
  label = "Details",
  rows = [
    {
      title: "Überblick",
      values: [{ current: 378, max: 1950, label: "Energie (kcal)" }],
    },
  ],
}: DetailsNaehrstoffprofilComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.rowsListContainer}>
        {rows.map((row, index) => (
          <NaehrstoffprofilRow
            key={`${row.title}-${index}`}
            title={row.title}
            values={row.values}
            onPress={row.onPress}
          />
        ))}
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
    paddingBottom: 12,
  },
  valueRowOuterContainer: {
    gap: 16,
    paddingHorizontal: 12,
  },
  valueRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
