import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import register from '../assets/register.jpg';
import {router} from 'expo-router';

const LoadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { loadingText, newRoute } = route.params;
    console.log(loadingText, newRoute);
    console.log(newRoute)
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace(newRoute);
        }, 1000); // Espera 3 segundos antes de redirigir

        return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte
    }, [navigation, newRoute]);

    return (
        <ImageBackground source={register} style={styles.background}>
        <View style={styles.container}>
            {/* <Text style={styles.loadingText}>Pantalla de Carga</Text> */}
            <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Asegúrate de que el texto esté centrado
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default LoadingScreen;