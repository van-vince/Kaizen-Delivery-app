import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { colors, parameters } from "../global/styles";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "react-native";
import {
  OriginContext,
  DestinationContext,
  TravelTimeContext,
  AuthContext,
  ChargeContext,
} from "../context/contexts";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("window").width;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const OrderDetailsScreen = ({ navigation, route }) => {
  const { origin } = useContext(OriginContext);
  const [originAddress, setOriginAddress] = useState(origin.address);

  const { destination } = useContext(DestinationContext);
  const [destinationAddress, setDestinationAddress] = useState(
    destination.address
  );

  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const customer = userInfo?.customer;


  const { id } = route.params;
  const { charges } = useContext(ChargeContext);
  const charge = charges?.charges;

  const price = charge?.find((e) => e.id === id);
  const customerCharge = price.price
  // console.log(customer)
  // console.log(customerCharge)



  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      location: originAddress,
      contact: customer.contact,
      name: customer.name,
      cusLocation: destinationAddress,
      deliveryCharge: customerCharge.substring('GHC '.length)
    },
  });

  
  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios
      .post(`${apiUrl}/orders`, {
        storeInfo: {
          name: data.name,
          location: data.location,
          contact: data.contact,
        },
        customerInfo: {
          name: data.cusName,
          location: data.cusLocation,
          contact: data.cusContact,
        },
        itemType: data.itemType,
        deliveryType: data.deliveryType,
        // amount: data.amount,
        charge: data.deliveryCharge,
        creator: customer._id,
      })
      .then(async (res) => {
        console.log(res.data);
        if (res?.data.success === true) {
          Alert.alert('Congratulations!!', res.data.message);
        } else {
          alert(res.data?.message);
        }
        navigation.navigate("SuccessScreen", { success: res?.data?.success})
      })
      .catch((err) => {
        alert(err);
      });
      reset()
      setIsLoading(false);
  };

  if (isLoading)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text1}> Order Details</Text>
        <View>
          <Text style={styles.text2}>Pick up address</Text>
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
                  editable = {false}
                />
              )}
              name="location"
            />
            {errors.location && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
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
                This is required.
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
                  placeholder="Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.text2}>Drop off address</Text>
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
                  editable = {false}
                />
              )}
              name="cusLocation"
            />
            {errors.cusLocation && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
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
              name="cusContact"
            />
            {errors.cusContact && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
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
                  placeholder="Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="cusName"
            />
            {errors.cusName && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="Delivery Charge"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  editable = {false}
                  keyboardType="number-pad"
                />
              )}
              name="deliveryCharge"
            />
            {errors.deliveryCharge && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
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
                  placeholder="Item Type"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="itemType"
            />
            {errors.itemType && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
              </Text>
            )}
          </View>

          <View style={styles.view2}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  style={styles.picker}
                  onValueChange={onChange}
                >
                  <Picker.Item
                    label="Delivery Type"
                    value={""}
                    style={{ border: 1 }}
                  />
                  <Picker.Item label="Same-day" value="same-day" />
                  <Picker.Item label="Next-day" value="next-day" />
                </Picker>
              )}
              name="deliveryType"
            />
            {errors.deliveryType && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
              </Text>
            )}
          </View>

          {/* <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="Amount"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                />
              )}
              name="amount"
            />
            {errors.amount && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                This is required.
              </Text>
            )}
          </View> */}
        </View>

        <View>
          <TouchableOpacity
            title="Submit"
            // disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: "black",
              padding: 12,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
    paddingBottom: 30,
    margin: 10,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  view1: {
    flex: 1,
  },
  view2: {
    marginBottom: 10,
  },

  text1: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
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

  picker: {
    backgroundColor: colors.grey4,
    borderRadius: 10,
  },
});

