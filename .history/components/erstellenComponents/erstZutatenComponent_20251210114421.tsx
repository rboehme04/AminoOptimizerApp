import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily, LineHeight, LetterSpacing, FontSize, Padding, Height, Width } from "@/constants/GlobalStyles";
import Svg, { Path } from "react-native-svg";

const ZutatenContainer = () => {
  	
  	return (
    		<SafeAreaView style={styles.zutatenContainer}>
      			<View style={styles.view}>
        				<View style={styles.headerContainer}>
          					<Text style={[styles.zutaten, styles.zutatenFlexBox]}>Zutaten</Text>
        				</View>
        				<View style={styles.headerContainer}>
          					<View style={styles.container}>
            						<View style={[styles.rezeptErstellenLebensmittel, styles.buttonFlexBox]}>
              							<View style={styles.container2}>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.banane, styles.kcalTypo]}>Banane</Text>
                								</View>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.fruchtMittelgro150g, styles.zutatenFlexBox]}>1 Frucht, mittelgroß (150g)</Text>
                								</View>
              							</View>
              							<View style={[styles.container5, styles.buttonFlexBox]}>
                								<View style={styles.container6}>
                  									<Text style={styles.kcalTypo}>140 kcal</Text>
                								</View>
                								<View style={[styles.clickContainer, styles.buttonIconFlexBox]}>
                  									<View style={[styles.buttonIcon, styles.buttonIconFlexBox]}>
                    										<View style={styles.monotoneAdd}>
                      											<Image style={styles.vectorIcon} resizeMode="cover" />
                    										</View>
                  									</View>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.rezeptErstellenLebensmittel, styles.buttonFlexBox]}>
              							<View style={styles.container2}>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.banane, styles.kcalTypo]}>Haferflocken</Text>
                								</View>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.fruchtMittelgro150g, styles.zutatenFlexBox]}>50g</Text>
                								</View>
              							</View>
              							<View style={[styles.container5, styles.buttonFlexBox]}>
                								<View style={styles.container6}>
                  									<Text style={styles.kcalTypo}>187 kcal</Text>
                								</View>
                								<View style={[styles.clickContainer, styles.buttonIconFlexBox]}>
                  									<View style={[styles.buttonIcon, styles.buttonIconFlexBox]}>
                    										<View style={styles.monotoneAdd}>
                      											<Image style={styles.vectorIcon} resizeMode="cover" />
                    										</View>
                  									</View>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.rezeptErstellenLebensmittel, styles.buttonFlexBox]}>
              							<View style={styles.container2}>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.banane, styles.kcalTypo]}>Milch</Text>
                								</View>
                								<View style={styles.headerContainer}>
                  									<Text style={[styles.fruchtMittelgro150g, styles.zutatenFlexBox]}>200ml</Text>
                								</View>
              							</View>
              							<View style={[styles.container5, styles.buttonFlexBox]}>
                								<View style={styles.container6}>
                  									<Text style={styles.kcalTypo}>96 kcal</Text>
                								</View>
                								<View style={[styles.clickContainer, styles.buttonIconFlexBox]}>
                  									<View style={[styles.buttonIcon, styles.buttonIconFlexBox]}>
                    										<View style={styles.monotoneAdd}>
                      											<Image style={styles.vectorIcon} resizeMode="cover" />
                    										</View>
                  									</View>
                								</View>
              							</View>
            						</View>
          					</View>
          					<Pressable style={[styles.button, styles.buttonFlexBox]} onPress={()=>{}}>
            						<View style={styles.margin}>
              							<View style={styles.container17}>
                								<Text style={[styles.addCircleOutline, styles.hinzufgenFlexBox]}>add_circle_outline</Text>
              							</View>
            						</View>
            						<View style={styles.container17}>
              							<Text style={[styles.hinzufgen, styles.hinzufgenFlexBox]}>Hinzufügen</Text>
            						</View>
          					</Pressable>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	zutatenContainer: {
    		flex: 1
  	},
  	zutatenFlexBox: {
    		textAlign: "left",
    		color: Color.colorDarkgray,
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	buttonFlexBox: {
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	kcalTypo: {
    		color: Color.colorWhite,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: LetterSpacing.ls__0_23,
    		fontSize: FontSize.fs_15
  	},
  	buttonIconFlexBox: {
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	hinzufgenFlexBox: {
    		textAlign: "center",
    		color: Color.colorDodgerblue
  	},
  	view: {
    		width: "100%",
    		gap: 8,
    		flex: 1
  	},
  	headerContainer: {
    		alignSelf: "stretch"
  	},
  	zutaten: {
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: LetterSpacing.ls__0_23,
    		fontSize: FontSize.fs_15,
    		textAlign: "left",
    		color: Color.colorDarkgray
  	},
  	container: {
    		paddingRight: 4,
    		paddingLeft: Padding.padding_8,
    		alignSelf: "stretch"
  	},
  	rezeptErstellenLebensmittel: {
    		justifyContent: "space-between",
    		gap: 0,
    		alignItems: "center",
    		alignSelf: "stretch"
  	},
  	container2: {
    		flex: 1
  	},
  	banane: {
    		overflow: "hidden",
    		alignSelf: "stretch"
  	},
  	fruchtMittelgro150g: {
    		fontSize: FontSize.fs_12,
    		lineHeight: LineHeight.lh_16,
    		overflow: "hidden"
  	},
  	container5: {
    		alignItems: "center",
    		alignSelf: "stretch"
  	},
  	container6: {
    		paddingLeft: Padding.padding_8
  	},
  	clickContainer: {
    		height: 44,
    		width: 44
  	},
  	buttonIcon: {
    		height: Height.height_24,
    		width: Width.width_24,
    		borderRadius: 9999,
    		borderStyle: "solid",
    		borderColor: Color.colorDarkslategray,
    		borderWidth: 1,
    		padding: Padding.padding_16,
    		overflow: "hidden"
  	},
  	monotoneAdd: {
    		height: Height.height_16,
    		width: Width.width_16
  	},
  	vectorIcon: {
    		position: "absolute",
    		height: "64.38%",
    		width: "64.38%",
    		top: "17.89%",
    		right: "17.74%",
    		bottom: "17.74%",
    		left: "17.89%",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		overflow: "hidden"
  	},
  	button: {
    		paddingHorizontal: Padding.padding_8,
    		paddingVertical: 10,
    		alignItems: "center"
  	},
  	margin: {
    		paddingRight: Padding.padding_8
  	},
  	container17: {
    		alignItems: "center"
  	},
  	addCircleOutline: {
    		fontSize: 24,
    		lineHeight: 24,
    		fontFamily: FontFamily.materialIconsRegular
  	},
  	hinzufgen: {
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorDodgerblue,
    		lineHeight: LineHeight.lh_20,
    		letterSpacing: LetterSpacing.ls__0_23,
    		fontSize: FontSize.fs_15
  	}
});

export default ZutatenContainer;
