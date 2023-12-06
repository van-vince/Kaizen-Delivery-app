import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";

const SuccessScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Congratulation! You have successfully placed an order</Text>
      <Text>You check your order status at:</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Orders");
          }}
          style={{ backgroundColor: "orange", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
            Orders
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({});
