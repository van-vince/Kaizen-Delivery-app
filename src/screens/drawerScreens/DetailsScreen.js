import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/contexts";
import { Icon } from "@rneui/themed";
import { colors, parameters } from "../../global/styles";
import { Modal } from "react-native";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const { orders } = useContext(OrderContext);
  const order = orders.orders;
  // console.log(order)

  const data = order?.find((e) => e._id === id);
  // console.log(data);

  const [isOpen, setIsOpen] = useState(false);

  dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const date = new Date(data.updatedAt);

  const pending = data?.status.text === "Pending";
  const assigned = data?.status.text === "Assigned";
  const delivered = data?.status.text === "Delivered";
  const cancelled = data?.status.text === "Cancelled";

  const [menuOpen, setMenuOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMutate = async() => {
    const events = {id: 5, text: 'Cancelled'}
    setIsLoading(true);
    await axios
    .patch(`${apiUrl}/orders/${id}`, {
      events
    })
    .then(async (res) => {
      console.log(res.data);
      if(res?.data.success ===true){
        Alert.alert(res.data.message)
      }else{
        Alert.alert(res.data?.message)
      }
      navigation.navigate("HomeScreen")
    })
    .catch((err) => {
      alert(err);
    });
    setIsLoading(false);
  }

  if (isLoading)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.view1, styles.elevation]}>
        <Icon
          type="material-community"
          name="arrow-left"
          // color={colors.grey1}
          size={32}
          onPress={() => navigation.navigate("Orders")}
        />
        <Text style={{ marginLeft: 20, fontSize: 20 }}> Order Details</Text>
      </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}
          >
            <View style={{top: 60, left: 20}}>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 30,
                  }}
                >
                  <Text style={styles.modalText}>Are you sure you want to cancel this order?</Text>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <TouchableOpacity
                  style={{backgroundColor:'#0aada8', padding: 5, width: 60, borderRadius: 5, alignItems: 'center'}}
                  onPress={() => {handleMutate(); setModalVisible(!modalVisible)}}
                >
                  <Text style={{color: 'white'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor: colors.grey3, padding: 5, width: 60, borderRadius: 5, alignItems: 'center'}}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{color: 'white'}}>No</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
          borderBottomWidth: 0.3,
          borderBottomColor: "gray",
          marginHorizontal: 10,
          gap: 2,
        }}
      >
        <View
          style={[
            pending
              ? styles.view2
              : assigned
              ? styles.view3
              : delivered
              ? styles.view4
              : styles.view5,
          ]}
        >
          <Icon
            type="material-community"
            name="check-underline"
            color={colors.white}
            size={32}
          />
        </View>
        <View style={{}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              // numberOfLines={1}
              style={{
                color: "#333",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Status:
            </Text>
            <Text
              style={[
                pending
                  ? styles.view6
                  : assigned
                  ? styles.view7
                  : delivered
                  ? styles.view8
                  : styles.view9,
              ]}
            >
              {data?.status.text}
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 30,
                backgroundColor: colors.grey10,
                borderRadius: 50,
                padding: 5,
              }}
              onPress={() => (menuOpen ? setMenuOpen(false) : setMenuOpen(true))}
            >
              <Icon
                type="material-community"
                name="dots-vertical"
                color={colors.black}
                size={32}
              />
            </TouchableOpacity>
            {menuOpen &&
            <View
              style={{
                zIndex: 9999,
                padding: 5,
                elevation: 20,
                position: "absolute",
                right: 15,
                top: 45,
                backgroundColor: 'red',
                borderRadius: 5
              }}
            >
              <Button 
              title='Cancel Order'
              color= 'red'
              disabled={delivered || cancelled}
              onPress={() => {setModalVisible(true) ; setMenuOpen(false)}}
              />
            </View>
            }
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#333",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Date:
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 14,
                fontWeight: 400,
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              {date.toUTCString().substring(0, 22)}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 44,
          width: "90%",
          backgroundColor: "00000",
          borderRadius: 10,
          borderColor: "#AD40AF",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          style={{
            flex: 1,
            backgroundColor: '#0aada8',
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            zIndex: -1,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              marginRight: 10,
            }}
          >
            Courier Details
          </Text>
          <Icon
            type="material-community"
            name="chevron-down"
            color={colors.white}
            size={32}
            // onPress={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          />
        </TouchableOpacity>
      </View>

      <View>
        {isOpen && (
          <View style={[styles.courier, styles.elevation]}>
            {data?.courier ? (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/rider.png")}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      marginRight: 8,
                    }}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                      <Text
                        style={{
                          // color: "white",
                          fontSize: 16,
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        Name:
                      </Text>
                      <Text
                        style={{
                          // color: "white",
                          fontSize: 16,
                          // fontWeight: 500,
                          marginRight: 10,
                        }}
                      >
                        {data?.courier.name} {data?.courier.surname}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          // color: "white",
                          fontSize: 16,
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        Contact
                      </Text>
                      <Text
                        style={{
                          // color: "white",
                          fontSize: 16,
                          // fontWeight: 500,
                          marginRight: 10,
                        }}
                      >
                        {data?.courier.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dialCall(data.courier.phone);
                  }}
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
                    name="phone"
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
                    Call Courier
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: "red",
                    fontSize: 15,
                    fontWeight: 400,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Order still pending approval, A rider will be assigned to you
                  soon
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <ScrollView>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
          }}
        >
          Customer Name
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 3,
          }}
        >
          {data?.customerInfo[0].name}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
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
            padding: 3,
          }}
        >
          {data?.customerInfo[0].contact}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
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
            padding: 3,
          }}
        >
          {data?.customerInfo[0].location}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
          }}
        >
          Delivery Charge
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 3,
          }}
        >
          {data?.charge}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
          }}
        >
          Order number
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 3,
          }}
        >
          {data?.id}
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
          }}
        >
          Delivery Type
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 3,
          }}
        >
          {data?.deliveryType}
        </Text>
        {/* <Text
          style={{
            color: "#333",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
            backgroundColor: "#E0E0E0",
            padding: 3,
          }}
        >
          Price
        </Text>
        <Text
          style={{
            color: "#333",
            fontSize: 15,
            // fontWeight: 700,
            marginLeft: 10,
            padding: 3,
          }}
        >
          Ghs {data?.price}
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    // margin: 20,
    width: windowWidth - 40,
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
  view1: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    zIndex: 8,
    shadowRadius: 1,
  },
  modalText: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: "#00cc00",
  },
  view2: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  view3: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  view4: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  view5: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },

  view6: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  view7: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    backgroundColor: "purple",
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  view8: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  view9: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  elevation: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  courier: {
    marginHorizontal: 20,
    marginBottom: 20,
    margin: 5,
    backgroundColor: "yellow",
    padding: 20,
    marginTop: 0,
    borderRadius: 5,
  },
});
