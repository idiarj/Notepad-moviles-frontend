import fondo2 from '../assets/fondo2.jpg';
import React, { useState, useEffect } from 'react';
import deploy from '../assets/flechaMenu.png';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity, TextInput, Pressable, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Perfil = () => {
  const [nombre, setNombre] = useState('Nombre');
  const [apellido, setApellido] = useState('Apellido');
  const [correo, setCorreo] = useState('correo@ejemplo.com');
  const [username, setUsername] = useState('Usuario');
  const [isEditing, setIsEditing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100)); // valor inicial fuera de pantalla



  useEffect(() => {
    setNombre('Juan');
    setApellido('Pérez');
    setCorreo('juan.perez@ejemplo.com');
    setUsername('juanp');
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", onPress: () => console.log("Sesión cerrada") },
    ]);
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

                <Pressable onPress={toggleMenu} style={styles.deployContainer}>
                    <Image source={deploy} style={styles.deployIcon} />
                </Pressable>

                {menuVisible && (
                    <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }], zIndex: 1000 }]}>
                        {/* <CustomButton
                            onPress={() => Alert.alert('Cerrar sesión')}
                            text="CERRAR SESIÓN"
                            bgColor="#faae97"
                            style={{ opacity: 1 }}
                        /> */}
                         <Link href="/login">
                            <Text style={styles.Cerrar}>Cerrar sesión</Text>
                        </Link>
                        <CustomButton onPress={() => 
                        Alert.alert('Borrar cuenta')}
                         text="BORRAR CUENTA"
                          bgColor="#faae97" />
                        <Link href="/Perfil"><Text style={{ color: '#000', marginTop: 10 }}>Perfil</Text></Link>
                        <Link href="/notas"><Text style={{ color: '#000', marginTop: 10 }}>Inicio</Text></Link>
                    </Animated.View>
                )}

      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <Ionicons name="person-circle-outline" size={100} color="white" style={styles.icon} />

        <View style={styles.infoContainer}>
          <View style={styles.editRow}>
            <Text style={styles.sectionTitle}>Información del Usuario</Text>
            <TouchableOpacity onPress={handleEditToggle}>
              <Ionicons name={isEditing ? "checkmark" : "pencil"} size={24} color="#FAAE97" />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={apellido}
                onChangeText={setApellido}
                placeholder="Apellido"
              />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Usuario"
              />
              <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                placeholder="Correo"
                keyboardType="email-address"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Nombre: <Text style={styles.value}>{nombre}</Text></Text>
              <Text style={styles.label}>Apellido: <Text style={styles.value}>{apellido}</Text></Text>
              <Text style={styles.label}>Usuario: <Text style={styles.value}>{username}</Text></Text>
              <Text style={styles.label}>Correo: <Text style={styles.value}>{correo}</Text></Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle1}>Información</Text>
          <TouchableOpacity style={styles.infoItem}>
            <Ionicons name="information-circle-outline" size={20} color="white" />
            <Text style={styles.infoText}>Acerca de la App</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
          Nuestra aplicación de notas está diseñada para ayudarte a organizar tus pensamientos, tareas y recordatorios de forma sencilla y efectiva. Con una interfaz amigable y opciones de personalización, puedes crear carpetas, agregar notas detalladas, y mantener todo ordenado en un solo lugar. Ya sea para tus ideas diarias, listas de tareas o notas importantes, esta aplicación es tu compañera ideal para mejorar tu productividad y organización.          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  icon: {
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle1: {  
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    },
    
  sectionTitle: {
    fontSize: 18,
    color: '#faae97',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#faae97',
    marginBottom: 10,
  },
  value: {
    fontWeight: 'bold',
    color: '#faae97',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dd',
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 15,
    color: '#faae97',
  },
  section: {
    width: '90%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
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
menu: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: 230,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
},
});

export default Perfil;
