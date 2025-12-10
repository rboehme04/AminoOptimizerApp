import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
} from "react-native";

type Props = {
  value?: string;
  onChangeText: (text: string) => void;
};

const ErstZubereitungComponent = ({ value, onChangeText }: Props) => {
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>(150);
  const [expanded, setExpanded] = useState(true);
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const textareaRef = useRef<TextInput>(null);

  // Rotate the chevron when the textarea is expanded or collapsed
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  // Interpolate the rotation value to the chevron
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

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
        style={[
          styles.textinputContainer,
          !expanded && styles.textinputContainerHidden,
        ]}
      >
        <TextInput
          ref={textareaRef}
          style={[
            styles.variableInputTextarea,
            textareaFocused && styles.variableInputTextareaFocused,
            { height: inputHeight },
          ]}
          placeholder="optional"
          placeholderTextColor={Color.neutralTextOrTabGrey}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setTextareaFocused(true)}
          onBlur={() => setTextareaFocused(false)}
          onContentSizeChange={(
            event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
          ) => {
            const nextHeight = Math.max(
              150,
              event.nativeEvent.contentSize.height
            );
            setInputHeight(nextHeight);
          }}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
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
  pressed: {
    opacity: 0.7,
  },
  textinputContainer: {
    paddingHorizontal: 8,
  },
  textinputContainerHidden: {
    display: "none",
  },
  variableInputTextarea: {
    minHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    backgroundColor: Color.neutralInputOnDark,
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  variableInputTextareaFocused: {
    borderColor: Color.neutralWhite,
  },
});

export default ErstZubereitungComponent;
