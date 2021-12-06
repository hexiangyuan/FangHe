import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddDevicePage = () => {
  const [list, setList] = useState([]);

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("aaaaaa");
      }}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            width: "100%",
            backgroundColor: "#9999FF",
            fontSize: 16,
            color: "white",
            paddingVertical: 8,
            paddingHorizontal: 16
          }}
        >
          使用前请务必打开蓝牙
        </Text>
        <Text style={{ paddingHorizontal: 12, fontSize: 24, marginTop: 16 }}>可用设备</Text>
        <FlatList data={[list]} renderItem={_renderItem} />
      </View>
    </SafeAreaView>
  );
};
