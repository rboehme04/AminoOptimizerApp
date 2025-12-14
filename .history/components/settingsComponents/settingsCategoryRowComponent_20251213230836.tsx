import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsCategoryRowComponent({
  label,
  placeholder,
  measuringUnit = "",
}: {
  label: string;
  placeholder?: string;
  measuringUnit?: string;
}) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/SettingsDetailScreen",
      params: { item: label },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <Pressable style={styles.clickContainer} onPress={handlePress}>
        <Text style={styles.text}>
          {placeholder || "Jens Huhn"}
          {measuringUnit && ` ${measuringUnit}`}
        </Text>
        <ChevronRightIcon size={20} color={Color.neutralButtonInactive} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 4,
    paddingHorizontal: 10,
    gap: 10,
  },
  labelContainer: {
    flex: 2,
  },
  clickContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Color.neutralStrokeColor,
    backgroundColor: Color.neutralWhite,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
