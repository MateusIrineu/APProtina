import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";

export default function Perfil() {
  const [nome, setNome] = useState("Nome de Usuario");
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(nome);

  const salvarNome = () => {
    setNome(novoNome);
    setEditando(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/4d/c7/06/4dc7064a3b22da9362e2ca334610fb8c.jpg",
        }}
        style={styles.avatar}
      />
      {editando ? (
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            value={novoNome}
            onChangeText={setNovoNome}
            placeholder="Digite Aqui!!"
          />
          <TouchableOpacity style={styles.botao} onPress={salvarNome}>
            <Text style={{ color: "#fff" }}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerNome}>
          <Text style={styles.nome}>{nome}</Text>
          <TouchableOpacity onPress={() => setEditando(true)}>
            <Text style={{ marginLeft: 10 }}>
              <Feather name="edit-2" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerNome: {
    flex: 1,
    flexDirection: "row",
  },
  avatar: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 180,
    marginBottom: 10,
    textAlign: "center",
  },
  botao: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
