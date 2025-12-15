import {
  AddIcon,
  CheckMarkIcon,
  EatSymbolIcon,
  MagicSparkleIcon,
  SolidFireIcon,
} from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OptimizedBadge = () => {
  return (
    <View style={[styles.optimizedBadge]}>
      <MagicSparkleIcon width={12} height={12} />
      <Text style={styles.optimized}>Optimized</Text>
    </View>
  );
};

type AddMealRowProps = {
  title?: string;
  ingredients?: string;
  calories?: string;
  isOptimized?: boolean;
  onPress?: () => void;
  onAddPress?: () => void;
};

const AddMealRow = ({
  title = "Frühstücks Bowl",
  ingredients = "Banane, Haferflocken, Blaubeeren, Heidelbeeren",
  calories = "555 kcal",
  isOptimized = false,
  onPress,
  onAddPress = () => {},
}: AddMealRowProps) => {
  const router = useRouter();
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

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/HinzuRezDetail");
    }
  };

  const handleAddPress = () => {
    onAddPress();
    Animated.sequence([
      Animated.timing(addAnim, {
        toValue: 1,
        duration: 600,
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

  return (
    <View style={styles.mealRow}>
      <Pressable style={styles.leftClickContainer} onPress={handlePress}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            {isOptimized ? <OptimizedBadge /> : null}
            <EatSymbolIcon
              width={18}
              height={18}
              color={Color.neutralTagColor}
            />
            <View style={styles.ingredientsContainer}>
              <Text
                style={[styles.captionTypo]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ingredients}
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon
              width={18}
              height={18}
              color={Color.neutralTagColor}
            />
            <Text style={styles.captionTypo}>{calories}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={handleAddPress}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <Animated.View style={[styles.addButton, animatedButtonStyle]}>
          <Animated.View
            style={{ position: "absolute", opacity: addIconOpacity }}
          >
            <AddIcon size={24} color={Color.neutralWhite} />
          </Animated.View>
          <Animated.View style={{ opacity: checkIconOpacity }}>
            <CheckMarkIcon size={24} color={Color.neutralWhite} />
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 32,
  },
  leftClickContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    gap: 4,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  captionTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  ingredientsContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightClickContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 13,
    alignSelf: "stretch",
  },
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
  optimizedBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    paddingLeft: 4,
    paddingRight: 6,
    paddingVertical: 1,
    gap: 4,
  },
  optimized: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
});

export default AddMealRow;
