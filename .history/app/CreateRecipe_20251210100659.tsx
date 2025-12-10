import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { CloseXIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Rezept erstellen</Text>
        
        <PicturePlaceHolder />
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
});
