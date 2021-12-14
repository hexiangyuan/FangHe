import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../../components";
import { Image, ImageSourcePropType, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { userInfoMemory, useUserInfo } from "../../../../hooks/user";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../../../../navigation";
import ToastGlobal from "../../../../utils/Toast";
import { ClipboardUtils } from "../../../../utils/Clipboard";

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
  const ws = React.useRef(new WebSocket("ws://fangpaopao.cn:8089/websocket/chat/")).current;

  useEffect(() => {
    ws.onopen = () => {
      console.log("ws on open");
    };
    ws.onclose = e => {
      console.log("ws on close", e.message);
    };
    ws.onerror = e => {
      console.log("ws on onerror", e.message);
    };
    ws.onmessage = e => {
      console.log("ws on mesg", e);
    };
  }, []);

  const gotoStart = () => {
    RootNavigation.push("ZiZhuModePage");
  };

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "center", flex: 1, height: "100%" }}>
      <Text style={{ fontSize: 48, letterSpacing: 30 }}>{roomId}</Text>

      {userInfo && (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
          <User name={userInfo.mobie.substr(-4)} img={require("@res/room_header_img.png")} />
          <User name={userInfo.mobie.substr(-4)} img={require("@res/room_header_img2.png")} />
        </View>
      )}

      {(
        <Pressable
          style={{ alignItems: "center", marginTop: 48 }}
          onPress={() => {
            ClipboardUtils.pasteToClipboard(`我在「方泡泡」app 开好了房间，快来打开方泡泡APP加入房间和我一起互动吧。房间号:${roomId}`);
            ToastGlobal.show("复制成功，快去分享邀请好友吧");
          }}
        >
          <Image source={require("@res/copy.png")} style={{ width: 48, height: 48 }} resizeMode={"cover"} />
          <Text style={{ textAlign: "center", marginTop: 16 }}>复制房间号分析</Text>
        </Pressable>
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
