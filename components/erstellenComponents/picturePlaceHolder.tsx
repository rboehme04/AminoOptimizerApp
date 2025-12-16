import { Color, Typography } from "@/constants/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PicturePlaceHolderProps = {
  onPress?: () => void;
  imageUri?: string | null;
};

const PicturePlaceHolder = ({ onPress, imageUri }: PicturePlaceHolderProps) => {
  const hasImage = Boolean(imageUri);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pictureOuterContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {hasImage ? (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri as string }} style={styles.image} />
          <View style={styles.editBadge}>
            <MaterialIcons
              name="edit"
              size={18}
              color={Color.neutralWhite}
            />
          </View>
        </View>
      ) : (
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
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pictureOuterContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: Color.neutralInputOnDark,
  },
  pressed: {
    opacity: 0.7,
  },
  pictureInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  iconDimensions: {
    width: 36,
    height: 36,
  },
  bildText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  editBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 999,
    padding: 4,
  },
});

export default PicturePlaceHolder;
