import React, { useRef, useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors, parameters } from "../global/styles";
import { Icon, Avatar } from "@rneui/themed";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { OriginContext, DestinationContext } from "../context/contexts";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const DestinationScreen = ({ navigation }) => {
  const { dispatchOrigin } = useContext(OriginContext);
  const { dispatchDestination } = useContext(DestinationContext);

  const textInput1 = useRef();
  const textInput2 = useRef();

  useEffect(()=> {
    setTimeout(()=> {
      textInput1.current?.focus()
    }, 0)
  },[])
  
  useEffect(()=> {
    setTimeout(()=> {
      textInput2.current?.focus()
    }, 0)
  },[textInput2])

  const [destination, setDestination] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.view1}>
          <Icon
            type="material-community"
            name="arrow-left"
            color={colors.grey1}
            size={32}
            onPress={() => navigation.goBack()}
          />
        </View>

        <TouchableOpacity>
          <View style={styles.view3}>
            <Avatar
              rounded
              size={30}
              source={require("../../assets/blankProfilePic.jpg")}
            />
            <Text style={{ marginLeft: 5 }}>Your route</Text>
            <Icon
              type="material-community"
              name="chevron-down"
              color={colors.grey1}
              size={26}
            />
          </View>
        </TouchableOpacity>
      </View>
        {destination === false && (
          <GooglePlacesAutocomplete
            nearbyPlacesApi="GooglePlacesSearch"
            placeholder="Pick up from"
            listViewDisplayed="auto"
            debounce={400}
            ref={textInput1}
            minLenght={2}
            fetchDetails={true}
            autoFoccus={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
              components: "country:gh",
            }}
            styles={{
              container: {
                height: "50%",
              },
              textInputContainer: {
                marginTop: 10,
                margin: 5,
              },
              textInput: {
                height: 50,
                color: "#5d5d5d",
                fontSize: 16,
                borderWidth: 0.5,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            onPress={(data, details = null) => {
              // console.log(details)
              dispatchOrigin({
                type: "ADD_ORIGIN",
                payload: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  address: data.description,
                  name: details.name,
                },
              });
              setDestination(true);
            }}
          />
        )}
      {destination === true && (
        <GooglePlacesAutocomplete
          nearbyPlacesApi="GooglePlacesSearch"
          placeholder="Going to..."
          listViewDisplayed="auto"
          debounce={400}
          ref={textInput2}
          minLenght={2}
          fetchDetails={true}
          autoFoccus={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            components: "country:gh",
          }}
          styles={{
            container: {
              height: "50%",
            },
            textInputContainer: {
              marginTop: 10,
              margin: 5,
            },
            textInput: {
              height: 50,
              color: "#5d5d5d",
              fontSize: 16,
              borderWidth: 0.5,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          onPress={(data, details = null) => {
            dispatchDestination({
              type: "ADD_DESTINATION",
              payload: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: data.description,
                name: details.name,
              },
            });
            navigation.navigate("ResultScreen", { state: 0 });
            setDestination(false);
          }}
        />
      )}
    </>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: parameters.statusBarHeight,
  },

  view1: {
    position: "absolute",
    top: 25,
    left: 15,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    zIndex: 10,
  },

  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: colors.white,
    height: 30,
    zIndex: 10,
  },

  view2: { backgroundColor: colors.white, zIndex: 4, paddingBottom: 10 },

  view24: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20,
  },

  view25: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  flatlist: {
    marginTop: 20,
    zIndex: 17,
    elevation: 8,
  },
});
