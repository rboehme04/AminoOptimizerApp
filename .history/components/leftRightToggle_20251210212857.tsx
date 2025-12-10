import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

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
  const [leftTextCenter, setLeftTextCenter] = React.useState<number | null>(
    null
  );
  const [rightTextCenter, setRightTextCenter] = React.useState<number | null>(
    null
  );

  const FIXED_LINE_WIDTH = 100; // Fixed width for the line
  const lineLeft = React.useRef(new Animated.Value(0)).current;
  const isInitialMount = React.useRef(true);
  const leftTextRef = React.useRef<Text>(null);
  const rightTextRef = React.useRef<Text>(null);

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  React.useEffect(() => {
    const textCenter =
      activeSide === "left" ? leftTextCenter : rightTextCenter;

    if (textCenter !== null) {
      const targetLeft = textCenter - FIXED_LINE_WIDTH / 2;

      if (isInitialMount.current) {
        // Set initial values without animation
        lineLeft.setValue(targetLeft);
        isInitialMount.current = false;
      } else {
        // Animate to new values
        Animated.timing(lineLeft, {
          toValue: targetLeft,
          duration: 250,
          useNativeDriver: false, // left can't use native driver
        }).start();
      }
    }
  }, [activeSide, leftTextCenter, rightTextCenter, lineLeft]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            // Calculate center position: container x + text x + text width / 2
            event.target.measure((fx, fy, width, height, px, py) => {
              setLeftTextCenter(px + width / 2);
            });
          }}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.textContainer]}
        onPress={() => handleToggle("right")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            // Calculate center position: container x + text x + text width / 2
            event.target.measure((fx, fy, width, height, px, py) => {
              setRightTextCenter(px + width / 2);
            });
          }}
        >
          {rightLabel}
        </Text>
      </Pressable>
      <Animated.View
        style={[
          styles.line,
          {
            left: lineLeft,
            width: lineWidth,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 3,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 30,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralButtonInactive,
  },
  activeText: {
    color: Color.neutralWhite,
  },
  line: {
    position: "absolute",
    height: 2,
    bottom: 10,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
  },
});

export default LeftRightToggle;
