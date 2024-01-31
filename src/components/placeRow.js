import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { colors, parameters } from "../global/styles";

const PlaceRow = ({ data }) => {
    // console.log(data)
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {data.description === 'Home'
          ? <Entypo name='home' siz={20} color={'white'} />
          : <Entypo name='location-pin' siz={20} color={'white'} />
        }
      </View>
      <View>
        <Text style={styles.locationText}>{data.structured_formatting.main_text }</Text>
        <Text style={styles.locationText2}>{data.description }</Text>
      </View>
    </View>
  );
};

export default PlaceRow;

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 0,
      },
      iconContainer: {
        backgroundColor: colors.grey4,
        padding: 5,
        borderRadius: 50,
        marginRight: 10,
      },
      locationText: {
        fontSize: 16,
        fontWeight: '400'
    
      },
      locationText2: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.grey3
    
      },
})