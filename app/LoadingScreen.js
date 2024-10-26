import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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
        }, 3000); // Espera 3 segundos antes de redirigir

        return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte
    }, [navigation, newRoute]);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.loadingText}>Pantalla de Carga</Text> */}
            <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Puedes ajustar el color de fondo si lo deseas
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Asegúrate de que el texto esté centrado
    },
});


export default LoadingScreen;