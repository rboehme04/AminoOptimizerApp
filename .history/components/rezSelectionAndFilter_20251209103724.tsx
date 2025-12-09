import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Padding, Border, FontFamily, LineHeight, FontSize, Gap, Color } from "../GlobalStyles";

const RezSelectionAndFilterComponent = () => {
  	
  	return (
    		<SafeAreaView style={styles.rezSelectionAndFilterCompo}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<View style={[styles.sortierung, styles.viewFlexBox]}>
          					<View style={[styles.clickContainer, styles.clickContainerFlexBox]}>
            						<View style={[styles.badgeText, styles.badgeFlexBox]}>
              							<View style={[styles.frame, styles.clickContainerFlexBox]}>
                								<Text style={[styles.text, styles.textTypo]}>Letzte</Text>
              							</View>
            						</View>
          					</View>
          					<Pressable style={[styles.clickContainer2, styles.clickContainerFlexBox]} onPress={()=>{}}>
            						<View style={[styles.badgeText2, styles.badgeFlexBox]}>
              							<View style={styles.starFull}>
                								<Image style={styles.vectorIcon} resizeMode="cover" />
              							</View>
              							<View style={[styles.frame, styles.clickContainerFlexBox]}>
                								<Text style={[styles.text2, styles.textTypo]}>Favoriten</Text>
              							</View>
            						</View>
          					</Pressable>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	rezSelectionAndFilterCompo: {
    		flex: 1
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	clickContainerFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	badgeFlexBox: {
    		paddingVertical: Padding.padding_6,
    		paddingHorizontal: Padding.padding_12,
    		borderRadius: Border.br_18,
    		overflow: "hidden",
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row",
    		width: "100%"
  	},
  	textTypo: {
    		textAlign: "center",
    		fontFamily: FontFamily.sFPro,
    		lineHeight: LineHeight.lh_16,
    		fontSize: FontSize.fs_12
  	},
  	view: {
    		paddingHorizontal: Padding.padding_4,
    		paddingBottom: Padding.padding_4,
    		width: "100%",
    		alignItems: "center",
    		flex: 1
  	},
  	sortierung: {
    		gap: Gap.gap_8
  	},
  	clickContainer: {
    		width: 60,
    		height: 44,
    		justifyContent: "center"
  	},
  	badgeText: {
    		backgroundColor: Color.colorDodgerblue
  	},
  	frame: {
    		justifyContent: "center",
    		flexDirection: "row"
  	},
  	text: {
    		color: Color.colorGray
  	},
  	clickContainer2: {
    		width: 100,
    		height: 44,
    		justifyContent: "center"
  	},
  	badgeText2: {
    		backgroundColor: Color.colorDarkslategray,
    		gap: Gap.gap_8
  	},
  	starFull: {
    		height: 16,
    		width: 16
  	},
  	vectorIcon: {
    		position: "absolute",
    		height: "90%",
    		width: "93.75%",
    		top: "5.25%",
    		right: "3.12%",
    		bottom: "4.75%",
    		left: "3.13%",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		overflow: "hidden"
  	},
  	text2: {
    		color: Color.colorWhite
  	}
});

export default RezSelectionAndFilterComponent;
