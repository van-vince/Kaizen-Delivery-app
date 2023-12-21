import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { colors, parameters } from "../global/styles";
// import { rideData } from "../global/data";
import MapComponent from "../components/MapComponent";
import { Icon, Avatar } from "@rneui/themed";
import {
  OriginContext,
  DestinationContext,
  TravelTimeContext,
  ChargeContext,
} from "../context/contexts";
import { FlatList } from "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/en";
// import Charge from "../components/Charge";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const data = [
  {
    id: "standard",
    title: "Standard",
    multiplier: 1,
    image: require("../../assets/rider2.png"),
  },
  {
    id: "express",
    title: "Express",
    multiplier: 1.2,
    image: require("../../assets/rider.png"),
  },
];


const ResultScreen = ({ navigation, route }) => {
  const { origin } = useContext(OriginContext);
  const [userOrigin, setUserOrigin] = useState({
    latitude: origin.latitude,
    longitude: origin.longitude,
  });
  const [originAddress, setOriginAddress] = useState(origin.address);

  const { destination } = useContext(DestinationContext);
  const [userDestination, setUserDestination] = useState({
    latitude: destination.latitude,
    longitude: destination.longitude,
  });
  const [destinationAddress, setDestinationAddress] = useState(
    destination.address
  );

  const { travelTime } = useContext(TravelTimeContext);
  const [userTravelTime, setUserTravelTime] = useState({
    distance: travelTime.distance,
    duration: travelTime.duration,
  });

  const { dispatchCharges } = useContext(ChargeContext);

  // console.log(userTravelTime)

  useEffect(() => {
    setUserOrigin({ latitude: origin.latitude, longitude: origin.longitude });
    setUserDestination({latitude: destination.latitude,longitude: destination.longitude,});

    setOriginAddress(origin.address);
    setDestinationAddress(destination.address);
    setUserTravelTime({
      distance: travelTime.distance,
      duration: travelTime.duration,
    });
  }, [origin, destination, travelTime]);
  

  const [selected, setSelected] = useState(null);


  const chargeRate = 3.5;

  //Calculate charges for both standard and express the dispatch it top context store
  useEffect(() => {
    //info about standard charge
    const info = data[0]
    const multiplier1 = info.multiplier
    const firstCharge = new Intl.NumberFormat("en-gh", {
      style: "currency",
      currency: "Ghc",
    }).format((userTravelTime?.duration?.value * chargeRate * multiplier1) / 100)
    // console.log(firstCharge)

    //info about express charge
    const info2 = data[1]
    const multiplier2 = info2.multiplier
    const secondCharge = new Intl.NumberFormat("en-gh", {
      style: "currency",
      currency: "Ghc",
    }).format((userTravelTime?.duration?.value * chargeRate * multiplier2) / 100)
    // console.log(secondCharge)

    //dispatch to context store
    dispatchCharges({ 
      type: "ADD_CHARGES", 
      payload: { charges: 
        [
          {id: info.id,
           price: firstCharge
          }, 
          {
            id: info2.id,
            price: secondCharge
          }
        ]} });
    
  }, [userTravelTime])


  const ref = useRef();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Icon
          type="material-community"
          name="arrow-left"
          color={colors.grey1}
          size={32}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.view2}>
        <TouchableOpacity>
          <View style={styles.view3}>
            <Avatar
              rounded
              avatarStyle={{}}
              size={30}
              source={require("../../assets/blankProfilePic.jpg")}
            />
            <Text style={{ marginLeft: 5 }}>For someone</Text>
            <Icon
              type="material-community"
              name="chevron-down"
              color={colors.grey1}
              size={26}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.view4}>
          <View>
            <Image
              style={styles.image1}
              source={require("../../assets/transit.png")}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View style={styles.view6}>
                <Text style={styles.text1}> Pick up from</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.view7}>
              <TouchableOpacity>
                <View style={styles.view5}>
                  <Text style={styles.text1}>...</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.view8}>
                <Icon
                  type="material-community"
                  name="plus-thick"
                  color={colors.grey1}
                  size={25}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ height: 260 }}>
        <MapComponent
          userOrigin={userOrigin}
          userDestination={userDestination}
          originAddress={originAddress}
          destinationAddress={destinationAddress}
        />
      </View>

      <View style={styles.modalView}>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Choose a Courier Type
        </Text>
        <View style={{ margin: 5, height: 200 }}>
          <FlatList
            data={data}
            keyExtrator={(item) => item.id}
            renderItem={({ item: { id, title, multiplier, image, }, item }) => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={[id === selected?.id ? styles.view17 : styles.view9]}
                // style={styles.view9}
              >
                <Image
                  style={{ height: 60, width: 60, resizeMode: "contain" }}
                  source={image}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>{title}</Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {userTravelTime?.duration?.text} travel time
                  </Text>
                </View>
                <Text  
                // onPress={(event) => setCharge(event._dispatchInstances.memoizedProps.children)}
                style={{ fontSize: 16, fontWeight: "bold", backgroundColor: colors.grey6, padding:10 , borderRadius:5}}
                >
                 { 
                 new Intl.NumberFormat("en-gh", {
                    style: "currency",
                    currency: "Ghc",
                  }).format((userTravelTime?.duration?.value * chargeRate * multiplier) / 100)
                  }
                </Text>
              </TouchableOpacity>
            )}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderDetailsScreen", { id: selected?.id});
              }}
              disabled={!selected}
              style={{
                backgroundColor: colors.orange,
                padding: 10,
                borderRadius: 5,
                bottom: 0,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 16 }}
              >
                Choose {selected?.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: parameters.statusBarHeight },

  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
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
    marginTop: 10,
    zIndex: 8,
  },
  view2: {
    height: SCREEN_HEIGHT * 0.21,
    alignItems: "center",
    zIndex: 5,
    backgroundColor: colors.white,
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    //height:30,
    zIndex: 10,
  },
  view4: {
    flexDirection: "row",
    alignItems: "center",
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
  },
  view6: {
    backgroundColor: colors.grey6,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.grey1,
  },
  image1: { height: 70, width: 30, marginRight: 10, marginTop: 10 },
  view7: {
    flexDirection: "row",
    alignItems: "center",
  },
  view8: {
    marginLeft: 10,
  },
  view9: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  view17: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7e7d0",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.orange,
  },
  view10: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: colors.grey5,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  view11: {
    backgroundColor: colors.grey,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginTop: 15,
  },

  contentContainer: {
    backgroundColor: "white",
  },

  view12: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey4,
  },

  text2: {
    fontSize: 18,
    color: colors.grey1,
  },
  text3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    marginRight: 5,
  },

  text4: { color: colors.grey2, marginTop: 4 },

  view13: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  button1: {
    height: 40,
    width: 100,
    backgroundColor: colors.grey6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button2: {
    height: 50,
    backgroundColor: colors.grey10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },

  button1Text: {
    fontSize: 17,
    marginTop: -2,
    color: colors.black,
  },

  button2Text: {
    color: colors.white,
    fontSize: 23,
    marginTop: -2,
  },

  view14: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view15: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  view16: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  text5: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 3,
    fontWeight: "bold",
    paddingBottom: 1,
  },

  view18: {},

  view19: { flex: 1.7, alignItems: "flex-end" },

  icon: { paddingBottom: 2 },

  image2: { height: 60, width: 60 },

  view20: { marginRight: 10 },

  text6: {
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },

  view21: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 15,
  },

  view22: {
    alignItems: "center",
    marginBottom: -20,
  },

  sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop: 30,
    paddingLeft: 15,
  },

  text7: {
    fontSize: 28,
    color: colors.black,
    marginRight: 5,
  },

  text8: {
    fontSize: 15,
    color: colors.grey2,
    textDecorationLine: "line-through",
  },

  button3: {
    height: 60,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 110,
    marginBottom: 10,
  },

  view23: {
    flexDirection: "row",
    backgroundColor: colors.cardbackground,
    // elevation:10,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    height: 80,
  },

  button2Image: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey6,
    marginBottom: 10,
  },
  text9: { fontSize: 15, color: colors.grey1 },

  map: {
    marginVertical: 0,
    width: SCREEN_WIDTH,
    zIndex: -1,
  },

  centeredView: {
    zIndex: 14,
  },
  modalView: {
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 16,
  },

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
  },

  text10: { color: colors.grey2, paddingLeft: 10 },
});
