import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width

export default function OrderItem({photo, title, subTitle, dropOff, onPress}) {
  return (
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 5,
      padding: 10,
      // borderBottomWidth: 0.3,
      // borderBottomColor: '#D8D8D8',
      shadowColor: "#000",
      // shadowOffset: {
      //   width: 5,
      //   height: 1,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 10,
      elevation: 0.5,

    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={photo}
          style={{width: 50, height: 50, borderRadius: 10, marginRight: 8}}
        />
        <View style={{width: windowWidth - 220}}>
        <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontSize: 14,
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: '#333',
              fontSize: 14,
            }}>
            {dropOff}
          </Text>
          <Text
            style={{
              color: '#333',
              fontSize: 10,
            }}>
            {subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={{
        backgroundColor:'#0aada8',
        padding:10,
        width: 100,
        borderRadius: 10,
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 14,
        }}>
         Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}