import React, { useState } from "react";
import {StyleSheet, Text, ScrollView, View, ImageBackground} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import register from "./assets/fondo2.jpg";
import { Link } from "expo-router";

const ForgotPassword = () => {
    const [question, setQuestion] = useState("");
    const [anwser, setAnwser] = useState("");

    const onSendPressed = () => {
        console.log("Send pressed");
    };

    return (
        <ImageBackground source={register} style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>DAILY DIARIES</Text>
                    <Text style={styles.subTitle1}>Registro Paso 2</Text>

                    <Text style={styles.subTitle}>Para terminar el proceso de registro ingrese una pregunta y respuesta en caso de perdida para recuperar la contraseña</Text>
                   <View style={{...styles.container, width: "100%"}}>
                    <CustomInput
                        placeholder="Ingrese la pregunta"
                        value={question}
                        setvalue={setQuestion}
                        style={styles.input}
                    />
                    <CustomInput
                        placeholder="Ingrese la respuesta"
                        value={anwser}
                        setvalue={setAnwser}
                        style={styles.input}
                    />                  

                    <CustomButton text="Enviar" onPress={onSendPressed} />
                    </View>

                    <Link href="/login" style={styles.signInLink}>Volver al login</Link>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: 'Garet',
        marginBottom: 40,
        marginTop: 50,
    },
    subTitle: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        padding: 20,
    },
    container: {
        justifyContent: 'center',
        padding: 1,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    subTitle1: {
        color: 'white',
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    input: {
        height: 40, // Fija la altura del input
        width: '100%', // Fija el ancho del input
        marginBottom: 10,
        maxHeight: 40, // Asegura que la altura máxima sea 40
        overflow: 'hidden', // Oculta el contenido que exceda la altura
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginLeft: 142,  
    },
});

export default ForgotPassword;