import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const ErstZubereitungComponent = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {}}
        accessibilityRole="button"
      >
        <Text style={styles.labelText}>Zubereitung</Text>
        <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
      </Pressable>
      <View style={styles.textinputContainer}>
        <TextInput
          style={[styles.variableInputTextarea, Typography.subheadlineRegular]}
          placeholder="optional"
          placeholderTextColor={Color.neutralTextOrTabGrey}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  view: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
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
  pressed: {
    opacity: 0.7,
  },
  textinputContainer: {
    paddingHorizontal: 8,
  },
  variableInputTextarea: {
    height: 100,
    borderRadius: 18,
    backgroundColor: Color.neutralInputOnDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: Color.ne,
  },
});

export default ErstZubereitungComponent;
