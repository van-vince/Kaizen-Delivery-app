import { View } from "react-native";
import React from "react";
import { Image } from "@rneui/base";

export default function BannerSlider({ data }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 20,
      }}
    >
      <Image
        source={data.image}
        style={{ height: 150, width: 300, borderRadius: 10 }}
      />
    </View>
  );
}
