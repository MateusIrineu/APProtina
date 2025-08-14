import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from 'react-native-gesture-handler';

export default function Task({ text, completed, onToggle, onDelete }) {
    const renderRightActions = () => (
        <Pressable onPress={onDelete} style={styles.deleteSwipeBtn}>
            <Ionicons name="trash" size={24} color="#fff" />
            <Text style={styles.colorDelete}>Deletar</Text>
        </Pressable>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.rowContainer}>
                <Pressable style={styles.deleteBtn} onPress={onToggle}>
                    <Ionicons name="checkmark-circle" size={20} color={completed ? 'green' : 'red'} />
                </Pressable>

                <Text style={[{ flex: 1}, completed ]}>
                    {text}
                </Text>

            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
    },
    deleteBtn: {
        padding: 15,
        borderRadius: 8,

    },
    colorDelete:{
        color: 'white'
    },
    deleteSwipeBtn: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e53935',
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 8,
        justifyContent: 'center',
    },
});