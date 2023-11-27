import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/contexts";
import { Icon } from "@rneui/themed";
import { colors } from "../../global/styles";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;

const Profile = () => {
  const { userInfo } = useContext(AuthContext);
  const customer = userInfo?.customer;

  const id = customer._id

  console.log(id);

  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: customer.name,
      contact: customer.contact,
      email: customer.email,
      location: customer.location,
    },
  });

  const apiUrl = 'https://knowing-muskrat-cleanly.ngrok-free.app'

  const onSubmit = async(data) => {
    await axios
    .patch(`${apiUrl}/customers/:${id}`, {
      data
    })
    .then(async (res) => {
      console.log(res.data);
      if(res?.data.success ===true){
        Alert.alert(res.data.message)
      }else{
          Alert.alert(res.data?.message)
      }
    })
    .catch((err) => {
      Alert.alert(err);
    });
}

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Profile editing exited");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 30,
                  }}
                >
                  <Text style={styles.modalText}>Edit your profile</Text>
                  <Icon
                    onPress={() => setModalVisible(!modalVisible)}
                    type="material-community"
                    name="close"
                    color={colors.black}
                    size={25}
                  />
                </View>

                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    // source={require("../../../assets/blankProfilePic.jpg")}
                    source={{ uri: `${customer.image}` }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      marginBottom: 10,
                    }}
                  />
                </View>

                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                      username is required.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Contact"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType="phone-pad"
                      />
                    )}
                    name="contact"
                  />
                  {errors.contact && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                      Contact is required.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                      Email is required.
                    </Text>
                  )}
                </View>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Location"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                    name="location"
                  />
                  {errors.location && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                      Location is required.
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.textStyle}>Save </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            // source={require("../../../assets/blankProfilePic.jpg")}
            source={{ uri: `${customer.image}` }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
        </View>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 5,
          }}
        >
          Username
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 5,
          }}
        >
          {customer.name}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 5,
          }}
        >
          Contact
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 5,
          }}
        >
          {customer.contact}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 5,
          }}
        >
          Email
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 5,
          }}
        >
          {customer.email}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 5,
          }}
        >
          Location
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 5,
          }}
        >
          {customer?.location}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
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
        >
          <Icon
            type="material-community"
            name="update"
            color={colors.white}
            size={32}
          />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              marginLeft: 10,
            }}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    // margin: 20,
    width: windowWidth - 30,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#00cc00",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 20,
  },
  textInput: {
    height: 50,
    color: "#5d5d5d",
    fontSize: 16,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 3,
    padding: 10,
  },
});
