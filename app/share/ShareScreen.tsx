import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";
import { Header } from "../components";
import FastImage from "react-native-fast-image";
import QRCode from "react-native-qrcode-svg";
import { Colors } from "../theme/Theme";
import { useUserInfo } from "../screens/hooks/user";

const ShareScreen = () => {
  const windows = useWindowDimensions();
  const userInfo = useUserInfo();

  const [shareUrl, setShareUrl] = useState("https://fangpaopao.cn?type=2");

  useEffect(() => {
    if (userInfo && userInfo.myCode) {
      setShareUrl("https://fangpaopao.cn?type=2" + "&code=" + userInfo.myCode);
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={{ backgroundColor: "rgba(103,117,131,1)", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1 }}>
          <View style={{ margin: 12 }}>
            <FastImage
              style={{
                width: windows.width - 24,
                height: (windows.width - 24) / 1.75,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
              }}
              source={{
                uri: "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/image/1203428f017640cda17d02f81b8e337c.jpg"
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View
              style={{
                alignItems: "center",
                paddingTop: 16,
                backgroundColor: "white",
                paddingBottom: 16,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
              }}
            >
              <QRCode
                value={shareUrl}
                color={Colors.primaryDark}
                logo={require("../../assets/app-icon.png")}
                logoSize={48}
                size={windows.width / 3}
                backgroundColor={"transparent"}
              />
              <Text style={{ fontSize: 30, marginTop: 16, fontWeight: "bold" }}>方泡泡 APP</Text>
            </View>
          </View>
        </View>
        <Pressable style={{ alignItems: "center" }}>
          <Image source={require("../../assets/weixin_icon.png")} style={{ width: 48, height: 48 }} />
          <Text style={{ color: "white", marginTop: 8 }}>分享到微信</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ShareScreen;
