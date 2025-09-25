import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard, // usado para fechar o teclado após adicionar tarefa
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";

import BigButton from "../../components/BigButton";
import { useBigTargets } from "../../components/BigTargetsContext";
import { useFontSize } from "../../components/FonteSizeContext";
import Task from "../../components/Task";
import { useTarefasStore } from "../../store/tasksStore"; // store vinculada ao AsyncStorage

export default function TasksScreen() {
  // ---------------- ESTADOS LOCAIS ----------------
  // Armazena o texto digitado pelo usuário
  const [text, setNewTask] = useState("");
  // Armazena a categoria selecionada pelo Picker
  const [category, setCategory] = useState("Alimentação");
  // Armazena o horário digitado pelo usuário
  const [time, setTime] = useState("");

  // Contextos de UI (alvo grande e tamanho de fonte)
  const { bigTargets } = useBigTargets();
  const { fontSize } = useFontSize();

  // ---------------- STORE (Zustand) ----------------
  // Aqui pegamos do store:
  // - tasks: lista de tarefas carregadas do AsyncStorage
  // - carregando: indica se o AsyncStorage ainda está sendo lido
  // - carregarTarefas(): função para buscar as tarefas do AsyncStorage
  // - adicionarTarefa(): função que adiciona tarefa no store e salva no AsyncStorage
  // - removerTarefa(): função que remove tarefa do store e do AsyncStorage
  // - toggleCompleted(): alterna o status da tarefa e atualiza no AsyncStorage
  const {
    tasks,
    carregando,
    carregarTarefas,
    adicionarTarefa,
    removerTarefa,
    toggleCompleted,
  } = useTarefasStore();

  // ---------------- CARREGAR TAREFAS AO MONTAR ----------------
  useEffect(() => {
    // Ao abrir a tela, puxa todas as tarefas do AsyncStorage
    carregarTarefas(); 
  }, []);

  // ---------------- FUNÇÃO REMOVER ----------------
  const remover = async (id) => {
    // Chama a função do store para remover a tarefa
    // O store atualiza o estado local e salva no AsyncStorage automaticamente
    await removerTarefa(id);
  };

  // ---------------- FUNÇÃO ADICIONAR ----------------
  const addTask = async () => {
    if (text.trim() && time.trim()) {
      // Cria objeto da nova tarefa
      const newTask = {
        id: Date.now().toString(), // ID único
        completed: false, // inicia como pendente
        text,               // texto da tarefa
        category,           // categoria selecionada
        time,               // horário digitado
      };

      // Adiciona a tarefa no store (e automaticamente no AsyncStorage)
      await adicionarTarefa(newTask);

      // Limpa campos do formulário
      setNewTask("");
      setTime("");

      // Fecha o teclado ao adicionar
      Keyboard.dismiss();

      Alert.alert("Tarefa Adicionada", `Você adicionou: ${text}`);
    } else {
      Alert.alert("Erro", "Digite a tarefa e o horário!");
    }
  };

  // ---------------- FUNÇÃO TOGGLE COMPLETED ----------------
  const toggle = async (id) => {
    // Altera status da tarefa entre concluída/pendente
    // O store atualiza o estado e salva automaticamente no AsyncStorage
    await toggleCompleted(id);
  };

  // ---------------- LOADING ----------------
  if (carregando) {
    // Mostra carregando enquanto busca do AsyncStorage
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  // ---------------- UI PRINCIPAL ----------------
  return (
    <ImageBackground
      source={require("../../assets/image/imagemFundo.png")}
      style={styles.background}
    >
      {/* Efeito blur */}
      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

      <View style={styles.mainContainer}>
        {/* ---------------- FORMULÁRIO ---------------- */}
        <View style={styles.card}>
          {/* Input do texto da tarefa */}
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Digite a tarefa"
            placeholderTextColor="#999"
            onChangeText={setNewTask} // atualiza estado local
            value={text}              // valor do estado local
          />

          {/* Picker da categoria */}
          <Picker
            selectedValue={category}            // estado local
            onValueChange={(itemValue) => setCategory(itemValue)} // atualiza estado local
            style={[styles.picker, { fontSize }]}
          >
            <Picker.Item label="Alimentação" value="Alimentação" />
            <Picker.Item label="Lazer" value="Lazer" />
            <Picker.Item label="Exercício" value="Exercício" />
            <Picker.Item label="Estudo" value="Estudo" />
            <Picker.Item label="Trabalho" value="Trabalho" />
          </Picker>

          {/* Input do horário */}
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Horário (ex: 22:00 às 22:30)"
            placeholderTextColor="#999"
            onChangeText={setTime} // atualiza estado local
            value={time}           // valor do estado local
          />

          {/* Botão adicionar */}
          <BigButton
            title="Adicionar"
            onPress={addTask} // chama função que adiciona tarefa no store/AsyncStorage
            style={styles.button}
            textStyle={[styles.buttonText, { fontSize }]}
            accessibilityHint="Adiciona uma nova tarefa à lista"
            bigTargets={bigTargets}
          />
        </View>

        {/* ---------------- LISTA DE TAREFAS ---------------- */}
        <FlatList
          style={styles.taskList}
          contentContainerStyle={{ paddingBottom: 80 }} // margem extra para o último card
          data={tasks} // pega tarefas diretamente do store (que vem do AsyncStorage)
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              text={item.text}          // texto da tarefa
              completed={item.completed} // status concluído/pendente
              onToggle={() => toggle(item.id)} // alterna status e salva no AsyncStorage
              onDelete={() => remover(item.id)} // remove tarefa do store/AsyncStorage
              category={item.category}  // categoria
              time={item.time}          // horário
            />
          )}
        />
      </View>
    </ImageBackground>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  /* ----- Loading ----- */
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  /* ----- Card do Formulário ----- */
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: "#333",
  },
  picker: {
    width: "100%",
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  /* ----- Lista ----- */
  taskList: {
    width: "100%",
  },
});
