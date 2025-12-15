import { naehrstoffprofilRows } from "@/assets/datasetConfig";
import { ChevronRightIcon, EatSymbolIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "./progressBar";

interface NutritionalValue {
  label: string;
  current: number;
  reference: number;
  measuringUnit: string;
}

interface ValueRowContainerProps {
  value: NutritionalValue;
}

const ValueRowContainer = ({ value }: ValueRowContainerProps) => {
  const { current, reference, label, measuringUnit } = value;
  const percentage =
    reference === 0 ? 0 : Math.round((current / reference) * 100);

  return (
    <View style={styles.valueRowOuterContainer}>
      <View style={styles.valueRowInnerContainer}>
        <View style={styles.valueRowLeftContainer}>
          <Text style={styles.valueRowWhiteText}>{label}</Text>
        </View>
        <View style={styles.valueRowRightContainer}>
          <Text style={styles.valueRowWhiteText}>
            {current} / {reference} {measuringUnit}
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
  title = "Title",
  values = [],
  onPress,
  icon: Icon = EatSymbolIcon,
}: NaehrstoffprofilRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
  type: "rez" | "leb";
  label?: string;
  rows?: Array<{
    title: string;
    values: NutritionalValue[];
    onPress?: () => void;
    icon?: React.ComponentType<{ size?: number }>;
  }>;
}

function DetailsNaehrstoffprofilComponent({
  type,
  label = "Details",
  rows = naehrstoffprofilRows,
}: DetailsNaehrstoffprofilComponentProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        type === "leb" && {
          paddingBottom: insets.bottom + (Platform.OS === "android" ? 20 : 0),
        },
      ]}
    >
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
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  valueRowGreyText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default DetailsNaehrstoffprofilComponent;
