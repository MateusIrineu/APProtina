import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { BigTargetsProvider } from "../components/BigTargetsContext";
import { FontSizeProvider } from "../components/FonteSizeContext";

export default function RootLayout() {
  return (
    <FontSizeProvider>
      <BigTargetsProvider>
        <StatusBar/>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: 'Erro' }} />
        </Stack>
      </BigTargetsProvider>
    </FontSizeProvider>
  );
}