import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/authScreens/Register";
import SignInScreen from "../screens/authScreens/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPassword from "../screens/authScreens/forgotPassword";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
