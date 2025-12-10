import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CloseXIcon } from "@/assets/icons/icons";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.picturePlaceHolderContainer}>
            <PicturePlaceHolder />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Rezept erstellen</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 106,
    gap: 16,
  },
  title: {
    ...Typography.title1Emphasized,
    color: Color.neutralWhite,
  },
  picturePlaceHolderContainer: {},
  titleContainer: {},
});
