import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CuctomButton";
import InputField from "../../components/InputField";
import { parameters } from "../../global/styles";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext} from "../../context/contexts";

const SignInScreen = ({navigation}) => {
  
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)



  return (
    <SafeAreaView
      style={{
        flex: 1,  
        justifyContent: "center",
        paddingTop: parameters.statusBarHeight,
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>

        <InputField
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => navigation.navigate('ForgotPassword')}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <CustomButton onPress={()=> login(email, password)} label={"Sign In"} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Dont have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
};

export default SignInScreen;

{
  /* <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            color: 'gray',
            marginBottom: 30,
            textAlign: 'center'
          }}>
          OR
        </Text> */
}
{
  /* <TouchableOpacity
        style={{
          backgroundColor: "#4285F4",
          padding: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          marginTop: 10,
          // marginBottom: 150,
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" style={{marginRight:20}}/>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
          Sign In with Google
        </Text>
      </TouchableOpacity> */
}
