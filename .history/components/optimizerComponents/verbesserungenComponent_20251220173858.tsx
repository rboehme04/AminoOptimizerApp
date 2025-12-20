import { OptimizedIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

interface VerbesserungenComponentProps {
  description: string;
}

export default function VerbesserungenComponent({
  description,
}: VerbesserungenComponentProps) {
  return (
    <View style={styles.verbesserungenContainer}>
      <View style={styles.verbesserungenHeaderContainer}>
        <OptimizedIcon size={30} color={Color.brand50GraphicsOrBrandButton} />
        <Text style={styles.verbesserungenHeaderText}>
          Verbesserungen Aminosäureprofil
        </Text>
      </View>
      <View style={styles.verbesserungenDescriptionContainer}>
        <Text style={styles.verbesserungenDescriptionText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verbesserungenContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  verbesserungenHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verbesserungenHeaderText: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  verbesserungenDescriptionContainer: {
    paddingVertical: 8,
  },
  verbesserungenDescriptionText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
