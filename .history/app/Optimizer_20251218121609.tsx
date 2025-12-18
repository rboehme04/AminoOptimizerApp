import {
  OptimizerFinishedIcon,
  OptimizerNotStartedIcon,
  OptimizerStartedIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OptimizerStatus = "not-started" | "running" | "finished";

type OptimizerStatusIconProps = {
  size?: number;
  /**
   * Set to true when your async action (e.g. DB query) has finished.
   */
  isFinished: boolean;
};

const OptimizerStatusIcon = ({
  size = 48,
  isFinished,
}: OptimizerStatusIconProps) => {
  const [status, setStatus] = useState<OptimizerStatus>("not-started");
  const rotation = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef<Animated.CompositeAnimation | null>(null);

  // Control which icon is shown based on isFinished
  useEffect(() => {
    if (isFinished) {
      setStatus("finished");
    } else if (status === "not-started") {
      // Briefly show "not started", then move into "running"
      const timeoutId = setTimeout(() => {
        setStatus("running");
      }, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [isFinished, status]);

  // Start / stop rotation while in "running" state
  useEffect(() => {
    if (status === "running" && !isFinished) {
      rotation.setValue(0);
      spinAnimation.current = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000, // one full rotation in 2 seconds
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.current.start();

      return () => {
        spinAnimation.current && spinAnimation.current.stop();
      };
    }

    // Stop any running animation when leaving "running" or when finished
    if (spinAnimation.current) {
      spinAnimation.current.stop();
      spinAnimation.current = null;
    }
  }, [status, isFinished, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (status === "finished") {
    return <OptimizerFinishedIcon size={size} />;
  }

  if (status === "running") {
    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <OptimizerStartedIcon size={size} />
      </Animated.View>
    );
  }

  // "not-started"
  return <OptimizerNotStartedIcon size={size} />;
};

export default function OptimizerScreen() {
  // TODO: Replace this with your real async status (e.g. DB query finished)
  const [isFinished] = useState(false);

  return (
    <SafeAreaView style={styles.Content}>
      <NavBar title="Optimizer" isBold={true} isBackButton={true} />
      <View style={styles.centerContainer}>
        <View style={styles.animationContainer}>
          <OptimizerStatusIcon size={48} isFinished={isFinished} />
        </View>
        <Text style={styles.text}>Aminosäureprofil analysieren</Text>
      </View>
      <NextButton text="Abbrechen" onPress={() => {}} buttonStyle="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    paddingBottom: Padding.padding_next_button,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  animationContainer: {
    padding: 5,
  },
  text: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
  },
});
