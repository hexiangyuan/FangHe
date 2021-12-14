import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Header } from "../../../../components";
import { RootNavigation } from "../../../../navigation";
import { WSApi } from "../api/WebSocketApi";

export const YidiModeRoomCreatePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"异地模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      />
      <View style={{ flex: 1 }}>
        <Content />
      </View>
    </SafeAreaView>
  );
};

const Content = () => {
  return (
    <View style={{ justifyContent: "center", alignContent: "center", height: "80%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            WSApi.createRoom()
              .then(v => {
                console.log("abncd", v);
                RootNavigation.push("YiDiModeRoom", { roomId: "123456" });
              })
              .catch(e => {
                console.log("abncd", e);
              });
          }}
        >
          <Image source={require("@res/create_room.png")} style={{ width: 48, height: 48 }} resizeMode={"center"} />
          <Text style={{ textAlign: "center", marginTop: 16, fontSize: 18 }}>创建房间</Text>
        </Pressable>

        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            RootNavigation.push("YidiModePwdPage");
          }}
        >
          <Image source={require("@res/enter_room.png")} style={{ width: 48, height: 48 }} resizeMode={"contain"} />
          <Text style={{ textAlign: "center", marginTop: 16, fontSize: 18 }}>加入房间</Text>
        </Pressable>
      </View>
    </View>
  );
};
