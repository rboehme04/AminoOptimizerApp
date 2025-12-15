import {
  Avocado3dIcon,
  Broccoli3dIcon,
  ChevronRightIcon,
  FlexedBiceps3dIcon,
  Grapes3dIcon,
  Lion3dIcon,
  Peach3dIcon,
  RedApple3dIcon,
  Spaghetti3dIcon,
} from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRef, useState } from "react";
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
  rows = [
    {
      title: "Überblick",
      values: [
        { label: "Energie", current: 0, reference: 0, measuringUnit: "kcal" },
        { label: "Eiweiß", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Gesamtfett", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Kohlenhydrate",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Ballaststoffe",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Cholesterin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Wasser", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Alkohol", current: 0, reference: 0, measuringUnit: "g" },
      ],
      icon: Lion3dIcon,
    },
    {
      title: "Vitamine",
      values: [
        { label: "Vitamin A", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Vitamin A (IU)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Vitamin B6", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Vitamin B12", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Vitamin C", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Vitamin D", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Vitamin D3", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Vitamin D (IU)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Vitamin E", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Vitamin E Alpha",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Vitamin K", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Thiamin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Riboflavin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Niacin", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Pantothensäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Biotin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Folsäure", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Folat (DFE)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Gesamtfolat",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
      ],
      icon: RedApple3dIcon,
    },
    {
      title: "Mengenelemente",
      values: [
        { label: "Calcium", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Chlorid", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Magnesium", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Phosphor", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Kalium", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Natrium", current: 0, reference: 0, measuringUnit: "g" },
      ],
      icon: Broccoli3dIcon,
    },
    {
      title: "Spurenelemente",
      values: [
        { label: "Chrom", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Kupfer", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Iod", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Eisen", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Mangan", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Molybdän", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Selen", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Zink", current: 0, reference: 0, measuringUnit: "g" },
      ],
      icon: Peach3dIcon,
    },
    {
      title: "Kohlenhydrate",
      values: [
        {
          label: "Kohlenhydrate",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Gesamtzucker",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Hinzugefügte Zucker",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Andere Kohlenhydrate",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Ballaststoffe",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Lösliche Faser",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Unlösliche Faser",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Zuckeralkohole",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Sorbit", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Xylit", current: 0, reference: 0, measuringUnit: "g" },
      ],
      icon: Spaghetti3dIcon,
    },
    {
      title: "Aminosäuren",
      values: [
        { label: "Alanin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Arginin", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Asparaginsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Cystin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Cystein", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Glutaminsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Glycin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Histidin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Isoleucin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Leucin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Lysin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Methionin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Phenylalanin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Prolin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Serin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Threonin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Tryptophan", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Tyrosin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Valin", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Taurin", current: 0, reference: 0, measuringUnit: "g" },
      ],
      icon: FlexedBiceps3dIcon,
    },
    {
      title: "Fettsäuren",
      values: [
        { label: "Gesamtfett", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Gesättigte Fettsäuren",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Einfach ungesättigte Fettsäuren",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Mehrfach ungesättigte Fettsäuren",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Transfette", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Omega 3", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Omega 6", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Omega 9", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Laurinsäure", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Myristinsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Palmitinsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Stearinsäure", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Ölsäure", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Linolsäure", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Linolensäure", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Alpha-Linolensäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Arachidonsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Dihomo-Gamma-Linolensäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Docosahexaensäure (DHA)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Docosapentaensäure (DPA)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Eicosapentaensäure (EPA)",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        {
          label: "Eicosensäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
        { label: "Erucasäure", current: 0, reference: 0, measuringUnit: "g" },
        { label: "Caprinsäure", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Caprylsäure",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
      ],
      icon: Avocado3dIcon,
    },
    {
      title: "Sekundäre Pflanzenstoffe",
      values: [
        { label: "Koffein", current: 0, reference: 0, measuringUnit: "g" },
        {
          label: "Nicht zugeordnet",
          current: 0,
          reference: 0,
          measuringUnit: "g",
        },
      ],
      icon: Grapes3dIcon,
    },
  ],
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
