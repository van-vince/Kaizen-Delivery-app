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
  ActivityIndicator,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";
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
import axios from "axios";
// import Charge from "../components/Charge";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// console.log(apiUrl)


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

  const [destinationAddress, setDestinationAddress] = useState(destination.address);

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
  

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const snapPoints = useMemo(() => [ "45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();

  const [priceData, setPriceData] = useState(null)

  // getting app setting from database
  useEffect(() => {
    const settings = async () => {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}/appSettings`)
        .then(async (res) => {
          // console.log(res.data)
          setPriceData(res?.data)
        })
        .catch((err) => {
          alert(err);
        });
        setIsLoading(false);
    };
    settings();
  }, []);

  // define app settings 
  const records = priceData ?? []
  const noRiderAvailable = records[2]?.value === 'True'

  const discount = records[3]?.value
  const newDiscount = discount/100
  // console.log(discount)

  const chargeRate = records[1]?.value;
  // console.log(chargeRate)

// Courier types data
  const data = [
    {
      id: "same-day",
      title: "Same Day",
      multiplier: `${records[0]?.value}`,
      image: require("../../assets/rider2.png"),
      time: 'Deliver today'
    },
    {
      id: "next-day",
      title: "Next Day",
      multiplier: 1,
      image: require("../../assets/rider.png"),
      time: 'Deliver tomorrow'
    },
  ];


  //Calculate charges for both standard and express the dispatch it top context store
  useEffect(() => {
    //info about standard charge
    const info = data[0]
    const multiplier1 = info.multiplier
    let firstCharge = null
    if(discount > 0){
      firstCharge = new Intl.NumberFormat("en-gh", {
        style: "currency",
        currency: "Ghc",
      }).format(Math.round(((userTravelTime?.duration?.value * chargeRate * multiplier1) / 100) - (((userTravelTime?.duration?.value * chargeRate * multiplier1) / 100)*newDiscount) ))
    }else {
      firstCharge = new Intl.NumberFormat("en-gh", {
        style: "currency",
        currency: "Ghc",
      }).format(Math.round((userTravelTime?.duration?.value * chargeRate * multiplier1) / 100))
    }
    // console.log(firstCharge)

    //info about express charge
    const info2 = data[1]
    const multiplier2 = info2.multiplier
    let secondCharge = null
    if(discount > 0){
      secondCharge = new Intl.NumberFormat("en-gh", {
        style: "currency",
        currency: "Ghc",
      }).format(Math.round(((userTravelTime?.duration?.value * chargeRate * multiplier2) / 100) - (((userTravelTime?.duration?.value * chargeRate * multiplier2) / 100)*newDiscount) ))
    }else {
      secondCharge = new Intl.NumberFormat("en-gh", {
        style: "currency",
        currency: "Ghc",
      }).format(Math.round((userTravelTime?.duration?.value * chargeRate * multiplier2) / 100))
    }
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
    
  }, [userTravelTime, priceData])
  



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
            <Text style={{ marginLeft: 5 }}>Your Route</Text>
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
                <Text style={styles.text1}>{originAddress}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.view7}>
              <TouchableOpacity>
                <View style={styles.view5}>
                  <Text style={styles.text1}>{destinationAddress}</Text>
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

      <BottomSheet
      ref={bottomSheetRef}
        index={route.params.state}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View >
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 5,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          CHOOSE A COURIER 
        </Text>
        <View style={{ margin: 10}}>
          <FlatList
            data={data}
            keyExtrator={(item) => item.id}
            renderItem={({ item: { id, title, multiplier, image, time }, item }) => (
              <TouchableOpacity
                disabled={noRiderAvailable}
                onPress={() => setSelected(item)}
                style={[id === selected?.id ? styles.view17 : noRiderAvailable ? styles.view13 : styles.view9 ]}
              >
                <Image
                  style={{ height: 60, width: 60, resizeMode: "contain" }}
                  source={image}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>{title}</Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {time}
                  </Text>
                </View>
                <View  style={{ backgroundColor: colors.grey6, padding:10 , borderRadius:5, marginRight: 5}}>
                {/* Price shown when discount is allowed */}
                {isLoading && <ActivityIndicator size={"small"} />}
                {discount > 0 && 
                <>
                <Text style={{ fontSize: 10, fontWeight: 300, textAlign: 'right', textDecorationLine: 'line-through'}}>
                  { 
                 new Intl.NumberFormat("en-gh", {
                    style: "currency",
                    currency: "Ghc",
                  }).format(Math.round((userTravelTime?.duration?.value * chargeRate * multiplier) / 100))
                  }
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold"}}>
                    {new Intl.NumberFormat("en-gh", {
                      style: "currency",
                      currency: "Ghc",
                    }).format(Math.round(((userTravelTime?.duration?.value * chargeRate * multiplier) / 100) - (((userTravelTime?.duration?.value * chargeRate * multiplier) / 100)*newDiscount) ))}
                  </Text>
                  </>
                  }
                 {/* Price shown when there is no discount */}
                 {discount === '0' &&
                  <Text style={{ fontSize: 16, fontWeight: "bold"}}>
                  { 
                  new Intl.NumberFormat("en-gh", {
                      style: "currency",
                      currency: "Ghc",
                    }).format(Math.round((userTravelTime?.duration?.value * chargeRate * multiplier) / 100))
                    }
                  </Text>
                 }
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View> 
      </BottomSheet>
      
      <View   
      style={[noRiderAvailable ? styles.view15 : styles.view14]}>
          {discount > 0 && !noRiderAvailable && 
          <Text style={{textAlign: 'center', margin: 1, color: 'white', fontSize: 13}}>10% discount applied</Text>
          }
          {noRiderAvailable && 
          <Text style={{textAlign: 'center', margin: 1, color: 'white', fontSize: 13}}>Oops.. all riders are busy now</Text>
          }
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderDetailsScreen", { id: selected?.id});
              }}
              disabled={!selected}
              style={{
                padding: 15,
                backgroundColor: colors.orange, 
                width: '100%',
                borderRadius: 3,
                bottom: 0, 
            }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20,  fontWeight: 800,}}
              >
                Choose {selected?.title}
              </Text>
            </TouchableOpacity>
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
    marginBottom: 15, 
    borderWidth: .3,
    borderRadius: 10,
    padding: 5
  },
  view13: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 15, 
    opacity: 0.4,
    borderWidth: .3,
    padding: 5,
    borderRadius: 10,

  },
  view17: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7e7d0",
    marginBottom: 15,
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

  view14: {
    position: 'absolute',
    backgroundColor: 'green',
    flex: 1,
    width: '100%',
    bottom: 0,
    elevation: 20,
    borderRadius: 20,
  },
  view15: {
    position: 'absolute',
    backgroundColor: colors.grey3,
    flex: 1,
    width: '100%',
    bottom: 0,
    elevation: 20,
    borderRadius: 20,
  }


});
