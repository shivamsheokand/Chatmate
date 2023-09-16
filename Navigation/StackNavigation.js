import * as React from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Start from '../screens/start';
import LockScreen from '../screens/LockScreen';
import Singup from '../screens/Singup';
import Home from '../screens/Home';
const Stack = createNativeStackNavigator();
const StactNavi = () => {
    const [loaded] = useFonts({
        Pattaya: require('../assets/fonts/Pattaya/Pattaya-Regular.ttf'),
    })
    if (!loaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Start" component={Start} options={{
                    title: 'Welcome To ChatMate...',
                    headerStyle: {
                        backgroundColor: "#0e0703"
                    },
                    // headerShown:false,
                    headerTintColor: 'orange',
                    headerTitleStyle: {
                        color: 'orange',
                        fontFamily: 'Pattaya',
                        fontSize: 15
                    },
                }} />
                <Stack.Screen name="LockScreen" component={LockScreen} options={{
                    title: 'Login...',
                    headerStyle: {
                        backgroundColor: "#0e0703"
                    },
                    headerShown: false,
                    headerTintColor: 'orange',
                    headerTitleStyle: {
                        color: 'orange',
                        fontFamily: 'Pattaya',
                        fontSize: 15
                    }
                }} />
                <Stack.Screen name="Singup" component={Singup} options={{
                    title: 'Sing Up...',
                    headerStyle: {
                        backgroundColor: "#0e0703"
                    },
                    headerShown: false,
                    headerTintColor: 'orange',
                    headerTitleStyle: {
                        color: 'orange',
                        fontFamily: 'Pattaya',
                        fontSize: 15,
                    }
                }} />
                <Stack.Screen name="Home" component={Home} options={{
                    title: 'Welcome To ChatMate...',
                    headerStyle: {
                        backgroundColor: "#0e0703"
                    },
                    headerShown: false,
                    headerTintColor: 'orange',
                    headerTitleStyle: {
                        color: 'orange',
                        fontFamily: 'Pattaya',
                        fontSize: 15
                    },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StactNavi;