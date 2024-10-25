import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/login';
import Register from './app/register';
import ForgotPassword from './app/ForgotPassword'; 
import ResetPassword from './app/resetPassword';
import Notas from './app/notas/index';
import Carpetas from './app/Carpetas/index';
import Favoritos from './app/Favoritos/index';
import Navigation from './navigation';

const Stack = createStackNavigator();

const App = () => {  
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Tus notas" component={Notas} /> {/* Asegúrate de tener una pantalla "Tus notas" */}
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Folders" component={Carpetas} />
          <Stack.Screen name="Favorites" component={Favoritos} />
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
