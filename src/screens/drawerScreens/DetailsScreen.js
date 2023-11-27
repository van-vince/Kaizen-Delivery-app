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
} from "react-native";
import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/contexts";
import { Icon } from "@rneui/themed";
import { colors, parameters } from "../../global/styles";
import { format } from "date-fns";


const windowWidth = Dimensions.get("window").width;

const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const { orders } = useContext(OrderContext);
  const order = orders.orders;
  // console.log(order)

  const data = order?.find((e) => e._id === id);
  console.log(data);

  const [isOpen, setIsOpen] = useState(false);

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };


//  const date = format(data.updatedAt, "MMMM do, yyyy H:mma")
   const date = new Date(data.updatedAt)

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
        <View style={styles.view2}>
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
              style={{
                color: "#333",
                fontSize: 18,
                fontWeight: 700,
                marginLeft: 10,
              }}
            >
              {data?.status.text}
            </Text>
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
              {date.toUTCString()} 
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
            backgroundColor: colors.orange,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
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
                        {data.courier.name} {data.courier.surname}
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
                        {data.courier.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={()=>{dialCall(data.courier.phone)}}
                  style={{
                    backgroundColor: "green",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginHorizontal: 40,
                    marginTop: 20,
                    padding: 10
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
          Payment type
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
          COD
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
        </Text>
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
  view1: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    zIndex: 8,
    shadowRadius: 1,
  },
  view2: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: 'yellow',
    padding: 20,
    marginTop: 0,
    borderRadius: 5
  },
});

{
  /* <View style={styles.view2}>
            <Icon
              type="material-community"
              name="chevron-right"
              // color={colors.grey1}
              size={32}
              onPress={() => navigation.goBack()}
            />
          </View> */
}
