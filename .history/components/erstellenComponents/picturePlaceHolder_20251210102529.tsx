import { Color, Typography } from "@/constants/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PicturePlaceHolder = () => {
  return (
    <SafeAreaView style={styles.viewBg}>
      <View style={[styles.view, styles.viewFlexBox]}>
        <View>
          <MaterialIcons
            name="add-a-photo"
            size={36}
            color={Color.neutralTextOrTabGrey}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.bild}>Bild</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewBg: {
    backgroundColor: Color.neutralInputOnDark,
    
  },
  view: {
    width: 78,
    height: 78,
    flexDirection: "row",
    backgroundColor: Color.neutralInputOnDark,
    flex: 1,
  },
  icon: {
    width: 36,
    height: 40,
    textAlign: "center",
  },
  textContainer: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  bild: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
});

export default PicturePlaceHolder;
