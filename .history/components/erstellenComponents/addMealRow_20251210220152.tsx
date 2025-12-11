import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Gap, LineHeight, FontSize, FontFamily, Padding, Height, Width } from "../GlobalStyles";

const MealRow = () => {
  	
  	return (
    		<SafeAreaView style={styles.mealRow}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<Pressable style={[styles.leftClickContainer, styles.frameFlexBox]} onPress={()=>{}}>
          					<Text style={styles.title}>Frühstücks Bowl</Text>
          					<View style={[styles.bottomContainer, styles.containerFlexBox]}>
            						<View style={[styles.frame, styles.frameFlexBox]}>
              							<View style={styles.eatSymbol}>
                								<Image style={[styles.vectorIcon, styles.vectorIconLayout]} resizeMode="cover" />
              							</View>
              							<Text style={[styles.bananeHaferflockenBlaubeer, styles.kcalTypo]}>Banane, Haferflocken, Blaubeeren</Text>
            						</View>
            						<View style={[styles.frame2, styles.frameFlexBox]}>
              							<View style={styles.eatSymbol}>
                								<Image style={[styles.vectorIcon2, styles.vectorIconLayout]} resizeMode="cover" />
              							</View>
              							<Text style={styles.kcalTypo}>555kcal</Text>
            						</View>
          					</View>
        				</Pressable>
        				<View style={[styles.rightClickContainer, styles.containerFlexBox]}>
          					<View style={styles.addButton}>
            						<View style={[styles.addButton2, styles.viewFlexBox]}>
              							<View style={styles.monotoneAdd}>
                								<Image style={[styles.vectorIcon3, styles.vectorIconLayout]} resizeMode="cover" />
              							</View>
            						</View>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	mealRow: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row",
    		flex: 1
  	},
  	frameFlexBox: {
    		gap: Gap.gap_4,
    		alignItems: "center"
  	},
  	containerFlexBox: {
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	vectorIconLayout: {
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	kcalTypo: {
    		color: Color.colorDarkgray,
    		lineHeight: LineHeight.lh_16,
    		fontSize: FontSize.fs_12,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro
  	},
  	view: {
    		justifyContent: "space-between",
    		gap: 0,
    		width: "100%",
    		backgroundColor: Color.colorGray
  	},
  	leftClickContainer: {
    		height: 66,
    		paddingLeft: Padding.padding_16,
    		paddingRight: 8,
    		justifyContent: "center",
    		flex: 1
  	},
  	title: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontWeight: "600",
    		color: Color.colorWhite,
    		overflow: "hidden",
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	bottomContainer: {
    		gap: 8,
    		flexDirection: "row"
  	},
  	frame: {
    		flexDirection: "row",
    		flex: 1
  	},
  	eatSymbol: {
    		height: Height.height_18,
    		width: Width.width_18
  	},
  	vectorIcon: {
    		height: "79.44%",
    		width: "66.11%",
    		right: "17.22%",
    		bottom: "8.06%",
    		left: "16.67%",
    		top: "12.5%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	},
  	bananeHaferflockenBlaubeer: {
    		overflow: "hidden",
    		flex: 1
  	},
  	frame2: {
    		flexDirection: "row"
  	},
  	vectorIcon2: {
    		height: "88.89%",
    		width: "73.33%",
    		top: "4.68%",
    		right: "13.53%",
    		bottom: "6.43%",
    		left: "13.13%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	},
  	rightClickContainer: {
    		width: 57,
    		paddingRight: 9,
    		justifyContent: "center"
  	},
  	addButton: {
    		paddingHorizontal: 4,
    		paddingVertical: 1,
    		flexDirection: "row",
    		width: "100%"
  	},
  	addButton2: {
    		height: 40,
    		borderRadius: 9999,
    		borderStyle: "solid",
    		borderColor: Color.colorDarkslategray,
    		borderWidth: 1,
    		padding: Padding.padding_16,
    		overflow: "hidden",
    		justifyContent: "center"
  	},
  	monotoneAdd: {
    		height: 24,
    		width: 24
  	},
  	vectorIcon3: {
    		height: "75%",
    		width: "75%",
    		right: "12.5%",
    		bottom: "12.5%",
    		left: "12.5%",
    		top: "12.5%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	}
});

export default MealRow;
