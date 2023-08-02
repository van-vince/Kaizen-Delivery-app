import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { registerRootComponent } from "expo";
import {
  OriginContextProvider,
  DestinationContextProvider,
  TravelTimeContextProvider,
} from "./src/context/contexts";
import SignInScreen from "./src/screens/authScreens/SignInScreen";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// import {useAuthRequest} from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    iosClientId:
      "421493064334-gn43gp39vlara8q1f5nuqlb5agj2had8.apps.googleusercontent.com",
    androidClientId:
      "421493064334-1ucrk45siptq302fhdqivm7p8jblf4m5.apps.googleusercontent.com",
    expoClientId:
      "421493064334-u99vjrjpuanm92ohpepm884kvbtn2hu5.apps.googleusercontent.com",

  });
  // console.log(promptAsync())

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response?.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // console.log(promptAsync())

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);

  if (loading)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );

  return userInfo ? (
    <DestinationContextProvider>
      <OriginContextProvider>
        <TravelTimeContextProvider>
          <RootNavigator />
        </TravelTimeContextProvider>
      </OriginContextProvider>
    </DestinationContextProvider>
  ) : (
    <SignInScreen promptAsync={promptAsync}/>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


//"googleApikey": "AIzaSyCfARqjJgmhmIp2XDWlYnvv63x0rxvLFsA"

// "permissions": [
//   "ACCESS_COARSE_LOCATION",
//   "ACCESS_FINE_LOCATION",
//   "FOREGROUND_SERVICE"
// ]