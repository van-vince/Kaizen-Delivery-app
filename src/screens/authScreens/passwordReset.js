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

const PasswordReset = ({navigation}) => {

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
         Reset Your Password
        </Text>

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
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <InputField
          label={"Confirm Password"}
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
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <CustomButton onPress={()=> login(email, password)} label={"Sign In"} />
      </View>
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
};

export default PasswordReset;


