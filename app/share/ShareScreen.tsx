import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";
import { Header } from "../components";
import FastImage from "react-native-fast-image";
import QRCode from "react-native-qrcode-svg";
import { Colors } from "../theme/Theme";

const ShareScreen = () => {
  const windows = useWindowDimensions();

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
                value="https://fangpaopao.cn?code=111111&type=2"
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
          <Text style={{ color: "white", marginTop: 8 }}>分享到微信好友</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ShareScreen;
