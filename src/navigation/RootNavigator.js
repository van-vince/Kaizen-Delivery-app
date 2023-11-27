import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/contexts";
import { AuthStack } from "./AuthStack";


export default function RootNavigator() {
  
    const {isLoading, userToken} = useContext(AuthContext)

    if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <NavigationContainer>
      {userToken ? <DrawerNavigator /> : <AuthStack />}
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}
