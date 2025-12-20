import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import SettingsInputComponent from "@/components/settingsComponents/settingsInputComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsDetailScreen = () => {
  const router = useRouter();
  const { label, placeholder, measuringUnit } = useLocalSearchParams<{
    label: string;
    placeholder?: string;
    measuringUnit?: string;
  }>();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  //   This is used to get the height of the keyboard so that the next button is not hidden by the keyboard
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={label} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsInputComponent
          label={label}
          placeholder={placeholder}
          measuringUnit={measuringUnit}
        />
      </ScrollView>
      <NextButton text="Speichern" keyboardHeight={keyboardHeight} onPress={() => {router.back()}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  contentContainer: {
    gap: 16,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});

export default SettingsDetailScreen;
