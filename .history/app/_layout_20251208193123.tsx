import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

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
  const [loaded, error] = useFonts({
    // Load fonts from GlobalStyles for cross-platform support (iOS & Android)
    //
    // IMPORTANT: To use these fonts on Android, you need to:
    // 1. Download the font files and add them to assets/fonts/
    // 2. Uncomment the font loading lines below
    //
    // Font files needed:
    // - SF Pro: SFPro-Regular.ttf, SFPro-Medium.ttf, SFPro-Semibold.ttf, SFPro-Bold.ttf
    //   (Note: SF Pro is Apple's font - check licensing for commercial use)
    // - Inter: Inter-Regular.ttf, Inter-Medium.ttf, Inter-SemiBold.ttf, Inter-Bold.ttf
    //   (Inter is open source: https://github.com/rsms/inter)
    //
    // Uncomment when font files are added:
    // "SF Pro": require("../assets/fonts/SFPro-Regular.ttf"),
    // "Inter": require("../assets/fonts/Inter-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Tab One" }} />
        <Stack.Screen name="two" options={{ title: "Tab Two" }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
