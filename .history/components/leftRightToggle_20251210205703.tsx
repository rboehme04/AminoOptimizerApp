import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LeftRightToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  onToggle?: (value: "left" | "right") => void;
  initialValue?: "left" | "right";
}

const LeftRightToggle = ({
  leftLabel = "left",
  rightLabel = "right",
  onToggle,
  initialValue = "left",
}: LeftRightToggleProps) => {
  const [activeSide, setActiveSide] = React.useState<"left" | "right">(
    initialValue
  );

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.textContainer, styles.textFlexBox]}
        onPress={() => handleToggle("left")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : styles.inactiveText,
          ]}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.textContainer, styles.textFlexBox]}
        onPress={() => handleToggle("right")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : styles.inactiveText,
          ]}
        >
          {rightLabel}
        </Text>
      </Pressable>
      <View
        style={[
          styles.line,
          activeSide === "left" ? styles.lineLeft : styles.lineRight,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 30,
  },
  view: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: Padding.padding_4,
    paddingBottom: Padding.padding_10,
    gap: Gap.gap_8,
    position: "relative",
  },
  textFlexBox: {
    paddingVertical: Padding.padding_4,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    zIndex: 1,
  },
  text: {
    ...Typography.subheadlineRegular,
    textAlign: "center",
    alignSelf: "stretch",
  },
  activeText: {
    color: Color.neutralWhite,
  },
  inactiveText: {
    color: Color.neutralTextOrTabGrey,
  },
  line: {
    height: 2,
    width: "50%",
    bottom: Padding.padding_10,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
    position: "absolute",
  },
  lineLeft: {
    left: "2.5%",
  },
  lineRight: {
    left: "47.5%",
  },
});

export default LeftRightToggle;
