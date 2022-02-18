import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator  
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='forget' component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}