import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.modalView}>
      <View style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          elevation: 5,
          marginHorizontal: 20,
          marginTop: 10
        }}>
        <Text style={{fontSize:18, fontWeight: 'bold'}}>Security Settings</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 40,
          marginTop: 20,
          padding: 10,
        }}
        // onPress={navigation.navigate("ForgotPassword")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
          }}
        >
          Change your Password
        </Text>
        
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 16,
  },
})
