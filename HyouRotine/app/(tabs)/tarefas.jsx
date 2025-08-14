import { View, Text, TextInput, Pressable, StyleSheet, Alert, FlatList, ImageBackground } from "react-native";
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
      const newTask = { id: tasks.length + 1, completed: false, text };
      setTasks([...tasks, newTask]);
      setNewTask("");
      Alert.alert("Tarefa Adicionada", `Você adicionou: ${text}`);
    }
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <ImageBackground
      source={require("../../assets/image/imagemFundo.png")} // sua imagem de fundo
      style={style.background}
    >
      <View style={style.mainContainer}>


        <View style={style.cardContainer}>
          <TextInput
            style={style.input}
            placeholder="Digite a tarefa"
            placeholderTextColor="#999"
            onChangeText={setNewTask}
            value={text}
          />

          <Pressable onPress={addTask} style={({ pressed }) => [
            style.button,
            { backgroundColor: pressed ? "#222" : "#000" }
          ]}>
            <Text style={style.buttonText}>Adicionar</Text>
          </Pressable>

          <FlatList
            style={style.taskList}
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Task style={style.taskName}
                text={item.text}
                completed={item.completed}
                onToggle={() => toggleCompleted(item.id)}
                onDelete={() => remover(item.id)}
              />
            )}
          />
        </View>
        <View>
          
        </View>
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  mainContainer: {
    marginTop: 80,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 2,
    borderColor: "#FF3761",
    borderRadius: 16,
    padding: 30,
    width: "90%",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 15,
    borderWidth: 1
  },
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 14,
  },
  taskList: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 6,
    padding: 40,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 5
  },
  taskName: {
    color: '#fff'
  }
});
