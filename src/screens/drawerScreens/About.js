import { View, Text, StyleSheet } from "react-native";
import React from "react";

const About = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.modalView}>
      <View style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          elevation: 5,
          marginHorizontal: 20,
          marginTop: 10
        }}>
        <Text style={{fontSize:18, fontWeight: 'bold'}}>About Us</Text>
      </View>
        <Text style={{fontSize: 16, paddingHorizontal: 10,}}>
        Kaizen Deliveries is a dynamic and customer-centric delivery company 
        committed to providing fast, reliable, and hassle-free courier services. 
        Established with a passion for efficient logistics, we take pride in our 
        ability to seamlessly connect businesses and individuals with their goods, 
        ensuring a swift and secure journey from sender to recipient
        </Text>
      </View>
    </View>
  );
};

export default About;

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
});
