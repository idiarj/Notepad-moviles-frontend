import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import CustomInput from "../components/Input/CustomInput";
import CustomButton from "../components/Button/CustomButton";
import login from "../assets/login.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSingInPressed() {
    try {
      const response = await fetch("http://192.168.0.103:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Bienvenido", "Inicio de sesión exitoso");
        window.location.href="/notas"
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

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

        <CustomButton text="Acceder" onPress={onSingInPressed} />

        <Text style={styles.ForgotPassword}>
          ¿Olvidaste tu contraseña?{" "}
          <Link href={"/ForgotPassword"} style={styles.signInLink}>
            Ingresa aquí
          </Link>
        </Text>

        <Text style={styles.signInText}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={styles.signInLink}>
            Regístrate aquí
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 20,
    marginTop: -200,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontFamily: "Garet",
    alignSelf: "center",
    marginBottom: 40,
  },
  subTitle: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 15,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  ForgotPassword: {
    color: "white",
    marginTop: 15,
    alignSelf: "left",
  },

  signInText: {
    color: "white",
    marginTop: 10,
    alignSelf: "left",
  },
  signInLink: {
    color: "#2e578c",
    textDecorationLine: "underline",
  },
});

export default Login;
