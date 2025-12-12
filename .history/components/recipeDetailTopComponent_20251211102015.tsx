import * as React from "react";
import {StyleSheet, View, Pressable, Text, ImageBackground} from "react-native";
import { BlurView } from "@react-native-community/blur"
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation, ParamListBase} from "@react-navigation/native";
import { Color, FontFamily, Padding, Width, Height, LineHeight, FontSize, Gap, Border } from "../GlobalStyles";

const BAOptimizedRecipeDetailTopComponent = () => {
  	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    		
    		return (
      			<LinearGradient style={[styles.baOptimizedRecipeDetailTop, styles.iconBg]} locations={[0,0.4,0.66,0.83,1]} colors={["rgba(18, 18, 18, 0.58)", "rgba(18, 18, 18, 0.45)", "rgba(18, 18, 18, 0.58)", "rgba(18, 18, 18, 0.58)", "rgba(18, 18, 18, 0.8)"]} useAngle={true} angle={180}>
        				<ImageBackground style={[styles.icon, styles.iconBg]} resizeMode="cover">
          					<View style={styles.navBar}>
            						<View style={styles.leftContainer}>
              							<Pressable style={styles.clickContainer} onPress={() => navigation.goBack()}>
                								<View style={styles.chevronLeft}>
                  									<Image style={[styles.icon2, styles.iconLayout]} resizeMode="cover" />
                								</View>
              							</Pressable>
            						</View>
            						<Text style={[styles.rezept, styles.kcalTypo2]}>Hinzufügen</Text>
            						<View style={styles.rightContainer}>
              							<Pressable style={[styles.clickContainer2, styles.clickContainerFlexBox]} onPress={()=>{}}>
                								<View style={[styles.background, styles.shareFlexBox]}>
                  									<BlurView style={styles.blurview} blurAmount={4}>
                    										<View style={styles.view} />
                  									</BlurView>
                  									<View style={styles.shareIconLayout}>
                    										<Image style={[styles.vectorIcon, styles.iconLayout]} resizeMode="cover" />
                  									</View>
                								</View>
              							</Pressable>
              							<View style={[styles.clickContainer3, styles.clickContainerFlexBox]}>
                								<View style={[styles.background, styles.shareFlexBox]}>
                  									<BlurView style={styles.blurview} blurAmount={4}>
                    										<View style={styles.view} />
                  									</BlurView>
                  									<View style={[styles.shareIcon, styles.shareIconLayout]}>
                    										<View style={styles.shareFlexBox}>
                      											<Image style={[styles.icon3, styles.iconLayout]} resizeMode="cover" />
                    										</View>
                  									</View>
                								</View>
              							</View>
              							<View style={[styles.starNavBar, styles.clickContainerFlexBox]}>
                								<View style={[styles.background, styles.shareFlexBox]}>
                  									<BlurView style={styles.blurview} blurAmount={4}>
                    										<View style={styles.view} />
                  									</BlurView>
                  									<View style={styles.shareIconLayout}>
                    										<Image style={[styles.vectorIcon2, styles.iconLayout]} resizeMode="cover" />
                  									</View>
                								</View>
              							</View>
            						</View>
          					</View>
          					<View style={styles.bottomContainer}>
            						<View style={styles.titleContainer}>
              							<View style={styles.title}>
                								<View style={styles.text}>
                  									<Text style={[styles.rezeptName, styles.kcalTypo1]}>Frühstücks Bowl</Text>
                								</View>
              							</View>
            						</View>
            						<View style={styles.makros}>
              							<View style={styles.kalorien}>
                								<View style={styles.frame}>
                  									<View style={styles.frame2}>
                    										<Text style={[styles.kcal, styles.kcalTypo]}>450kcal</Text>
                  									</View>
                  									<Text style={[styles.protein, styles.proteinLayout]}>Kalorien</Text>
                								</View>
              							</View>
              							<View style={styles.protein2}>
                								<View style={styles.frame3}>
                  									<View style={styles.frame2}>
                    										<Text style={[styles.kcal2, styles.kcalTypo]}>15g</Text>
                  									</View>
                  									<Text style={[styles.protein3, styles.proteinLayout]}>Protein</Text>
                								</View>
              							</View>
              							<View style={styles.protein2}>
                								<View style={styles.frame3}>
                  									<View style={styles.frame2}>
                    										<Text style={[styles.kcal3, styles.kcalTypo]}>71g</Text>
                  									</View>
                  									<Text style={[styles.protein3, styles.proteinLayout]}>Carbs</Text>
                								</View>
              							</View>
              							<View style={styles.fett}>
                								<View style={styles.frame7}>
                  									<View style={styles.frame2}>
                    										<Text style={[styles.kcal4, styles.kcal4Typo]}>11g</Text>
                  									</View>
                  									<Text style={[styles.protein5, styles.kcal4Typo]}>Fett</Text>
                								</View>
              							</View>
            						</View>
          					</View>
        				</ImageBackground>
      			</LinearGradient>);
    		};
    		
    		const styles = StyleSheet.create({
      			iconBg: {
        				backgroundColor: "transparent",
        				alignItems: "center"
      			},
      			iconLayout: {
        				maxHeight: "100%",
        				maxWidth: "100%",
        				overflow: "hidden",
        				position: "absolute"
      			},
      			kcalTypo2: {
        				textAlign: "center",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			clickContainerFlexBox: {
        				padding: Padding.padding_4,
        				justifyContent: "center",
        				width: 44,
        				flexDirection: "row",
        				alignItems: "center"
      			},
      			shareFlexBox: {
        				overflow: "hidden",
        				alignSelf: "stretch",
        				flex: 1
      			},
      			shareIconLayout: {
        				width: Width.width_20,
        				height: Height.height_20
      			},
      			kcalTypo1: {
        				textAlign: "left",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			kcalTypo: {
        				lineHeight: LineHeight.lh_20,
        				letterSpacing: -0.23,
        				fontSize: FontSize.fs_15,
        				fontWeight: "600"
      			},
      			proteinLayout: {
        				lineHeight: LineHeight.lh_16,
        				fontSize: FontSize.fs_12,
        				alignSelf: "stretch"
      			},
      			kcal4Typo: {
        				textAlign: "right",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			baOptimizedRecipeDetailTop: {
        				gap: Gap.gap_12,
        				paddingBottom: Padding.padding_16,
        				paddingTop: 44,
        				paddingHorizontal: Padding.padding_16,
        				borderBottomLeftRadius: Border.br_24,
        				borderBottomRightRadius: Border.br_24,
        				backgroundColor: "transparent",
        				justifyContent: "space-between",
        				flex: 1,
        				height: "100%",
        				width: "100%"
      			},
      			icon: {
        				gap: Gap.gap_12,
        				paddingBottom: Padding.padding_16,
        				paddingTop: 44,
        				paddingHorizontal: Padding.padding_16,
        				borderBottomLeftRadius: Border.br_24,
        				borderBottomRightRadius: Border.br_24,
        				backgroundColor: "transparent",
        				justifyContent: "space-between",
        				flex: 1,
        				height: "100%",
        				width: "100%"
      			},
      			navBar: {
        				gap: 0,
        				flexDirection: "row",
        				height: 44,
        				alignSelf: "stretch",
        				justifyContent: "space-between",
        				alignItems: "center"
      			},
      			leftContainer: {
        				width: 32,
        				flexDirection: "row",
        				alignSelf: "stretch",
        				alignItems: "center"
      			},
      			clickContainer: {
        				marginTop: -22,
        				top: "50%",
        				left: -12,
        				zIndex: 0,
        				justifyContent: "center",
        				position: "absolute",
        				width: 44,
        				flexDirection: "row",
        				height: 44,
        				alignItems: "center"
      			},
      			chevronLeft: {
        				height: 28,
        				width: 28
      			},
      			icon2: {
        				height: "50%",
        				width: "25%",
        				top: "25%",
        				right: "37.5%",
        				bottom: "25%",
        				left: "37.5%"
      			},
      			rezept: {
        				fontSize: 22,
        				letterSpacing: -0.26,
        				lineHeight: 28,
        				flex: 1
      			},
      			rightContainer: {
        				justifyContent: "flex-end",
        				paddingRight: 36,
        				flexDirection: "row",
        				alignSelf: "stretch",
        				alignItems: "center"
      			},
      			clickContainer2: {
        				zIndex: 0,
        				alignSelf: "stretch"
      			},
      			background: {
        				borderRadius: 9999,
        				justifyContent: "center",
        				flexDirection: "row",
        				backgroundColor: "transparent",
        				alignItems: "center"
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
      			view: {
        				backgroundColor: Color.colorBlack,
        				height: "100%",
        				width: "100%"
      			},
      			vectorIcon: {
        				height: "76%",
        				width: "76%",
        				top: "11.71%",
        				right: "11.5%",
        				bottom: "12.29%",
        				left: "12.5%"
      			},
      			clickContainer3: {
        				zIndex: 1,
        				alignSelf: "stretch"
      			},
      			shareIcon: {
        				justifyContent: "center",
        				flexDirection: "row",
        				alignItems: "center"
      			},
      			icon3: {
        				height: "83.5%",
        				width: "66.5%",
        				top: "8.33%",
        				right: "16.83%",
        				bottom: "8.17%",
        				left: "16.67%"
      			},
      			starNavBar: {
        				top: 0,
        				left: 88,
        				zIndex: 2,
        				position: "absolute",
        				height: 44
      			},
      			vectorIcon2: {
        				height: "90%",
        				width: "93.5%",
        				top: "5.25%",
        				right: "3.37%",
        				bottom: "4.75%",
        				left: "3.13%"
      			},
      			bottomContainer: {
        				paddingHorizontal: 8,
        				paddingVertical: 0,
        				justifyContent: "center",
        				alignSelf: "stretch",
        				alignItems: "center"
      			},
      			titleContainer: {
        				paddingHorizontal: 0,
        				paddingVertical: 24,
        				justifyContent: "center",
        				flexDirection: "row",
        				alignSelf: "stretch",
        				alignItems: "center"
      			},
      			title: {
        				justifyContent: "center",
        				alignItems: "center",
        				flex: 1
      			},
      			text: {
        				flexDirection: "row",
        				alignItems: "center",
        				width: "100%"
      			},
      			rezeptName: {
        				fontSize: 20,
        				letterSpacing: -0.45,
        				lineHeight: 25,
        				fontWeight: "600",
        				textAlign: "left",
        				flex: 1
      			},
      			makros: {
        				flexDirection: "row",
        				alignSelf: "stretch"
      			},
      			kalorien: {
        				flex: 1
      			},
      			frame: {
        				width: 83,
        				gap: Gap.gap_4
      			},
      			frame2: {
        				flexDirection: "row",
        				alignSelf: "stretch",
        				alignItems: "center"
      			},
      			kcal: {
        				textAlign: "left",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			protein: {
        				textAlign: "left",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			protein2: {
        				alignItems: "center",
        				flex: 1
      			},
      			frame3: {
        				gap: Gap.gap_4
      			},
      			kcal2: {
        				textAlign: "center",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro,
        				flex: 1
      			},
      			protein3: {
        				textAlign: "center",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			kcal3: {
        				minWidth: 43,
        				textAlign: "center",
        				color: Color.colorWhite,
        				fontFamily: FontFamily.sFPro
      			},
      			fett: {
        				alignItems: "flex-end",
        				width: 63,
        				justifyContent: "center"
      			},
      			frame7: {
        				width: 63,
        				gap: Gap.gap_4
      			},
      			kcal4: {
        				lineHeight: LineHeight.lh_20,
        				letterSpacing: -0.23,
        				fontSize: FontSize.fs_15,
        				fontWeight: "600",
        				flex: 1
      			},
      			protein5: {
        				lineHeight: LineHeight.lh_16,
        				fontSize: FontSize.fs_12,
        				alignSelf: "stretch"
      			}
    		});
    		
    		export default BAOptimizedRecipeDetailTopComponent;
    		