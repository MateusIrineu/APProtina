import { View, Text, TextInput, Pressable, StyleSheet, Alert, FlatList, ImageBackground } from "react-native";
// Componente de seleção em lista suspensa (dropdown), usado para escolher opções como categorias ou filtros 
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { BlurView } from "expo-blur"; // Import do BlurView
import Task from "../../components/Task";

const initialTasks = [];

export default function ListaDeTarefas() {
    const [tasks, setTasks] = useState(initialTasks);
    const [text, setNewTask] = useState("");
    const [category, setCategory] = useState("Alimentação");
    const [time, setTime] = useState("");

    const remover = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const addTask = () => {
        if (text.trim() && time.trim()) {
            const newTask = {
                id: tasks.length + 1,
                completed: false,
                text,
                category,
                time
            };
            setTasks([...tasks, newTask]);
            setNewTask("");
            setTime("");
            Alert.alert("Tarefa Adicionada", `Você adicionou: ${text}`);
        } else {
            Alert.alert("Erro", "Digite a tarefa e o horário!");
        }
    };

    const toggleCompleted = (id) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <ImageBackground
            source={require("../../assets/image/imagemFundo.png")}
            style={style.background}
        >
            {/* Blur por cima da imagem */}
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

            <View style={style.mainContainer}>
                {/* Formulário */}
                <View style={style.cardContainer}>
                    <TextInput
                        style={style.input}
                        placeholder="Digite a tarefa"
                        placeholderTextColor="#999"
                        onChangeText={setNewTask}
                        value={text}
                    />

                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={style.picker}
                    >
                        <Picker.Item label="Alimentação" value="Alimentação" />
                        <Picker.Item label="Lazer" value="Lazer" />
                        <Picker.Item label="Exercício" value="Exercício" />
                        <Picker.Item label="Estudo" value="Estudo" />
                        <Picker.Item label="Trabalho" value="Trabalho" />
                    </Picker>

                    <TextInput
                        style={style.input}
                        placeholder="Horário (ex: 22:00 às 22:30)"
                        placeholderTextColor="#999"
                        onChangeText={setTime}
                        value={time}
                    />

                    <Pressable onPress={addTask} style={style.button}>
                        <Text style={style.buttonText}>Adicionar</Text>
                    </Pressable>
                </View>

                {/* Lista */}
                <FlatList
                    style={{ width: "90%" }}
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Task
                            text={item.text}
                            completed={item.completed}
                            onToggle={() => toggleCompleted(item.id)}
                            onDelete={() => remover(item.id)}
                            category={item.category}
                            time={item.time}
                        />
                    )}
                />
            </View>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    mainContainer: {
        marginTop: 80,
        flex: 1,
        alignItems: "center"
    },
    cardContainer: {
        backgroundColor: "rgba(255,255,255,0.7)",
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 16,
        padding: 20,
        width: "90%",
        marginBottom: 20
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 6,
        fontSize: 14,
        marginBottom: 12,
        borderWidth: 1
    },
    picker: {
        backgroundColor: "#fff",
        borderRadius: 6,
        marginBottom: 12
    },
    button: {
        backgroundColor: "#000",
        padding: 12,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 14
    }
});
