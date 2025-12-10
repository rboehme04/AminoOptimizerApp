import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ErstZubereitungComponent = () => {
  return (
    <View style={styles.zubereitungDropDown}>
      <View style={styles.view}>
        <View style={styles.labelContainer}>
          <View style={styles.clickContainer}>
            <Text style={styles.labelText}>Zubereitung</Text>
            <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
          </View>
        </View>
        <View style={styles.textinputContainer}>
          <View style={styles.variableInputTextarea}>
            <Text style={styles.placeholderText}>optional</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zubereitungDropDown: {
    flex: 1,
  },
  view: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  labelContainer: {
    height: 44,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  clickContainer: {
    flexDirection: "row",
    alignItems: "center",
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
