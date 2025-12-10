import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { CloseXIcon } from "@/assets/icons/icons";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
      <View style={styles.innerContainer}>
        <Text>Rezept erstellen</Text>
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
});

import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily } from "../GlobalStyles";

const PictureOuterContainer = () => {
  	
  	return (
    		<SafeAreaView style={styles.viewBg}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<View>
          					<Text style={[styles.addAPhoto, styles.viewFlexBox]}>add_a_photo</Text>
          					<View style={styles.textContainer}>
            						<Text style={styles.bild}>Bild</Text>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	pictureOuterContainer: {
    		flex: 1,
    		backgroundColor: "#262626"
  	},
  	viewFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	viewBg: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		height: 78,
    		flexDirection: "row",
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	addAPhoto: {
    		width: 36,
    		height: 40,
    		fontSize: 36,
    		lineHeight: 40,
    		fontFamily: FontFamily.materialIconsRegular,
    		color: Color.colorDarkgray100,
    		display: "flex",
    		textAlign: "center"
  	},
  	textContainer: {
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	bild: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorDarkgray200,
    		textAlign: "center"
  	}
});

export default PictureOuterContainer;
