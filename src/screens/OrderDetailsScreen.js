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
  Button
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
} from "../context/contexts";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const RequestScreen = ({ navigation, route }) => {
  const { origin } = useContext(OriginContext);
  const [originAddress, setOriginAddress] = useState(origin.address);

  const { destination } = useContext(DestinationContext);
  const [destinationAddress, setDestinationAddress] = useState(
    destination.address
  );

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues:{
        location: originAddress,
        cusLocation: destinationAddress
    }
  });

  const apiUrl = 'https://knowing-muskrat-cleanly.ngrok-free.app'

  const onSubmit = async(data) => {
    await axios
    .post(`${apiUrl}/orders`, {
      storeInfo: {
        name: data.name,
        location: data.location,
        contact: data.contact
      },
      customerInfo: {
        name: data.cusName,
        location: data.cusLocation,
        contact: data.cusContact
      },
      itemType: data.itemType,
      price: data.price
    })
    .then(async (res) => {
      console.log(res.data);
      if(res?.data.success ===true){
        alert(res.data.message)
      }else{
          alert(res.data?.message)
      }
    })
    .catch((err) => {
      alert(err);
    });
}


  const [selectedValue, setSelectedValue] = useState();

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
                />
              )}
              name="location"
            />
            {errors.location && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
            {errors.contact && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
            {errors.name && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
                />
              )}
              name="cusLocation"
            />
            {errors.cusLocation && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
            {errors.cusContact && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
            {errors.cusName && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
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
                  placeholder="Item Type"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="itemType"
            />
            {errors.itemType && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
          </View>

          <View style={styles.view2}>
            
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item
                label="Payment Type"
                value=""
                style={{ border: 1 }}
              />
              <Picker.Item label="COD" value="cod" />
              <Picker.Item label="Card" value="card" />
            </Picker>
            
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
                  placeholder="Price"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                />
              )}
              name="price"
            />
            {errors.price && ( <Text style={{ color: "red", marginBottom: 10 }}>This is required.</Text>)}
          </View>

        </View>

        <View>
          <TouchableOpacity
            title='Submit'
            // disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            style={{ backgroundColor: "black", padding: 12, borderRadius:5, marginTop:10}}
          >
            <Text style={{textAlign:'center',color:'white', fontSize:16 }}>Submit</Text>   
          </TouchableOpacity>
        </View>
        <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
      </View>
    </ScrollView>
  );
};

export default RequestScreen;

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



{/* <View style={styles.view2}>
<Picker
  selectedValue={selectedValue}
  style={styles.picker}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedValue(itemValue)
  }
>
  <Picker.Item
    label="Payment Type"
    value=""
    style={{ border: 1 }}
  />
  <Picker.Item label="COD" value="cod" />
  <Picker.Item label="Card" value="card" />
</Picker>
</View> */}

