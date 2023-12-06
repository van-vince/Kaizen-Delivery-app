import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Icon } from "@rneui/themed";
import { colors } from "../../global/styles";

const Support = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.modalView}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          elevation: 5,
          marginHorizontal: 20,
          marginTop: 10
        }}
      >
        <Text style={{fontSize:18, fontWeight: 'bold'}}>Do you need any Assistance?</Text>
      </View>

      <TouchableOpacity
       onPress={() => Linking.openURL('mailto:support@example.com') }
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 30,
          marginHorizontal: 40,
          backgroundColor: colors.orange,
          padding: 10,
          borderRadius:10,

        }}
      >
        <Text style={{color: colors.white}}>Email Us</Text>
        <Icon
          type="material-community"
          name="email"
          color={colors.white}
          size={32}
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 5,
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
