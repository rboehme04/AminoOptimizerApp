import * as React from "react";
import {Text, StyleSheet, Image, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontFamily, Color, LineHeight, LetterSpacing, FontSize, Padding } from "../GlobalStyles";

const ZutatenDropDown = () => {
  	
  	return (
    		<SafeAreaView style={styles.zutatenDropDown}>
      			<View style={styles.view}>
        				<View style={[styles.labelContainer, styles.containerFlexBox]}>
          					<Text style={[styles.zutaten, styles.bananeTypo]}>Zutaten</Text>
          					<Image style={styles.chevronRightIcon} resizeMode="cover" />
        				</View>
        				<View style={styles.itemsContainer}>
          					<View style={[styles.zutatenRow, styles.containerFlexBox]}>
            						<View style={styles.leftContainer}>
              							<View style={styles.upperContainer}>
                								<Text style={[styles.banane, styles.bananeTypo]}>Kuhmilch 3,5% Fett</Text>
              							</View>
              							<View>
                								<View>
                  									<Text style={[styles.stepTitle, styles.bananeTypo]}>200ml</Text>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.rightContainer, styles.containerFlexBox]}>
              							<Text style={[styles.banane, styles.bananeTypo]}>130 kcal</Text>
            						</View>
          					</View>
          					<View style={[styles.zutatenRow, styles.containerFlexBox]}>
            						<View style={styles.leftContainer}>
              							<View style={styles.upperContainer}>
                								<Text style={[styles.banane, styles.bananeTypo]}>Banane</Text>
              							</View>
              							<View>
                								<View>
                  									<Text style={[styles.stepTitle, styles.bananeTypo]}>1 Frucht, mittelgroß (150g)</Text>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.rightContainer, styles.containerFlexBox]}>
              							<Text style={[styles.banane, styles.bananeTypo]}>143 kcal</Text>
            						</View>
          					</View>
          					<View style={[styles.zutatenRow, styles.containerFlexBox]}>
            						<View style={styles.leftContainer}>
              							<View style={styles.upperContainer}>
                								<Text style={[styles.banane, styles.bananeTypo]}>Haferflocken</Text>
              							</View>
              							<View>
                								<View>
                  									<Text style={[styles.stepTitle, styles.bananeTypo]}>50g</Text>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.rightContainer, styles.containerFlexBox]}>
              							<Text style={[styles.banane, styles.bananeTypo]}>177 kcal</Text>
            						</View>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	zutatenDropDown: {
    		flex: 1
  	},
  	containerFlexBox: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	bananeTypo: {
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro
  	},
  	view: {
    		width: "100%",
    		flex: 1
  	},
  	labelContainer: {
    		height: 44,
    		gap: 4,
    		alignSelf: "stretch"
  	},
  	zutaten: {
    		color: Color.colorDarkgray,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: LetterSpacing.ls__0_23,
    		fontSize: FontSize.fs_15
  	},
  	chevronRightIcon: {
    		height: 20,
    		width: 20
  	},
  	itemsContainer: {
    		paddingHorizontal: Padding.padding_8,
    		paddingVertical: 0,
    		gap: 8,
    		alignSelf: "stretch"
  	},
  	zutatenRow: {
    		justifyContent: "space-between",
    		gap: 0,
    		alignSelf: "stretch"
  	},
  	leftContainer: {
    		paddingRight: Padding.padding_8,
    		flex: 1
  	},
  	upperContainer: {
    		alignSelf: "stretch"
  	},
  	banane: {
    		color: Color.colorWhite,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: LetterSpacing.ls__0_23,
    		fontSize: FontSize.fs_15
  	},
  	stepTitle: {
    		fontSize: FontSize.fs_12,
    		lineHeight: LineHeight.lh_16,
    		color: Color.colorDarkgray,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	rightContainer: {
    		paddingLeft: Padding.padding_8
  	}
});

export default ZutatenDropDown;
