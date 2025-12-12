import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  value?: string;
};

const ZubereitungDropDown = ({ value }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const trimmedValue = value?.trim();
  const hasValue = Boolean(trimmedValue);
  const displayText = hasValue ? trimmedValue : "optional";

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => setExpanded(prev => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <Text style={styles.labelText}>Zubereitung</Text>
        <Animated.View style={[styles.chevron, { transform: [{ rotate }] }]}>
          <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
        </Animated.View>
      </Pressable>
      <View
        style={[styles.textContainer, !expanded && styles.textContainerHidden]}
      >
        <View style={styles.textBox}>
          <Text style={[styles.valueText, !hasValue && styles.placeholderText]}>
            {displayText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    height: 44,
    paddingRight: 16,
    gap: 4,
  },
  labelText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  chevron: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {},
  textContainer: {
    paddingHorizontal: 8,
  },
  textContainerHidden: {
    display: "none",
  },
  textBox: {
    minHeight: 125,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    backgroundColor: Color.neutralInputOnDark,
  },
  valueText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  placeholderText: {
    color: Color.neutralTextOrTabGrey,
  },
});

export default ZubereitungDropDown;
