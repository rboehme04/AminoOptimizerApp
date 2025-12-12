import { Broccoli3dIcon, ChevronRightIcon, Lion3dIcon, Peach3dIcon, RedApple3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "./progressBar";

interface NutritionalValue {
  label: string;
  current: number;
  reference: number;
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
      <ProgressBar current={current} max={reference} />
    </View>
  );
};

interface NaehrstoffprofilRowProps {
  title?: string;
  values: NutritionalValue[];
  onPress?: () => void;
  icon?: React.ComponentType<{ size?: number }>;
}

const NaehrstoffprofilRow = ({
  title = "Überblick",
  values = [],
  onPress,
  icon: Icon = Lion3dIcon,
}: NaehrstoffprofilRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (onPress) {
      onPress();
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.rowOuterContainer}>
      <Pressable style={styles.rowInnerContainer} onPress={toggleExpanded}>
        <Icon size={28} />
        <Text style={styles.rowText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronRightIcon size={20} color={Color.neutralWhite} />
        </Animated.View>
      </Pressable>
      {isExpanded && values.length > 0 && (
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
    icon?: React.ComponentType<{ size?: number }>;
  }>;
}

function DetailsNaehrstoffprofilComponent({
  label = "Details",
  rows = [
    {
      title: "Überblick",
      values: [{ label: "Energie (kcal)", current: 378, reference: 1950 }],
      icon: Lion3dIcon,
    },
    {
      title: "Vitamine",
      values: [{ current: 378, reference: 1950, label: "Energie (kcal)" }],
      icon: RedApple3dIcon,
    },
    {
      title: "Mengenelemente",
      values: [{ current: 378, reference: 1950, label: "Energie (kcal)" }],
      icon: Broccoli3dIcon,
    },
    {
      title: "Mengenelemente",
      values: [{ current: 378, reference: 1950, label: "Energie (kcal)" }],
      icon: Broccoli3dIcon,
    },
    {
      title: "Spurenelemente",
      values: [{ current: 378, reference: 1950, label: "Energie (kcal)" }],
      icon: Peach3dIcon,
    },
    {
      title: "Kohlenhydrate",
      values: [{ current: 378, reference: 1950, label: "Energie (kcal)" }],
      icon: Spa,
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
            icon={row.icon}
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
