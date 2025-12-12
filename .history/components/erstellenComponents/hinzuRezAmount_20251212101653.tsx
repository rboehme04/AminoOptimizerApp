import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily, LineHeight, FontSize, Padding } from "../GlobalStyles";

const HinzuRezAmountComponent = () => {
  	
  	return (
    		<SafeAreaView style={styles.hinzufgenRezPortionSizeCo}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<View style={[styles.leftContainer, styles.containerFlexBox]}>
          					<View style={styles.variableInputTextarea}>
            						<Text style={[styles.whatWouldYou, styles.whatWouldYouTypo]}>1</Text>
          					</View>
        				</View>
        				<View style={[styles.rightContainer, styles.containerFlexBox]}>
          					<View style={[styles.options, styles.viewFlexBox]}>
            						<Text style={[styles.rezeptPortionen, styles.whatWouldYouTypo]}>Rezept Portionen</Text>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	hinzufgenRezPortionSizeCo: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	viewFlexBox: {
    		justifyContent: "space-between",
    		flexDirection: "row",
    		flex: 1
  	},
  	containerFlexBox: {
    		flexDirection: "row",
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	whatWouldYouTypo: {
    		color: Color.colorWhite,
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: -0.23,
    		fontSize: FontSize.fs_15
  	},
  	view: {
    		width: "100%",
    		gap: 0,
    		minHeight: 80,
    		alignItems: "center",
    		backgroundColor: Color.colorGray
  	},
  	leftContainer: {
    		paddingHorizontal: Padding.padding_20,
    		paddingVertical: 0,
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	variableInputTextarea: {
    		width: 68,
    		borderRadius: 12,
    		backgroundColor: Color.colorDarkslategray,
    		paddingHorizontal: 0,
    		paddingVertical: 10
  	},
  	whatWouldYou: {
    		textAlign: "center",
    		alignSelf: "stretch"
  	},
  	rightContainer: {
    		paddingRight: Padding.padding_20,
    		alignSelf: "stretch",
    		alignItems: "center",
    		flex: 1
  	},
  	options: {
    		borderRadius: 8,
    		paddingLeft: 16,
    		paddingTop: Padding.padding_8,
    		paddingRight: Padding.padding_8,
    		paddingBottom: Padding.padding_8
  	},
  	rezeptPortionen: {
    		textAlign: "left",
    		flex: 1
  	}
});

export default HinzufgenRezPortionSizeComponent;
