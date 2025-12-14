import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsCategoryRowComponent({ label }: { label: string }) {
  return (
    <View style={styles.container}>
        <View style={styles.labelContainer}>
            <Text style={styles.text}>{label}</Text>
        </View>
        <View style={styles.clickContainer}>
            <Text style={styles.text}>Jens Huhn</Text>
            <ChevronRightIcon size={20} color={Color.neutralButtonInactive} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 10,
    gap: 10,
  },
  labelContainer: {
    flex: 1,
  },
  clickContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Color.neutralStrokeColor,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});