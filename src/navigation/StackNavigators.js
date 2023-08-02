import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import DestinationScreen from '../screens/DestinationScreen';
import ResultsScreen from '../screens/ResultsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import Register from '../screens/authScreens/Register';
import SignInScreen from '../screens/authScreens/SignInScreen';

const Home = createNativeStackNavigator();

export function HomeStack(){
    return (
        
        <Home.Navigator>
                {/* <Home.Screen 
                name = 'Register'
                component = {Register}
                options = {{headerShown:false}}

            /> */}
            <Home.Screen 
                name = 'SignInScreen'
                component = {SignInScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'HomeScreen'
                component = {HomeScreen}
                options = {{headerShown:false}}
            />
                <Home.Screen 
                name = 'RequestScreen'
                component = {RequestScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'DestinationScreen'
                component = {DestinationScreen}
                options = {{headerShown:false}}
            />
            <Home.Screen 
                name = 'ResultsScreen'
                component = {ResultsScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'OrderDetailsScreen'
                component = {OrderDetailsScreen}
                options = {{headerShown:false}}

            />

        </Home.Navigator>
    )
}