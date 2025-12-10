import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily } from "../GlobalStyles";

const StatedefaultWhite = () => {
  	
  	return (
    		<SafeAreaView style={styles.viewBg}>
      			<View style={[styles.view, styles.viewBg]}>
        				<Text style={styles.text}>Button</Text>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	statedefaultWhite: {
    		flex: 1,
    		backgroundColor: "#fff"
  	},
  	viewBg: {
    		backgroundColor: Color.colorWhite,
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		overflow: "hidden",
    		flexDirection: "row",
    		alignItems: "center",
    		justifyContent: "center",
    		padding: 16
  	},
  	text: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontWeight: "600",
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorGray,
    		textAlign: "center",
    		flex: 1
  	}
});

export default StatedefaultWhite;
