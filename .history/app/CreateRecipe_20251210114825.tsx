import { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CloseXIcon } from "@/assets/icons/icons";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import ErstZutatenComponent from "@/components/erstellenComponents/erstZutatenComponent";

export default function CreateRecipeScreen() {
  const [titleFocused, setTitleFocused] = useState(false);
  const [title, setTitle] = useState("");
  const titleInputRef = useRef<TextInput>(null);

  const handleDismissKeyboard = () => {
    setTitleFocused(false);
    titleInputRef.current?.blur();
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
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
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 106,
    gap: 16,
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
    borderWidth: 1,
    borderColor: Color.neutralWhite,
  },
  bottomContainer: {
  },
});
