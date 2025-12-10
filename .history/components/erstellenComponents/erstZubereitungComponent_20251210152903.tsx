import * as React from "react";
import {Text, StyleSheet, Image, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily, LineHeight, FontSize, Padding } from "../GlobalStyles";

const ZubereitungDropDown = () => {
  	
  	return (
    		<SafeAreaView style={styles.zubereitungDropDown}>
      			<View style={styles.view}>
        				<View style={[styles.labelContainer, styles.containerFlexBox]}>
          					<View style={[styles.clickContainer, styles.containerFlexBox]}>
            						<Text style={styles.zubereitungTypo}>Zubereitung</Text>
            						<Image style={styles.chevronRightIcon} resizeMode="cover" />
          					</View>
        				</View>
        				<View style={styles.textinputContainer}>
          					<View style={styles.variableInputTextarea}>
            						<Text style={[styles.whatWouldYou, styles.zubereitungTypo]}>optional</Text>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	zubereitungDropDown: {
    		flex: 1
  	},
  	containerFlexBox: {
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	zubereitungTypo: {
    		textAlign: "left",
    		color: Color.colorDarkgray,
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: -0.23,
    		fontSize: FontSize.fs_15
  	},
  	view: {
    		width: "100%",
    		alignItems: "center",
    		flex: 1
  	},
  	labelContainer: {
    		height: 44,
    		alignSelf: "stretch"
  	},
  	clickContainer: {
    		paddingHorizontal: 0,
    		paddingVertical: 2,
    		gap: 4
  	},
  	chevronRightIcon: {
    		height: 20,
    		width: 20
  	},
  	textinputContainer: {
    		paddingHorizontal: Padding.padding_8,
    		paddingVertical: 0,
    		alignSelf: "stretch"
  	},
  	variableInputTextarea: {
    		height: 100,
    		borderRadius: 18,
    		backgroundColor: Color.colorGray,
    		paddingHorizontal: 12,
    		paddingVertical: Padding.padding_8,
    		alignSelf: "stretch"
  	},
  	whatWouldYou: {
    		alignSelf: "stretch"
  	}
});

export default ZubereitungDropDown;
