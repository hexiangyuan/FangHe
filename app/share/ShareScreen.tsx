import { Image, ImageBackground, Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components";
import QRCode from "react-native-qrcode-svg";
import * as WeChat from "react-native-wechat-lib";
import { useUserInfo } from "../hooks/user";

const ShareScreen = () => {
  const windows = useWindowDimensions();
  const userInfo = useUserInfo();

  const [shareUrl, setShareUrl] = useState("https://fangpaopao.cn?type=2");

  useEffect(() => {
    if (userInfo && userInfo.myCode) {
      console.log("bbbbbbbbb", userInfo);
      setShareUrl("https://fangpaopao.cn?type=2" + "&code=" + userInfo.myCode);
    }
    console.log("aaaaaaaaa", userInfo);
  }, [userInfo]);

  const shareWebToWeiChat = useCallback(() => {
    WeChat.shareWebpage({
      title: "方泡泡邀请您体验",
      webpageUrl: shareUrl,
      thumbImageUrl: "https://fangpaopao.cn/static/media/app-icon.c0e3db0c.png",
      description: "高端智能硅胶 APP，在线预约体验",
      scene: 0
    })
      .then(v => {
        console.log(v);
      })
      .catch(e => {
        console.log(e);
      });
  }, [shareUrl]);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Header />
      <View style={{ flex: 1, marginHorizontal: 12, alignItems: "center", borderRadius: 4 }}>
        <Image
          style={{ flex: 1, width: "100%" }}
          source={require("../../assets/share-bg.png")}
          resizeMode={"contain"}
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            height: 100,
            width: "100%",
            marginTop: 8,
            justifyContent: "center",
            backgroundColor: "white"
          }}
        >
          <QRCode
            value={shareUrl}
            color={"black"}
            logo={require("../../assets/app-icon.png")}
            logoSize={18}
            size={windows.width / 5}
            backgroundColor={"transparent"}
          />
          <View style={{ flexDirection: "column", marginLeft: 48, alignItems: "flex-start" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>方泡泡 APP</Text>
            <Text style={{ fontSize: 14, marginTop: 16, fontWeight: "bold" }}>邀请新人立得99元优惠券</Text>
          </View>
        </View>
        <Pressable style={{ alignItems: "center", marginTop: 16 }} onPress={shareWebToWeiChat}>
          <Image source={require("../../assets/weixin_icon.png")} style={{ width: 48, height: 48 }} />
          <Text style={{ color: "white", marginTop: 8 }}>分享到微信</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ShareScreen;
