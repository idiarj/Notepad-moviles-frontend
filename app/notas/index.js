import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert, Image, TextInput, Modal, Animated, Easing, StyleSheet } from 'react-native';
// import { notesData } from '../../data/folder/dataTesting';
import CustomButton from '../../components/CustomButton';
import deploy from '../../assets/flechaMenu.png';
import addIcon from '../../assets/agregar.png';
import fileIcon from '../../assets/file.png';
import folderIcon from '../../assets/folderb.png';
import favoriteIcon from '../../assets/star.png';
import editIcon from '../../assets/lapiz.png';
import deleteIcon from '../../assets/eliminar2.png';
import favNoAdd from '../../assets/favSinAgregar.png';
import favAdd from '../../assets/favAgregar.png';
import fondo2 from '../../assets/fondo2.jpg';
import { Link } from 'expo-router';
import {fetchsito1} from '../../utils/fetchMethod';
import { useNavigation } from '@react-navigation/native';



import { Picker } from '@react-native-picker/picker';

const Notas = () => {
    const navigation = useNavigation();
    const handleLogout = async ()=>{
        try{
            const response = await fetchsito1.post('/user/logout');
            if(response.ok){
                console.log('fetch ok')
                navigation.navigate('LoadingScreen', {loadingText: 'Cerrando sesión', newRoute: 'login'});
            }else{
                console.log('fetch no ok')
            }
        }catch(error){
            console.error(error);
        }
    }
    const [favoriteNotes, setFavoriteNotes] = useState([]); 
    const [notes, setNotes] = useState( []);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteCategory, setNewNoteCategory] = useState('neutral');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [reload, setReload] = useState(false);

    const getNotes = async () => {
        try{
            const response = await fetchsito1.get('/notes/getNotes');
            const data = await response.json();
            if(response.ok){
                setNotes(data.notas);
                // setReload(!reload)
                
            }
            console.log(notes)
        }catch(error){
            console.error(error);
        }
    }
    
    useEffect( () => {
        const fetchNotes = async ()=>{
            await getNotes();
        }
        fetchNotes();
    }, [reload])

    const slideAnim = useRef(new Animated.Value(-100)).current;

    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
    };



    const editNote = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setNewNoteTitle(noteToEdit.title);
            setNewNoteText(noteToEdit.text);
            setNewNoteCategory(noteToEdit.category);
            setEditingNoteId(id);
            setModalVisible(true);
        }
    };

    const addOrEditNote = () => {
        if (newNoteTitle.trim() && newNoteText.trim()) {
            if (editingNoteId) {
                setNotes((prevNotes) =>
                    prevNotes.map(note =>
                        note.id === editingNoteId
                            ? { ...note, title: newNoteTitle, text: newNoteText, category: newNoteCategory }
                            : note
                    )
                );
            } else {
                const newNote = {
                    title: newNoteTitle,
                    text: newNoteText,
                    category: newNoteCategory,
                };
                setNotes((prevNotes) => [...prevNotes, newNote]);
            }
            setNewNoteTitle('');
            setNewNoteText('');
            setNewNoteCategory('neutral');
            setEditingNoteId(null);
            setModalVisible(false);
        } else {
            Alert.alert('Error', 'Por favor ingresa título y contenido para la nota.');
        }
    };

    const toggleFavorite = (id) => {
        setFavoriteNotes((prevFavs) => {
            if (prevFavs.includes(id)) {
                return prevFavs.filter(noteId => noteId !== id);
            } else {
                return [...prevFavs, id];
            }
        });
    };

    const renderNote = ({ item }) => {
        console.log(item)
        // const isFavorite = favoriteNotes.includes(item.id);
        const isFavorite = item.favorito;
        return (
            <View style={styles.note}>
                <Text style={styles.noteTitle}>{item.titu_nota}</Text>
                <Text style={styles.noteText}>{item.conte_nota}</Text>
                <Text style={styles.noteCategory}>Categoría: {item.categoria}</Text>
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

    const toggleMenu = () => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? -100 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setMenuVisible(!menuVisible);
    };

    return (
        <ImageBackground source={fondo2} style={styles.background}>
            <View style={styles.container}>
                <Pressable onPress={toggleMenu} style={styles.deployContainer}>
                    <Image source={deploy} style={styles.deployIcon} />
                </Pressable>

                {menuVisible && (
                    <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }], zIndex: 1000 }]}>
                        {/* <Link href="/login">
                        <View style={[styles.menuItem, { marginBottom: -10 }]}>
                        <Text style={styles.menuButtonText}>Cerrar sesión</Text>
                            </View>
                        </Link> */}

                        <CustomButton 
                            onPress={()=> handleLogout()} 
                            text="Cerrar Sesion" 
                            bgColor="transparent" 
                            fgColor="#faae97" 
                        />

                        <CustomButton 
                            onPress={() => Alert.alert('Borrar cuenta')} 
                            text="Borrar cuenta" 
                            bgColor="transparent" 
                            fgColor="#faae97" 
                        />

                        <Link href="/Perfil">
                            <View style={[styles.menuItem, { marginBottom: 10 }]}>
                                <Text style={styles.menuButtonText}>Perfil</Text>
                            </View>
                        </Link>

                        {/* <Link href="/notas">
                            <View style={styles.menuItem}>
                                <Text style={styles.menuButtonText}>Inicio</Text>
                            </View>
                        </Link> */}
                    </Animated.View>
                )}

                <Text style={styles.title}>BIENVENIDO A TUS NOTAS</Text>

                {notes.length > 0 ? (
                    <FlatList
                        data={notes}
                        renderItem={renderNote}
                        keyExtractor={item => item.id}
                        style={styles.noteList}
                    />
                ) : (
                    <Text style={styles.noNotesText}>No tienes notas aún. ¡Agrega una!</Text>
                )}

                <Text style={styles.fixedDailyDiaries}>DAILY DIARIES</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.fullScreenModalContainer}>
                    <View style={styles.fullScreenModalView}>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.customButton}
                                onPress={addOrEditNote}
                            >
                                <Text style={styles.customButtonText}>Guardar</Text>
                            </Pressable>
                            <Pressable
                                style={styles.customButton1}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.customButtonText}>❌</Text>
                            </Pressable>
                        </View>
                        <TextInput
                            style={styles.customTitleInputFullScreen}
                            placeholder="Título de la nota"
                            value={newNoteTitle}
                            onChangeText={setNewNoteTitle}
                        />
                        <TextInput
                            style={styles.customDescriptionInputFullScreen}
                            placeholder="Descripción"
                            value={newNoteText}
                            onChangeText={setNewNoteText}
                            multiline={true}
                        />

                        <Picker
                            selectedValue={newNoteCategory} 
                            style={{ height: 50, width: '100%', color: 'white' }}
                            onValueChange={(itemValue) => setNewNoteCategory(itemValue)}
                        >
                            <Picker.Item label="Relevante" value="relevante" />
                            <Picker.Item label="Neutral" value="neutral" />
                            <Picker.Item label="Irrelevante" value="irrelevante" />
                        </Picker>

                    </View>
                </View>
            </Modal>

            <View style={styles.navbar}>
                <Link href="/notas">
                    <Image source={fileIcon} style={styles.navIcon1} />
                </Link>

                <Link href="/Carpetas">
                    <Image source={folderIcon} style={styles.navIcon} />
                </Link>

                <Link href="/Favoritos">
                        <Image source={favoriteIcon} style={styles.navIcon2} />
                </Link>
                    
                <Pressable onPress={() => setModalVisible(true)} style={styles.addButton}>
                    <Image source={addIcon} style={styles.addIcon} />
                </Pressable>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 30, 
        marginTop: 100,
    },
    noNotesText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 60,
        textAlign: 'center',
        marginTop: 5,
    },
    noteList: {
        flex: 1,
        width: '100%',
    },
    note: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 20,
        color: 'white',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    noteCategory: {
        color: 'white', 
        fontSize: 14,
        marginVertical: 5, 
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    noteText: {
        fontSize: 16,
        maxWidth: '60%',
        color: 'white',
    },
    noteActions: {
        flexDirection: 'row',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    fixedDailyDiaries: {
        position: 'absolute',
        bottom: 200, 
        marginTop: 20,
        color: 'white',
        fontFamily: 'Garet',
        fontSize: 35,
        opacity: 0.3,
    },
  
    addButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
    },
    addIcon: {
        width: 40,
        height: 40,
    },
    deployContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    deployIcon: {
        width: 40,
        height: 40,
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 80,
        padding: 20,
        backgroundColor: '#ffc9b9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navIcon: {
        width: 50,
        height: 50,
    },

    navIcon1: {
        width: 50,
        height: 50,
        left: 0,
    },

    navIcon2: {
        width: 50,
        height: 50,
        left: 0,
    },

    // Modal actualizado para cubrir más de la pantalla
    fullScreenModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    },
    fullScreenModalView: {
        height: '86%',  // Ocupa el 95% de la pantalla
        width: '95%',   // Ancho casi total de la pantalla
        backgroundColor: '#FFCFC7', // Color suave como en la imagen
        borderRadius: 20,
        padding: 30,
        justifyContent: 'center',
    },
    customTitleInputFullScreen: {
        width: '100%',
        fontSize: 24, // Título más grande
        color: 'white',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 20,
        padding: 10,
    },
    customDescriptionInputFullScreen: {
        width: '100%',
        height: '55%', // Aumentamos la altura para más espacio de texto
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 10,
        marginBottom: -15,
        fontSize: 18, // Texto de descripción más grande
    },
    customButton: {
        backgroundColor: '#faae97', 
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 50,
    },

    customButton1: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 50,
    },

    customButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Garet',
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        marginTop: -130,
        marginBottom: 20,
        marginLeft: 130,
    },
    menu: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: 230,
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        alignItems: 'center', // Para centrar el contenido dentro del menú
    },
    menuItem: {
        alignItems: 'center',  // Centra cada elemento individualmente
        marginBottom: 10,      // Margen para separación vertical
    },
    menuButtonText: {
        color: '#faae97',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Notas;
