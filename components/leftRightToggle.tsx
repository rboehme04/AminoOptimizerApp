import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Padding, FontFamily, LineHeight, FontSize, Color } from "../GlobalStyles";

const LeftRightToggle = () => {
  	
  	return (
    		<SafeAreaView style={styles.activeleft}>
      			<View style={styles.view}>
        				<View style={[styles.textLeftActive, styles.textFlexBox]}>
          					<Text style={[styles.rezepte, styles.rightTypo]}>left</Text>
        				</View>
        				<View style={[styles.textRight, styles.textFlexBox]}>
          					<Text style={[styles.right, styles.rightTypo]}>right</Text>
        				</View>
        				<View style={styles.line} />
        				<View style={styles.rightClickContainer} />
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	activeleft: {
    		flex: 1
  	},
  	textFlexBox: {
    		paddingVertical: Padding.padding_3,
    		paddingHorizontal: 0,
    		justifyContent: "center",
    		alignItems: "center",
    		flex: 1
  	},
  	rightTypo: {
    		textAlign: "center",
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: -0.23,
    		fontSize: FontSize.fs_15,
    		alignSelf: "stretch"
  	},
  	view: {
    		width: "100%",
    		flexDirection: "row",
    		paddingHorizontal: 30,
    		paddingTop: 6,
    		paddingBottom: 10,
    		gap: 10,
    		flex: 1
  	},
  	textLeftActive: {
    		zIndex: 0
  	},
  	rezepte: {
    		color: Color.colorWhite
  	},
  	textRight: {
    		zIndex: 1
  	},
  	right: {
    		color: Color.colorDimgray
  	},
  	line: {
    		height: 2,
    		width: "9.87%",
    		right: "66.93%",
    		bottom: 8,
    		left: "23.2%",
    		borderStyle: "solid",
    		borderColor: Color.colorWhite,
    		borderTopWidth: 2,
    		zIndex: 2,
    		position: "absolute"
  	},
  	rightClickContainer: {
    		height: 42,
    		width: "48.8%",
    		top: 0,
    		right: "0%",
    		bottom: 0,
    		left: "51.2%",
    		zIndex: 3,
    		position: "absolute",
    		justifyContent: "center",
    		alignItems: "center"
  	}
});

export default LeftRightToggle;
