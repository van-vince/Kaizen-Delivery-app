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

const ForgotPassword = ({navigation}) => { 

  const {forgotPassword} = useContext(AuthContext)

  const [email, setEmail] = useState(null)

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
            fontSize: 24,
            fontWeight: "500",
            color: "#333",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Forgor Your password?
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
        <CustomButton onPress={()=> forgotPassword(email)} label={"Send Reset Instructions"} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{ color: "#AD40AF", fontWeight: "500",  }}>
              {" "}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
};

export default ForgotPassword;


