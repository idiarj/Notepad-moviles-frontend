import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';  
import CustomButton from '../components/CustomButton'; 
import login from '../assets/login.jpg'; 
import { Link, router, useNavigation } from 'expo-router'; // Asegúrate de importar useNavigation desde expo-router
import { fetchsito } from '../utils/fetchMethod';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function onSingInPressed() {
        try {
            console.log('hare el fetch');
            console.log(username);
            console.log(password);
            const response = await fetch('https://notepad-moviles-backend.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                credentials: 'include'
            });

            console.log('fetch hecho');
            const data = await response.json();
            console.log(response);
            if (response.ok) {
                console.log('ahora deberia llevarte a notaas');
                //navigation.navigate('notas'); // Navega a la pantalla "notas"
                console.log(data);
            } else {
                console.log(data);
            }
            router.replace('notas');
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ImageBackground source={login} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>DAILY DIARIES</Text>
                <Text style={styles.subTitle}>Iniciar sesión</Text>
                <CustomInput
                    value={username}
                    setvalue={setUsername}
                    placeholder="Correo"
                />
                <CustomInput
                    value={password}
                    setvalue={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <CustomButton 
                    text="Acceder"
                    onPress={onSingInPressed}
                    style={{ marginLeft: 100 }}  // Asegúrate de que este estilo sea válido
                />
                <Link href="/ForgotPassword">
                    <Text style={styles.ForgotPassword}>
                        ¿Olvidaste tu contraseña? <Text style={styles.signInLink}>Ingresa aquí</Text>
                    </Text>
                </Link>
                <Link href="/register">
                    <Text style={styles.signInText}> 
                        ¿No tienes cuenta? <Text style={styles.signInLink}>Regístrate aquí</Text>
                    </Text>
                </Link>
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
        width: '80%',
        alignItems: 'flex-start',
        borderRadius: 10,
        padding: 20,
        marginTop: -200,
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'Garet',
        alignSelf: 'center',
        marginBottom: 40,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

    ForgotPassword: {
        color: 'white',
        marginTop: 15,
        alignSelf: 'left',
    },

    signInText: {
        color: 'white',
        marginTop: 10,
        alignSelf: 'left',
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginLeft: 96,    
    },
});

export default Login;