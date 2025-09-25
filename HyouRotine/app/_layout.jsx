import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar/>
    <Stack
      /* screenOptions  estilo*/
    >

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" options={{ headerShown: 'Erro' }} />

    </Stack>
    </>
  )
}