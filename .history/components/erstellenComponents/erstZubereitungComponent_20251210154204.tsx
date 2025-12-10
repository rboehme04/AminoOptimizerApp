import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

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
        <View style={styles.clickContainer}>
          <Text style={styles.labelText}>Zubereitung</Text>
          <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
        </View>
      </Pressable>
      <View style={styles.textinputContainer}>
        <View style={styles.variableInputTextarea}>
          <Text style={styles.placeholderText}>optional</Text>
        </View>
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
    justifyContent: "center",
    gap: 4,
  },

  labelText: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralTextOrTabGrey,
    marginRight: 8,
  },
  textinputContainer: {
    paddingHorizontal: Padding.padding_10,
    alignSelf: "stretch",
  },
  variableInputTextarea: {
    height: 100,
    borderRadius: 18,
    backgroundColor: Color.colorGray100,
    paddingHorizontal: Padding.padding_10,
    paddingVertical: Padding.padding_10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  placeholderText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default ErstZubereitungComponent;
