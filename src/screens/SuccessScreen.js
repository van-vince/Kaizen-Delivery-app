import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";

const SuccessScreen = ({ navigation , route}) => {

  const {success} = route.params
  const succ = success
  console.log(succ)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontWeight: "bold",
          margin: 10,
          textAlign: 'center'
        }}
      >
        Congratulations! You have successfully placed an order
      </Text>
      <Text style={{fontSize: 16, margin: 20,}}>You can check your order status at:</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Orders");
          }}
          style={{ backgroundColor: "orange", padding: 10, borderRadius: 5, width: 200}}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
            Orders
          </Text>
        </TouchableOpacity>
        <Text
        style={{
          fontWeight: "bold",
          margin: 10,
          textAlign: 'center'
        }}
      >
        OR
      </Text>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          style={{ backgroundColor: "orange", padding: 10, borderRadius: 5, width: 200}}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({});
