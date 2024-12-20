import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, ImageBackground} from "react-native";
import CustomButton from '../components/CustomButton'; 
import CustomInput from '../components/CustomInput';  
import register from '../assets/register.jpg';
import { Link } from 'expo-router';

const ResetPassword = () => {
    const [code, setCode] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const onSubmitPressed = () => {
        console.log("Send pressed");
    };



    return (
        <ImageBackground source={register} style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>DAILY DIARIES</Text>
                    <Text style={styles.subTitle}>Cambio de Contraseña</Text>
                   <View style={{...styles.container, width: "100%"}}>
                    <CustomInput
                        placeholder="Ingrese la respuesta de recuperación"
                        value={code}
                        setvalue={setCode}
                    />

                    <CustomInput
                        placeholder="Nueva Contraseña"
                        value={newPassword}
                        setvalue={setnewPassword}
                    />      

                    <CustomButton text="Enviar" onPress={onSubmitPressed} />

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
        fontSize: 25,
        marginBottom: 20,
        marginLeft: 15,
    },
    container: {
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        width:200,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    signInLink: {
        color: 'white',
        textDecorationLine: 'underline',
        marginLeft: 125,  
    },
});


export default ResetPassword;