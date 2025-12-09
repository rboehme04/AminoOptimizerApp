import * as React from "react";
import {StyleSheet, View, Text, Pressable} from "react-native";
import { Color, Padding, FontFamily } from "../GlobalStyles";

const RezeptErstellenButton = () => {
  	
  	return (
    		<Pressable style={styles.rezeptErstellenButton} onPress={()=>{}}>
      			<View style={styles.editPencilNote}>
        				<Image style={styles.vectorIcon} resizeMode="cover" />
      			</View>
      			<Text style={styles.text}>Rezept erstellen</Text>
    		</Pressable>);
};

const styles = StyleSheet.create({
  	rezeptErstellenButton: {
    		width: "100%",
    		backgroundColor: Color.colorGray,
    		flex: 1,
    		flexDirection: "row",
    		alignItems: "center",
    		justifyContent: "center",
    		paddingLeft: 20,
    		paddingTop: Padding.padding_10,
    		paddingRight: 24,
    		paddingBottom: Padding.padding_10,
    		gap: 12,
    		overflow: "hidden"
  	},
  	editPencilNote: {
    		height: 24,
    		width: 24
  	},
  	vectorIcon: {
    		position: "absolute",
    		height: "76.67%",
    		width: "76.67%",
    		top: "10.7%",
    		right: "10.83%",
    		bottom: "12.63%",
    		left: "12.5%",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		overflow: "hidden"
  	},
  	text: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontWeight: "600",
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorWhite,
    		textAlign: "center"
  	}
});

export default RezeptErstellenButton;
