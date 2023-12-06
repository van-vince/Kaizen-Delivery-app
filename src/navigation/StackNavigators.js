import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import DestinationScreen from '../screens/DestinationScreen';
import ResultScreen from '../screens/ResultScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import Register from '../screens/authScreens/Register';
import SignInScreen from '../screens/authScreens/SignInScreen';
import DetailsScreen from '../screens/drawerScreens/DetailsScreen';
import { title } from '../global/styles';
import SuccessScreen from '../screens/SuccessScreen';

const Home = createNativeStackNavigator();

export function HomeStack({navigation}){
    return (
        <Home.Navigator>
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
                name = 'ResultScreen'
                component = {ResultScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'OrderDetailsScreen'
                component = {OrderDetailsScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'DetailsScreen'
                component = {DetailsScreen}
                options = {{headerShown:false}}

            />
            <Home.Screen 
                name = 'SuccessScreen'
                component = {SuccessScreen}
                options = {{headerShown:false}}

            />

        </Home.Navigator>
    )
}