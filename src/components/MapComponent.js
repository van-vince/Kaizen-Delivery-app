import { Text, StyleSheet, View, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useContext } from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { Marker } from "react-native-maps";
import { mapStyle } from '../global/mapStyle'
import { colors, parameters } from '../global/styles'
import ThemedImage from '@rneui/themed/dist/Image'
import  MapViewDirections  from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { TravelTimeContext } from '../context/contexts'
 

const MapComponent = ({userOrigin, userDestination, originAddress, destinationAddress}) =>  {

  const {dispatchTravelTime} = useContext(TravelTimeContext)

  const mapRef = useRef(null)

    useEffect(()=> {
    setTimeout(()=>{
      if(userDestination.latitude !== null){
        mapRef.current.fitToCoordinates(
          [userOrigin, userDestination],{
            edgePadding:{top:50,right:50,left:50,bottom:50},
            animated:true
          }
        )
      }
    },500)
 },) 
 
    useEffect(()=> {
      if(!userOrigin || !userDestination) return;
      const getTravelTime = async() => {
       fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originAddress}&destinations=${destinationAddress}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`, 
            ).then(res => res.json())
            .then(data => {
              dispatchTravelTime({type:"ADD_TRAVEL_TIME",payload:{
                distance:data.rows[0].elements[0].distance,
                duration:data.rows[0].elements[0].duration
            }})
            console.log(data)
            }).catch((err)=> Alert.alert(err))
      }
       getTravelTime();      
    },[originAddress, destinationAddress, GOOGLE_MAPS_APIKEY])


    return (
      <View >
        <MapView
                provider={PROVIDER_GOOGLE}
                style = {styles.map}
                // customMapStyle = {mapStyle}
                ref = {mapRef}
                showsUserLocation={true}
                mapType="standard"
                region={{
                  latitude:   5.614818,
                  longitude:  -0.186964,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.021,
                }}
            >
              {userOrigin.latitude != null &&
                <Marker  coordinate = {userOrigin}  anchor = {{x:0.5,y:0.5}}>
                  <Image 
                  source = {require('../../assets/location.png')}
                  style = {styles.markerOrigin2}
                  resizeMode = 'cover'
                  />
                </Marker>
             }
              {userDestination.latitude != null &&
                <Marker coordinate = {userDestination} anchor = {{x:0.5,y:0.5}}>
                  <Image 
                  source = {require('../../assets/location.png')}
                  style = {styles.markerDestination}
                  resizeMode = 'cover'
                  />
                </Marker>
             }

             {/* Map view directions */}
             {userDestination.latitude !== null &&
                  <MapViewDirections 
                    origin={userOrigin}
                    destination={userDestination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor={colors.black}
                  />
             }
        </MapView>
      </View>
    )
  }

export default MapComponent;


const styles = StyleSheet.create({

  map: {
       height:"100%",
        width:"100%"
       },
     
           destination: {
              width:20,
             height:20,
             backgroundColor:colors.black,
             alignItems:"center",
             justifyContent:"center"
            },
  
            view1: {
              width:7,
             height:7,
             backgroundColor:colors.white
            },
            markerDestination: {
             width: 15,
             height: 15,
             
            },
            
            markerOrigin2: {
              width: 15,
              height:15,
              borderRadius:10
             },
  
      car:{
          paddingTop:0,
          width: 40,
          height: 20,
         },
  
         view2:{
          position:"absolute",
          top:10,
          right:12,
          backgroundColor:colors.white,
          height:40,
          width:180,
          borderRadius:20,
          justifyContent:"center",
          alignItems:"center",
          marginTop:2, 
          zIndex: 8
          
        },    
   
  view3:{ flexDirection:"row",
  alignItems:"center",
  //marginRight:15,
  //backgroundColor:"white",
  //paddingHorizontal:2,
  paddingVertical:2,
  //borderRadius:20
  },
  
  view4:{
      position:"absolute",
      top:50,
      left:12,
      backgroundColor:colors.white,
      height:40,
      width:140,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2, 
      zIndex: 8
      
    }, 
  
    location: {
      width: 20,
      height: 20,
      borderRadius:9,
      backgroundColor:colors.black,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
  view9:{width:6,
    height:6,
    borderRadius:4,
    backgroundColor:"white"
  }     
})




