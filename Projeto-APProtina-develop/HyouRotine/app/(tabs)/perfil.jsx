import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Button, 
} from "react-native";
import { useState } from "react";
import BigButton from "../../components/BigButton";
import { useFontSize } from "../../components/FonteSizeContext"; 

export default function ProfileScreen() {
  const { fontSize, setFontSize } = useFontSize(); 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#DC385A" }}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        }}
        style={styles.header}
      >
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.profileImage}
          />
        </View>
        <Text style={[styles.name, { fontSize }]}>Yoshiko Namika</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button title="A+" onPress={() => setFontSize(24)} />
          <Button title="A-" onPress={() => setFontSize(16)} />
        </View>
      </ImageBackground>

      {/* Lista de opções */}
      <View style={styles.menuContainer}>
        {[
          "Editar Perfil",
          "Progresso",
          "Preferências",
          "Privacidade",
          "Sair",
        ].map((item, index) => (
          <BigButton
            key={index}
            title={item}
            onPress={() => console.log(`Pressionado: ${item}`)}
            style={styles.menuItem}
            textStyle={[styles.menuText, { fontSize }]} 
            accessibilityHint={`Navegar para ${item}`}
          />
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
