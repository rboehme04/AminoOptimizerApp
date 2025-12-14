import { Color } from "@/constants/GlobalStyles";
import { StyleSheet, TextInput, View } from "react-native";

export default function SettingsInputComponent() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.neutralWhite,
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
    paddingVertical: 4,
    
  },
  rightContainer: {
    flex: 1,
  },
});