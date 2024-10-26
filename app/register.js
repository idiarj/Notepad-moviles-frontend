import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import register from '../assets/register.jpg';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Link, router } from 'expo-router';
import { fetchsito2 } from '../utils/fetchMethod';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [username, setUsername] = useState('');


    const validarCorreo = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const onRegisterPressed= async () => {
        try {
            if(!nombre || !apellido || !correo || !password || !username){
                setError('Por favor, llena todos los campos');
                return;
            }
            const response = await fetchsito2.post('/user/register', { nombre, apellido, username, correo, password });
            const data = await response.json();
            if(response.ok){
                router.navigate('LoadingScreen', {loadingText: `Espera un momento, ${username}, estamos terminando de registrarte.`, newRoute: 'Login'});
                
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ImageBackground source={register} style={styles.background}>
            <View style={styles.container}>

                <Text style={styles.title}>DAILY DIARIES</Text>
                <Text style={styles.subTitle}>Registro Paso 1</Text>

                <CustomInput
                    value={nombre} 
                    setvalue={setNombre} 
                    placeholder="Nombre" 
                />
                <CustomInput 
                    value={apellido} 
                    setvalue={setApellido} 
                    placeholder="Apellido" 
                />

                <CustomInput
                    value={username} 
                    setvalue={setUsername} 
                    placeholder="Usuario" 
                />  
                <CustomInput
                    value={correo} 
                    setvalue={setCorreo} 
                    placeholder="Correo" 
                />
                {/* {correoError ? <Text style={styles.errorText}>{correoError}</Text> : null} */}
                <CustomInput
                    value={password} 
                    setvalue={setPassword} 
                    placeholder="Contraseña" 
                    secureTextEntry 
                />

                <Text style={styles.errorText}>{Error}</Text>

                <Text style={styles. signInText}>Al registrarte, confirmas que aceptas nuestros términos de uso y política de privacidad.</Text>

                <CustomButton text="Registrarse" onPress={onRegisterPressed}/>

                <Link href="/login" style={styles.signInLink}>Volver al login</Link>
                
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
        alignItems: 'Flex-start',
        borderRadius: 10,
        padding: 20,
        marginTop: -200,
    },
    title: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 30,
        marginTop: 50,
    },
    subTitle: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
 
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Garet',
    },
    errorText: {
        color: 'red',
    },
    signInText: {
        color: 'white',
        marginTop: 3,        
        alignSelf: 'center',
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginLeft: 96,
    }
});

export default Register;