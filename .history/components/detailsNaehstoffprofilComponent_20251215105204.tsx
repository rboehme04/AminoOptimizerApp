import { naehrstoffprofilRows } from "@/assets/datasetConfig";
import { ChevronRightIcon, EatSymbolIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
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
  const [contentHeight, setContentHeight] = useState(0);
  const [shouldRenderContent, setShouldRenderContent] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShouldRenderContent(true);
    }

    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onPress?.();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  useEffect(() => {
    if (!shouldRenderContent || contentHeight === 0) {
      return;
    }

    Animated.timing(slideAnim, {
      toValue: isExpanded ? contentHeight : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (!isExpanded) {
        setShouldRenderContent(false);
      }
    });
  }, [contentHeight, isExpanded, shouldRenderContent, slideAnim]);

  const animatedContentStyles = {
    height: slideAnim,
    opacity: slideAnim.interpolate({
      inputRange: [0, Math.max(contentHeight, 1)],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, Math.max(contentHeight, 1)],
          outputRange: [-8, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <View style={styles.rowOuterContainer}>
      <Pressable style={styles.rowInnerContainer} onPress={toggleExpanded}>
        <Icon size={28} />
        <Text style={styles.rowText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronRightIcon size={20} color={Color.neutralWhite} />
        </Animated.View>
      </Pressable>
      {shouldRenderContent && values.length > 0 && (
        <Animated.View
          style={[styles.valueRowListContainer, animatedContentStyles]}
          onLayout={(event) => {
            if (contentHeight === 0) {
              setContentHeight(event.nativeEvent.layout.height);
            }
          }}
        >
          {values.map((value, index) => (
            <ValueRowContainer key={`${value.label}-${index}`} value={value} />
          ))}
        </Animated.View>
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
    overflow: "hidden",
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
