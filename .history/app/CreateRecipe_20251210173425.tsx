import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { CloseXIcon } from "@/assets/icons/icons";
import ErstZubereitungComponent from "@/components/erstellenComponents/erstZubereitungComponent";
import ErstZutatenComponent from "@/components/erstellenComponents/erstZutatenComponent";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import { Color, Typography } from "@/constants/GlobalStyles";

export default function CreateRecipeScreen() {
  const [titleFocused, setTitleFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [zubereitung, setZubereitung] = useState("");
  const titleInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const handleDismissKeyboard = () => {
    setTitleFocused(false);
    titleInputRef.current?.blur();
    Keyboard.dismiss();
  };

  const handleZubereitungFocus = () => {
    // Scroll to show the TextInput above the keyboard
    // Use a small delay to allow keyboard animation to start
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <View style={styles.picturePlaceHolderContainer}>
                  <PicturePlaceHolder />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.labelText}>Name des Rezepts</Text>
                  <TextInput
                    ref={titleInputRef}
                    style={[
                      styles.titleInput,
                      titleFocused && styles.titleInputFocused,
                    ]}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Name des Rezepts ..."
                    placeholderTextColor={Color.neutralTextOrTabGrey}
                    onFocus={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <ErstZutatenComponent />
                <ErstZubereitungComponent
                  value={zubereitung}
                  onChangeText={setZubereitung}
                  onFocus={handleZubereitungFocus}
                />
              </View>
            </View>
          </ScrollView>
          {/* TODO: Add Error handling when saving empty recipe */}
          <View
            style={[
              styles.buttonContainer,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <NextButton text="Speichern" badge={2}/>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 106,
    gap: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: Color.neutralBackgroundDark,
    zIndex: 1000,
  },
  topContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 8,
  },
  picturePlaceHolderContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    gap: 8,
  },
  labelText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  titleInput: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
  },
  titleInputFocused: {
    borderColor: Color.neutralWhite,
  },
  bottomContainer: {},
});
