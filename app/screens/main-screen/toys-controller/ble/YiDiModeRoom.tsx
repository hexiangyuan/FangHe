import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../../components";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import React from "react";
import { useUserInfo } from "../../../../hooks/user";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../../../../navigation";

export const YiDiModeRoom = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"我的房间"}
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
  const userInfo = useUserInfo();
  const roomId = useRoute().params["roomId"];

  const gotoStart = () => {
    RootNavigation.push("ZiZhuModePage");
  };

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center", flex: 1, height: "100%" }}>
      <Text style={{ fontSize: 48, letterSpacing: 30 }}>{roomId}</Text>

      {userInfo && (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
          <User name={userInfo.mobie.substr(-4)} img={require("../../../../../assets/room_header_img.png")} />
          <User name={userInfo.mobie.substr(-4)} img={require("../../../../../assets/room_header_img2.png")} />
        </View>
      )}

      <UIButton
        onPress={() => {
          gotoStart();
        }}
        containerStyle={{
          width: "80%",
          position: "absolute",
          bottom: 16
        }}
      >
        立即开始
      </UIButton>
    </View>
  );
};

const User = (props: { name: string; img: ImageSourcePropType }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <Image source={props.img} style={{ width: 148, height: 148 }} resizeMode={"center"} />
      <Text style={{ color: "#333", textAlign: "center" }}>{props.name}</Text>
    </View>
  );
};
