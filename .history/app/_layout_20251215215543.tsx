import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { Color } from "@/constants/GlobalStyles";
import { RecipeDraftProvider } from "@/hooks/useRecipeDraft";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <RecipeDraftProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Color.neutralBackgroundDark },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="CreateRecipe" />
          <Stack.Screen name="HinzuOverview" />
          <Stack.Screen name="HinzuRezDetail" />
          <Stack.Screen name="InfoScreen" />
          <Stack.Screen name="SettingsScreen" />
          <Stack.Screen name="SettingsCategoryScreen" />
          <Stack.Screen name="SettingsDetailScreen" />
          <Stack.Screen name="SettingsCustomDetailScreen" />
        </Stack>
      </View>
    </RecipeDraftProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutralBackgroundDark,
  },
});
