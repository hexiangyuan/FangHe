import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";

export const EmptyView = (props: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      flex: 1,
      marginTop: 100,
      alignItems: "center"
    }}
  >
    <Image
      source={require("./home_empty.png")}
      style={{
        width: 200,
        height: 200
      }}
    />
    <Text>您的数据可能跑到外太空</Text>
    <Text>点我重试</Text>
  </TouchableOpacity>
);
