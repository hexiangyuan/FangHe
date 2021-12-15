import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Header } from "../../../../components";
import { RootNavigation } from "../../../../navigation";
import { WSApi } from "../api/WebSocketApi";
import ToastGlobal from "../../../../utils/Toast";

export const YidiModeRoomCreatePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"异地模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.pop());
        }}
      />
      <View style={{ flex: 1 }}>
        <Content />
      </View>
    </SafeAreaView>
  );
};

const Content = () => {
  async function createRoom() {
    await WSApi.exitRoom();
    return await WSApi.createRoom();
  }

  return (
    <View style={{ justifyContent: "center", alignContent: "center", height: "80%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            createRoom()
              .then(value => {
                RootNavigation.push("YiDiModeRoom", { roomId: value });
              })
              .catch(e => {
                ToastGlobal.show("创建房间失败，请稍后重新创建");
                console.log(e);
              });
          }}
        >
          <Image source={require("@res/create_room.png")} style={{ width: 48, height: 48 }} resizeMode={"center"} />
          <Text style={{ textAlign: "center", marginTop: 16, fontSize: 18 }}>创建房间</Text>
        </Pressable>

        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            WSApi.exitRoom()
              .then(v => {
                console.log(v);
              })
              .catch(e => {
                console.log(e);
              });
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
