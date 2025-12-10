import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily } from "../GlobalStyles";

const VariableInputTextarea = () => {
  	
  	return (
    		<SafeAreaView style={styles.viewBg}>
      			<View style={[styles.view, styles.viewBg]}>
        				<Text style={styles.whatWouldYou}>optional</Text>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	variableInputTextarea: {
    		flex: 1,
    		backgroundColor: "#262626"
  	},
  	viewBg: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		height: 100,
    		paddingHorizontal: 12,
    		paddingVertical: 8
  	},
  	whatWouldYou: {
    		alignSelf: "stretch",
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorDarkgray,
    		textAlign: "left"
  	}
});

export default VariableInputTextarea;
