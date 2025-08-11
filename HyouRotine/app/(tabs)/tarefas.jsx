import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { useState } from "react";
import Task from "../../components/Task";

const initialTasks = [{ id: 1, completed: true, text: "Estudar React Native" }];

export default function ListaDeTarefas() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setNewTask] = useState("");

  const remover = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = () => {
    if (text.trim()) {
      const newTask = {
        id: tasks.length + 1,
        completed: false,
        text,
      };

      setTasks([...tasks, newTask]);
      setNewTask("");
      Alert.alert("Tarefa Adicionada", `Você adicionou: ${text}`);
    }
  };

  // Função para marcar/desmarcar tarefa
  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.flexContainer}>
        <Text style={style.tituloText}> Minhas Tarefas </Text>
      </View>

      <View style={style.containerInput}>
        <TextInput
          style={style.estiloInput}
          placeholder="Adicionar Tarefa"
          placeholderTextColor={"white"}
          onChangeText={setNewTask}
          value={text}
        />

        <Pressable
          onPress={addTask}
          style={({ pressed }) => [
            style.Pressionar,
            {
              backgroundColor: pressed ? "green" : "white",
            },
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                style.textInput,
                {
                  color: pressed ? "#40B7AD" : "black",
                  fontWeight: pressed ? "bold" : "500",
                },
              ]}
            >
              {" "}
              Adicionar{" "}
            </Text>
          )}
        </Pressable>

        <FlatList
          style={style.listaAtividades}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task
              text={item.text}
              completed={item.completed}
              onToggle={() => toggleCompleted(item.id)}
              onDelete={() => remover(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: "#F7F9FA",
    flex: 1,
  },

  containerInput: {
    backgroundColor: "#40B7AD",
    marginTop: 15,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  estiloInput: {
    marginVertical: 20,
    borderWidth: 0,
    borderRadius: 10,
    padding: 12,
    color: "#333",
    backgroundColor: "#fff",
    fontSize: 16,
  },

  flexContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#40B7AD",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },

  tituloText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 4,
    letterSpacing: 1,
  },

  Pressionar: {
    backgroundColor: "#4CD9CD",
    borderRadius: 50,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  textInput: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },

  listaAtividades: {
    borderRadius: 16,
    width: "auto",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
