import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { registerRootComponent } from "expo";
import {
  OriginContextProvider,
  DestinationContextProvider,
  TravelTimeContextProvider,
  AuthProvider,
  OrderContextProvider,
  ChargeContextProvider,
} from "./src/context/contexts";
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();

export default function App() {

  return  ( 
    <AuthProvider >
    <OrderContextProvider>
    <ChargeContextProvider>
    <DestinationContextProvider>
      <OriginContextProvider>
        <TravelTimeContextProvider>  
          <RootNavigator />
        </TravelTimeContextProvider>
      </OriginContextProvider>
    </DestinationContextProvider>
    </ChargeContextProvider>
    </OrderContextProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

