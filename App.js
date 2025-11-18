// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SessionListScreen from './screens/SessionListScreen';
import ConsentScreen from './screens/ConsentScreen';
import SessionPlayerScreen from './screens/SessionPlayerScreen';
import JournalScreen from './screens/JournalScreen';
import ReflectionScreen from './screens/ReflectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sessions" component={SessionListScreen} />
        <Stack.Screen name="Consent" component={ConsentScreen} />
        <Stack.Screen name="Session" component={SessionPlayerScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Reflection" component={ReflectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}