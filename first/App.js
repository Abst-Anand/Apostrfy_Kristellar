import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/AuthScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ForgetPasswordScreen from './components/ForgetPasswordScreen';
import ChangePassword from './components/ChangePassword';
// import CameraScreen from './components/CameraScreen';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        {/* <Stack.Screen name="CameraScreen" component={CameraScreen}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
