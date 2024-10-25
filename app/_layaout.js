import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Register from './register';
import ForgotPassword from './ForgotPassword'; 
import ResetPassword from './resetPassword';
import Notas from './notas/index';
import Carpetas from './Carpetas/index';
import Favoritos from './Favoritos/index';
//import Navigation from './navigation';

const Stack = createStackNavigator();

const App = () => {  
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="notas" component={Notas} /> {/* Asegúrate de tener una pantalla "Tus notas" */}
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
