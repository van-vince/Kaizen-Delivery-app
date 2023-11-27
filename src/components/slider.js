import {  View, } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'


export default function BannerSlider({data}) {
  return (
    <View>
      <Image source={data.image} 
      style={{height: 150, width: 300,  borderRadius:10}}
      /> 
    </View>
  )
}

