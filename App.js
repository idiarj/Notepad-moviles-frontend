import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/login/login';
import Register from './app/register/register';
import ForgotPassword from './app/ForgotPassword/ForgotPassword'; 
import ResetPassword from './app/resetPassword';
import Notas from './app/notas/index';
import Carpetas from './app/Carpetas';
import Favoritos from './app/Favoritos/favoritos';
import Perfil from './app/Perfil';

const Stack = createStackNavigator();

const App = () => {  
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="notas" component={Notas} /> {/* Asegúrate de tener una pantalla "notas" */}
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Folders" component={Carpetas} />
          <Stack.Screen name="Favorites" component={Favoritos} />
          <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;