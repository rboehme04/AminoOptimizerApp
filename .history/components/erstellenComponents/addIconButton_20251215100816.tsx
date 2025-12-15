import { AddIcon, CheckMarkIcon } from "@/assets/icons/icons";
import { Color } from "@/constants/GlobalStyles";
import * as React from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

export type AddIconButtonHandle = {
  trigger: () => void;
};

type AddIconButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const AddIconButton = React.forwardRef<AddIconButtonHandle, AddIconButtonProps>(
  ({ style }, ref) => {
    const addAnim = React.useRef(new Animated.Value(0)).current;

    const animatedButtonStyle = React.useMemo(
      () => ({
        backgroundColor: addAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["transparent", Color.brand50GraphicsOrBrandButton],
        }),
        borderColor: addAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            Color.neutralStrokeColor,
            Color.brand50GraphicsOrBrandButton,
          ],
        }),
        transform: [
          {
            scale: addAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.94],
            }),
          },
        ],
      }),
      [addAnim]
    );

    const addIconOpacity = addAnim.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [1, 0, 0],
    });

    const checkIconOpacity = addAnim.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0, 1],
    });

    const trigger = () => {
      Animated.sequence([
        Animated.timing(addAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(addAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
    };

    React.useImperativeHandle(ref, () => ({
      trigger,
    }));

    return (
      <Animated.View style={[styles.addButton, animatedButtonStyle, style]}>
        <Animated.View
          style={{ position: "absolute", opacity: addIconOpacity }}
        >
          <AddIcon size={24} color={Color.neutralWhite} />
        </Animated.View>
        <Animated.View style={{ opacity: checkIconOpacity }}>
          <CheckMarkIcon size={24} color={Color.neutralWhite} />
        </Animated.View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.neutralStrokeColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddIconButton;
