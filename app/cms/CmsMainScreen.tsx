import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Window from "../constant/window";
import { RootNavigation } from "../navigation";

export interface CMSShopItemProps {
  id: number;
  img: string;
  shopName: string;
  score: number;
  averPrice: number;
  tag: string[];
  info: string;
  distanceMeter: number;
}

export const CmsMainScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate("CmsShopList");
          }}
          style={{
            width: Window.width / 3,
            height: Window.width / 3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("./ic_cms.png")}
            style={{
              width: 32,
              height: 32
            }}
          />
          <Text>店铺管理</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: Window.width / 3,
            height: Window.width / 3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("./ic_cms.png")}
            style={{
              width: 32,
              height: 32
            }}
          />
          <Text>订单管理</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
