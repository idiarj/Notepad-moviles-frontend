import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/eliminar2.png';
import favNoAdd from '../assets/favSinAgregar.png';
import favAdd from '../assets/favAgregar.png';

export const renderNote = ({ item }) => {
    const [favoriteNotes, setFavoriteNotes] = useState([]); 
    const isFavorite = favoriteNotes.includes(item.id);
    return (
        <View style={styles.note}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
            <Text style={styles.noteCategory}>Categoría: {item.category}</Text>
            <View style={styles.noteActions}>
                <Pressable onPress={() => editNote(item.id)}>
                    <Image source={editIcon} style={styles.icon} />
                </Pressable>
                <Pressable onPress={() => deleteNote(item.id)}>
                    <Image source={deleteIcon} style={styles.icon} />
                </Pressable>
                <Pressable onPress={() => toggleFavorite(item.id)}>
                    <Image source={isFavorite ? favAdd : favNoAdd} style={styles.icon} />
                </Pressable>
            </View>
        </View>
    );
};
