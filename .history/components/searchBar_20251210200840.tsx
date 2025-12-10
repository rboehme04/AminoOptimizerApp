import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, Padding, FontFamily } from "../GlobalStyles";

const SearchBarBase = () => {
  	
  	return (
    		<SafeAreaView style={styles.searchBarBase}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<View style={[styles.innerContainer, styles.viewFlexBox]}>
          					<View style={styles.searchMagnifyingGlass}>
            						<Image style={styles.vectorIcon} resizeMode="cover" />
          					</View>
          					<Text style={styles.placeholderText}>Rezept suchen</Text>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	searchBarBase: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row",
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		height: 48,
    		padding: Padding.padding_8,
    		minHeight: 40,
    		backgroundColor: Color.colorGray
  	},
  	innerContainer: {
    		paddingHorizontal: Padding.padding_8,
    		paddingVertical: 0,
    		gap: 8
  	},
  	searchMagnifyingGlass: {
    		height: 20,
    		width: 20
  	},
  	vectorIcon: {
    		position: "absolute",
    		height: "85%",
    		width: "85%",
    		top: "5.53%",
    		right: "9.47%",
    		bottom: "9.47%",
    		left: "5.53%",
    		maxWidth: "100%",
    		overflow: "hidden",
    		maxHeight: "100%"
  	},
  	placeholderText: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorDarkgray,
    		textAlign: "center"
  	}
});

export default SearchBarBase;
