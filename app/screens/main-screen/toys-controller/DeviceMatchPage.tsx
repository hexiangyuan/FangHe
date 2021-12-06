import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from "../../../navigation";

export const DeviceMatchPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9999FF" }}>
      <View style={{ flex: 1 }}>
        <DeviceView />
      </View>
    </SafeAreaView>
  );
};

const DeviceView = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={{ paddingHorizontal: 12, fontSize: 24, marginTop: 16 }}>我的设备</Text>
        <Pressable
          onPress={() => {
            RootNavigation.push("NoDevicesModePage");
          }}
        >
          <Text style={{ paddingHorizontal: 12, fontSize: 16, marginTop: 16 }}>我没有设备</Text>
        </Pressable>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 12, flexDirection: "row", marginTop: 16 }}>

        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            minHeight: 72,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
          onPress={() => {
            RootNavigation.push("AddDevicePage");
          }}
        >
          <Text>添加设备</Text>
        </TouchableOpacity>

        <View style={{ width: 16 }} />
        <View
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            minHeight: 72,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Text>接受邀请</Text>
        </View>
      </View>
    </View>
  );
};
