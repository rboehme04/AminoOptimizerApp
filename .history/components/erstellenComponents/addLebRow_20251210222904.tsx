import { EatSymbolIcon, SolidFireIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Add Icon (plus sign)
const AddIcon = ({
  color = Color.neutralWhite,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type LebensmittelRowProps = {
  title?: string;
  portion?: string;
  calories?: string;
  onPress?: () => void;
  onAddPress?: () => void;
};

const LebensmittelRow = ({
  title = "Apfel (mit Schale), frisch",
  portion = "1 Frucht, mittelgroß",
  calories = "52 kcal",
  onPress = () => {},
  onAddPress = () => {},
}: LebensmittelRowProps) => {
  return (
    <View style={styles.lebensmittelRow}>
      <Pressable style={styles.leftClickContainer} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            <EatSymbolIcon width={18} height={18} color={Color.neutralTagColor} />
            <View style={styles.portionContainer}>
              <Text
                style={[styles.captionTypo]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {portion}
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon width={18} height={18} color={Color.neutralTagColor} />
            <Text style={styles.captionTypo}>{calories}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={onAddPress}
        accessibilityRole="button"
        accessibilityLabel="Add ingredient"
      >
        <View style={styles.addButton}>
          <AddIcon size={24} color={Color.neutralWhite} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  lebensmittelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 32,
  },
  leftClickContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    gap: 4,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  captionTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  portionContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightClickContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 13,
    alignSelf: "stretch",
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.neutralStrokeColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LebensmittelRow;
