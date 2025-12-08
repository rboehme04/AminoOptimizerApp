import * as React from "react";
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Typography, Color, Border, Width, Height } from "@/constants/GlobalStyles";

const BAOptNavBar = () => {
  	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    		
    		return (
      			<SafeAreaView style={styles.baOptNavBar}>
        				<View style={[styles.view, styles.viewFlexBox]}>
          					<View style={styles.viewFlexBox}>
            						<Pressable style={[styles.clickContainer, styles.clickContainerFlexBox]} onPress={() => navigation.goBack()} />
          					</View>
          					<Text style={styles.optimizer}>Optimizer</Text>
          					<View style={styles.viewFlexBox}>
            						<Pressable style={[styles.clickContainer2, styles.clickContainerFlexBox]} onPress={()=>{}}>
              							<View style={[styles.background, styles.clickContainerFlexBox]}>
                								<BlurView style={styles.blurview} intensity={4}>
                  									<View style={styles.view2} />
                								</BlurView>
                								<View style={styles.settingsLayout}>
                  									<Image style={[styles.settingsSvgrepoCom1Icon, styles.settingsLayout]} resizeMode="cover" />
                								</View>
              							</View>
            						</Pressable>
          					</View>
        				</View>
      			</SafeAreaView>);
    		};
    		
    		const styles = StyleSheet.create({
      			baOptNavBar: {
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
      			settingsLayout: {
        				width: Width.width_24,
        				height: Height.height_24
      			},
      			view: {
        				justifyContent: "space-between",
        				paddingHorizontal: 8,
        				paddingVertical: 0,
        				gap: 0,
        				height: 44,
        				alignItems: "center",
        				width: "100%",
        				flex: 1
      			},
      			clickContainer: {
        				width: 44,
        				justifyContent: "center",
        				height: 44
      			},
      			optimizer: {
        				fontSize: 22,
        				letterSpacing: -0.26,
        				lineHeight: 28,
        				fontWeight: "700",
        				fontFamily: FontFamily.sFPro,
        				color: Color.colorWhite,
        				textAlign: "center",
        				flex: 1
      			},
      			clickContainer2: {
        				padding: 4,
        				width: 44,
        				justifyContent: "center",
        				height: 44,
        				flexDirection: "row"
      			},
      			background: {
        				alignSelf: "stretch",
        				borderRadius: 9999,
        				backgroundColor: "transparent",
        				overflow: "hidden",
        				flexDirection: "row",
        				flex: 1
      			},
      			blurview: {
        				opacity: 0.1599999964237213,
        				top: 0,
        				left: 0,
        				right: 0,
        				bottom: 0,
        				zIndex: -1,
        				position: "absolute"
      			},
      			view2: {
        				backgroundColor: Color.colorBlack,
        				height: "100%",
        				width: "100%"
      			},
      			settingsSvgrepoCom1Icon: {
        				top: 0,
        				left: 0,
        				position: "absolute"
      			}
    		});
    		
    		export default BAOptNavBar;
    		