import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Gradiente de fundo da tela inteira */}
      <LinearGradient
        colors={["#DC385A", "#761E30"]}
        style={StyleSheet.absoluteFill}
      />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["#DC385A", "#761E30"]}
              style={StyleSheet.absoluteFill}
            />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#fff",
          headerTintColor: "#fff", // texto/branco do header
          headerBackground: () => (
            <LinearGradient
              colors={["#DC385A", "#761E30"]}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="tarefas"
          options={{
            title: "Tarefas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-done" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="filtro"
          options={{
            title: "Filtro",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="filter" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
