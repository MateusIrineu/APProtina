import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#DC385A" }}>
      {/* Parte de cima com imagem de fundo */}
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" }} // imagem de fundo
        style={styles.header}
      >
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} // foto do perfil
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>Yoshiko Namika</Text>
      </ImageBackground>

      {/* Lista de opções */}
      <View style={styles.menuContainer}>
        {["Edit Profile", "Progress", "Preferences", "Privacy", "Sign Out"].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageWrapper: {
    borderWidth: 4,
    borderColor: "#DC385A",
    borderRadius: 100,
    padding: 4,
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: "#DC385A",
    paddingVertical: 20,
    alignItems: "center",
  },
  menuItem: {
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
});
