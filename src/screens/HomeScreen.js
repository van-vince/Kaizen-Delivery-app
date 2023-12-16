import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import { colors, parameters } from "../global/styles";
import { StatusBar } from "react-native";
import { filterData, carsAround } from "../global/data";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";
import * as Location from "expo-location";
import Carousel from "react-native-reanimated-carousel";
import { slideData } from "../global/sliderData";
import BannerSlider from "../components/slider";

navigator.geolocation = require("react-native-geolocation-service");

const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [latLng, setLatLng] = useState({});

  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === "granted") {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === "granted";
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {}
  };

  const _map = useRef(1);

  useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <Icon
            type="material-community"
            name="menu"
            color={colors.white}
            size={40}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </View>

      <ScrollView bounces={false}>
        <View style={styles.home}>
          <Text style={styles.text1}>Kaizen Deliveries</Text>
          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>
                Delighting customers with speed, quality, & reliability
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RequestScreen", { state: 0 });
                }}
              >
                <View style={styles.button1}>
                  <Text style={styles.button1Text}>Order Now</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={require("../../assets/homeRide.png")}
              />
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 1, marginTop: 10 }}>
          {/* <FlatList 
                numRows={3}
                horizontal ={true}
                showsHorizontalScrollIndicator ={false}
                data = {filterData}
                keyExtractor = {(item)=>item.id}
                renderItem = { ({item})=>(
                      <View style = {styles.card}>
                        <View style = {styles.view2}>
                          <Image style = {styles.image2} source = {item.image}/>
                        </View>
                        <View>
                          <Text style = {styles.title}>{item.name}</Text>
                        </View>
                      </View>
                )}
              /> */}
          <Carousel
            data={slideData}
            renderItem={renderBanner}
            width={SCREEN_WIDTH }
            height={180}
            scrollAnimationDuration={4000}
            loop
            autoPlay
          />
        </View>

        {/* <Text style = {styles.text4}>Around you</Text> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 15,
            borderRadius: 10,
          }}
        >
          <MapView
            ref={_map}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
              ...carsAround[0],
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {carsAround.map((item, index) => (
              <Marker coordinate={item} key={index.toString()}>
                <Image
                  source={require("../../assets/rider.png")}
                  style={styles.carsAround}
                  // resizeMode = 'cover'
                />
              </Marker>
            ))}
          </MapView>
        </View>

        <TouchableOpacity
          style={styles.view3}
          onPress={() => {
            navigation.navigate("RequestScreen", { state: 0 });
          }}
        >
          <Text style={styles.text3}>Need a courier ??</Text>

          <View style={styles.view4}>
            <Icon
              type="material-community"
              name="clock-time-four"
              color={colors.white}
              size={26}
            />
            <Text style={{ marginLeft: 5, color: "white" }}>...</Text>
            <Icon
              type="material-community"
              name="chevron-right"
              color={colors.white}
              size={26}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.view5}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.black}
                size={22}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Circle, VIP Station
              </Text>
              <Text style={{ color: colors.grey3 }}>
                Kwame Nkrumah Circle, Accra
              </Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              color={colors.grey}
              size={26}
            />
          </View>
        </View>

        <View style={{ ...styles.view5, borderBottomWidth: 0 }}>
          <View style={styles.view6}>
            <View style={styles.view7}>
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.black}
                size={22}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Teshie bush road,{" "}
              </Text>
              <Text style={{ color: colors.grey3 }}>
                Tsuibleo-manet road, 15-n Accra
              </Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="chevron-right"
              color={colors.grey}
              size={26}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.orange,
    height: 40,
    alignItems: "flex-start",
  },

  image1: {
    height: 100,
    width: 100,
  },

  image2: { height: 60, width: 60, borderRadius: 30 },

  home: {
    backgroundColor: colors.orange,
    paddingLeft: 20,
  },

  text1: {
    color: colors.white,
    fontSize: 24,
    paddingBottom: 5,
    paddingTop: 10,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
  },

  view0: {
    alignItems: "center",
  },

  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 30,
  },

  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  card: {
    alignItems: "center",
    margin: SCREEN_WIDTH / 22,
  },

  view2: { marginBottom: 5, borderRadius: 15, backgroundColor: colors.grey6 },

  title: {
    color: colors.black,
    fontSize: 16,
  },
  view3: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 2,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  text3: { marginLeft: 15, fontSize: 20, color: colors.black },

  view4: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },

  view5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    flex: 1,
  },

  view6: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  map: {
    height: 150,
    marginVertical: 0,
    width: SCREEN_WIDTH * 0.92,
  },

  text4: {
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginBottom: 20,
  },

  icon1: { marginLeft: 15, marginTop: 5 },

  view8: { flex: 4, marginTop: -25 },
  carsAround: {
    width: 25,
    height: 25,
  },

  location: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  view9: { width: 4, height: 4, borderRadius: 2, backgroundColor: "white" },
});

// import React from 'react';
// import { useState } from 'react';
// import { StyleSheet, View, Button, TextInput } from 'react-native';
// import { WebView } from 'react-native-webview';
// import mapTemplate from '../global/map-template';

// export default function App() {
//   let webRef = undefined;
//   let [mapCenter, setMapCenter] = useState('-121.913, 37.361');
//   const run = `
//       document.body.style.backgroundColor = 'blue';
//       true;
//     `;

//   const onButtonClick = () => {
//     const [lng, lat] = mapCenter.split(",");
//     webRef.injectJavaScript(`map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`);
//   }

//   const handleMapEvent = (event) => {
//     setMapCenter(event.nativeEvent.data)
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttons}>
//         <TextInput
//         style={styles.textInput}
//         onChangeText={setMapCenter}
//         value={mapCenter}></TextInput>
//         <Button title="Set Center" onPress={onButtonClick}></Button>
//       </View>
//       <WebView
//         ref={(r) => (webRef = r)}
//         onMessage={handleMapEvent}
//         style={styles.map}
//         originWhitelist={['*']}
//         source={{ html: mapTemplate }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     flex: 1
//   },
//   buttons: {
//     flexDirection: 'row',
//     height: '15%',
//     backgroundColor: '#fff',
//     color: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 12
//   },
//   textInput: {
//     height: 40,
//     width: "60%",
//     marginRight: 12,
//     paddingLeft: 5,
//     borderWidth: 1,
//   },
//   map: {
//     width: '100%',
//     height: '85%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
