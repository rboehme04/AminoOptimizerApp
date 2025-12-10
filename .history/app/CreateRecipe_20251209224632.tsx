import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { HelpCircleIcon, EditPencilIcon, SettingsIcon } from "@/assets/icons/icons";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen" />
      <NavBar title="Recipe Details"
  rightActions={[
    { icon: <HelpCircleIcon size={24} />, onPress: () => setShowHelp(true) },
    { icon: <EditPencilIcon size={24} />, onPress: () => router.push('/edit') },
    { icon: <SettingsIcon size={24} />, onPress: () => router.push('/settings') },
  ]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
