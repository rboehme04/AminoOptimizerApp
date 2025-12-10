import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Color } from "@/constants/GlobalStyles";

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
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: Color.neutralBackgroundDark },
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="index"
          // options={{
          //   contentStyle: { backgroundColor: Color.neutralBackgroundDark },
          // }}
        />
        <Stack.Screen 
          name="CreateRecipe"
          // options={{
          //   contentStyle: { backgroundColor: Color.neutralBackgroundDark },
          // }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutralBackgroundDark,
  },
});
