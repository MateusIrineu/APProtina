import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"

export default function Task({ text, completed, onToggle, onDelete }) {
    return (
        <View style={styles.rowContainer}>
            <Pressable onPress={onToggle}>
                <Ionicons name="checkmark-circle" size={32} color={completed ? 'green' : 'red'} />
            </Pressable>

            <Text style={[{ flex: 1 }, completed ]}>
                {text}
            </Text>

            <Pressable onPress={onDelete} style={styles.deleteBtn}>
                <Ionicons name="trash" size={24} color="#e53935" />
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    deleteBtn: {
        padding: 6,
        borderRadius: 8,
    },
})