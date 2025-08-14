import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

export default function Task({ text, completed, onToggle, onDelete, category, time }) {
    const confirmDelete = () => {
        Alert.alert(
            "Excluir tarefa",
            `Tem certeza que deseja excluir "${text}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: onDelete, style: "destructive" }
            ]
        );
    };

    const renderRightActions = () => (
        <Pressable onPress={confirmDelete} style={styles.deleteSwipeBtn}>
            <Ionicons name="trash" size={24} color="#fff" />
           
        </Pressable>
    );

    const categoryIcons = {
        Alimentação: "food",
        Lazer: "party-popper",
        Exercício: "dumbbell",
        Estudo: "book-open-page-variant",
        Trabalho: "briefcase"
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.card}>
                {/* Ícone e Categoria */}
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons
                        name={categoryIcons[category] || "tag"}
                        size={24}
                        color="#000"
                    />
                    <View style={{ marginLeft: 6 }}>
                        <Text style={styles.dateText}>Sunday 17/11</Text>
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                </View>

                {/* Título */}
                <Text style={styles.taskTitle}>{text}</Text>

                {/* Rodapé */}
                <View style={styles.footer}>
                    <Pressable onPress={onToggle} style={styles.circleBtn}>
                        <Ionicons
                            name={completed ? "checkmark-circle" : "ellipse-outline"}
                            size={24}
                            color={completed ? "#DC385A" : "#000"}
                        />
                        <Text style={[styles.footerText, completed && { color: "#DC385A" }]}>
                            Concluir
                        </Text>
                    </Pressable>

                    <Text style={styles.timeText}>{time}</Text>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginVertical: 8,
        borderWidth: 2,
        borderColor: "#000"
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4
    },
    dateText: {
        fontSize: 10,
        color: "#DC385A",
        fontWeight: "bold"
    },
    categoryText: {
        fontSize: 12,
        color: "#DC385A",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    taskTitle: {
        fontSize: 14,
        marginVertical: 8
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circleBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    footerText: {
        fontSize: 12
    },
    timeText: {
        fontSize: 12,
        color: "#000"
    },
    deleteSwipeBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e53935",
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 8,
        justifyContent: "center"
    },
    colorDelete: {
        color: "white",
        marginLeft: 6
    }
});
