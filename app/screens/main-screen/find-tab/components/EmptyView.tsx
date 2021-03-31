import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";

export const EmptyView = (props: { onPress?: () => void; text?: string }) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      flex: 1,
      marginTop: 100,
      alignItems: "center"
    }}
  >
    <Image
      source={require("../../../../components/icon/icons/home_empty.png")}
      style={{
        width: 200,
        height: 200
      }}
    />
    <Text style={{ textAlign: "center", lineHeight: 24, fontSize: 16 }}>
      {props.text ? props.text : "您的数据可能跑到外太空"}
    </Text>
  </TouchableOpacity>
);
