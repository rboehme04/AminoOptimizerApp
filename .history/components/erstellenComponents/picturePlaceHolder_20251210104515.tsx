import { Color, Typography } from "@/constants/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PicturePlaceHolderProps = {
  onPress?: () => void;
};

const PicturePlaceHolder = ({ onPress }: PicturePlaceHolderProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pictureOuterContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.pictureInnerContainer}>
          <MaterialIcons
            name="add-a-photo"
            size={36}
            color={Color.neutralTextOrTabGrey}
            style={styles.iconDimensions}
          />
          <View>
            <Text style={styles.bildText}>Bild</Text>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pictureOuterContainer: {
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 12,
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.9,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pictureInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 20,
  },
  iconDimensions: {
    width: 36,
    height: 40,
  },
  bildText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
});

export default PicturePlaceHolder;
