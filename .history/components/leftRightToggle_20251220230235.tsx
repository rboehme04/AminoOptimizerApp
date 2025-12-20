import { Color, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface LeftRightToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  onToggle?: (value: "left" | "right") => void;
  initialValue?: "left" | "right";
  value?: "left" | "right"; // Controlled value prop
  animationDuration?: number; // Animation duration in milliseconds
}

const LeftRightToggle = ({
  leftLabel = "left",
  rightLabel = "right",
  onToggle,
  initialValue = "left",
  value,
  animationDuration = 250,
}: LeftRightToggleProps) => {
  // Use controlled value if provided, otherwise use internal state
  const isControlled = value !== undefined;
  const [internalActiveSide, setInternalActiveSide] = React.useState<"left" | "right">(
    initialValue
  );
  const activeSide = isControlled ? value : internalActiveSide;
  const [leftTextCenter, setLeftTextCenter] = React.useState<number | null>(
    null
  );
  const [rightTextCenter, setRightTextCenter] = React.useState<number | null>(
    null
  );
  const [leftContainerX, setLeftContainerX] = React.useState<number | null>(
    null
  );
  const [rightContainerX, setRightContainerX] = React.useState<number | null>(
    null
  );
  const [leftTextLayout, setLeftTextLayout] = React.useState<{
    x: number;
    width: number;
  } | null>(null);
  const [rightTextLayout, setRightTextLayout] = React.useState<{
    x: number;
    width: number;
  } | null>(null);

  const FIXED_LINE_WIDTH = 40; // Fixed width for the line
  const lineLeft = React.useRef(new Animated.Value(0)).current;
  const lineOpacity = React.useRef(new Animated.Value(0)).current;
  const isInitialMount = React.useRef(true);
  const hasSetInitialPosition = React.useRef(false);
  const previousValue = React.useRef<"left" | "right" | undefined>(value);

  const handleToggle = (side: "left" | "right") => {
    if (!isControlled) {
      setInternalActiveSide(side);
    }
    onToggle?.(side);
  };

  // Track when controlled value changes externally (not on initial mount)
  React.useEffect(() => {
    if (isControlled && value !== undefined) {
      // Only reset animation flag if value actually changed (not initial mount)
      if (previousValue.current !== undefined && previousValue.current !== value && hasSetInitialPosition.current) {
        isInitialMount.current = false;
      }
      previousValue.current = value;
    }
  }, [isControlled, value]);

  // Recalculate text centers when container positions or text layouts change
  React.useEffect(() => {
    if (leftContainerX !== null && leftTextLayout !== null) {
      const textCenter =
        leftContainerX + leftTextLayout.x + leftTextLayout.width / 2;
      setLeftTextCenter(textCenter);
    }
  }, [leftContainerX, leftTextLayout]);

  React.useEffect(() => {
    if (rightContainerX !== null && rightTextLayout !== null) {
      const textCenter =
        rightContainerX + rightTextLayout.x + rightTextLayout.width / 2;
      setRightTextCenter(textCenter);
    }
  }, [rightContainerX, rightTextLayout]);

  React.useEffect(() => {
    const textCenter = activeSide === "left" ? leftTextCenter : rightTextCenter;

    if (textCenter !== null) {
      const targetLeft = textCenter - FIXED_LINE_WIDTH / 2;

      if (isInitialMount.current) {
        // Set initial values without animation
        lineLeft.setValue(targetLeft);
        // Show the line immediately when initial position is set
        lineOpacity.setValue(1);
        isInitialMount.current = false;
        hasSetInitialPosition.current = true;
      } else {
        // Animate to new values
        Animated.timing(lineLeft, {
          toValue: targetLeft,
          duration: 250,
          useNativeDriver: false, // left can't use native driver
        }).start();
      }
    }
  }, [activeSide, leftTextCenter, rightTextCenter, lineLeft, lineOpacity]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
        onLayout={event => {
          setLeftContainerX(event.nativeEvent.layout.x);
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            setLeftTextLayout({ x, width });
          }}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.textContainer]}
        onPress={() => handleToggle("right")}
        onLayout={event => {
          setRightContainerX(event.nativeEvent.layout.x);
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            setRightTextLayout({ x, width });
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
            width: FIXED_LINE_WIDTH,
            opacity: lineOpacity,
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
    paddingHorizontal: 16,
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
