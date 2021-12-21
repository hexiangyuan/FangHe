import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../../components";
import { Image, ImageSourcePropType, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useUserInfo } from "../../../../hooks/user";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../../../../navigation";
import ToastGlobal from "../../../../utils/Toast";
import { ClipboardUtils } from "../../../../utils/Clipboard";
import { WSApi } from "../api/WebSocketApi";
import { useInterval } from "usehooks-ts";

export const YiDiModeRoom = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"我的房间"}
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
  const userInfo = useUserInfo();
  const roomId = useRoute().params["roomId"];
  const [users, setUsers] = useState([1,2]);
  const [enterRoomSucceeded, setEnterRoomSucceed] = useState(false);

  useInterval(
    () => {
      WSApi.getRoomInfo()
        .then(value => {
          if (value.code === 200) {
            setUsers(value.users);
          }
          console.log(value);
        })
        .catch(error => {
          console.log(error);
        });
    },
    enterRoomSucceeded ? null : 3000
  );

  const gotoStart = () => {
    WSApi.enterRoom(roomId)
      .then(v => {
        setEnterRoomSucceed(true);
        RootNavigation.push("DouBleControllerPage");
      })
      .catch(e => {
        ToastGlobal.show("进入房间失败，请稍后重试哦");
      });
  };

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center", flex: 1, height: "100%" }}>
      <Text style={{ fontSize: 48, letterSpacing: 30 }}>{roomId}</Text>

      {userInfo && (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
          <User
            name={users.length > 0 ? "已准备" : "正在进入中"}
            img={users.length > 0 ? require("@res/room_header_img.png") : require("@res/waiting.png")}
          />
          <User
            name={users.length > 1 ? "已准备" : "正在进入中"}
            img={users.length > 1 ? require("@res/room_header_img2.png") : require("@res/waiting.png")}
          />
        </View>
      )}

      {
        <Pressable
          style={{ alignItems: "center", marginTop: 48 }}
          onPress={() => {
            ClipboardUtils.pasteToClipboard(
              `我在「方泡泡」app 开好了房间，快来打开方泡泡APP加入房间和我一起互动吧。房间号:${roomId}`
            );
            ToastGlobal.show("复制成功，快去分享邀请好友吧");
          }}
        >
          <Image source={require("@res/copy.png")} style={{ width: 48, height: 48 }} resizeMode={"cover"} />
          <Text style={{ textAlign: "center", marginTop: 16 }}>复制房间号并且分享</Text>
        </Pressable>
      }

      <UIButton
        onPress={() => {
          if (users.length >= 2) {
            gotoStart();
          } else {
            ToastGlobal.show("房间人数必须2个人才能开始呢");
          }
        }}
        containerStyle={{
          width: "80%",
          position: "absolute",
          bottom: 16
        }}
      >
        进入房间
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
