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
          {placeholder}
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
    paddingHorizontal: 10,
    gap: 10,
  },
  labelContainer: {
    flex: 2,
    paddingTop: 8,
    paddingBottom: 4,
  },
  clickContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 18,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Color.neutralStrokeColor,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
