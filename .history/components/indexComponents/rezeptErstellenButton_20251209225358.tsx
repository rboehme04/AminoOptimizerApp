import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { EditPencilIcon } from "@/assets/icons/icons";
import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";

const RezeptErstellenButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/CreateRecipe");
  };

  return (
    <Pressable style={styles.rezeptErstellenButton} onPress={handlePress}>
      <View style={styles.iconWrapper}>
        <EditPencilIcon />
      </View>
      <Text style={styles.text}>Rezept erstellen</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rezeptErstellenButton: {
    width: "100%",
    minHeight: 44,
    backgroundColor: Color.neutralInputOnDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: Padding.padding_10,
    paddingRight: 24,
    paddingBottom: Padding.padding_10,
    gap: Gap.gap_8,
    borderRadius: 18,
    overflow: "hidden",
  },
  iconWrapper: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
});

export default RezeptErstellenButton;
