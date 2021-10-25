import React from "react";
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { Icon } from "../components";
import Clipboard from "@react-native-community/clipboard";

export function WXCustomerService(props: { onClosePressed: () => void }) {
  const windows = useWindowDimensions();
  const copyToClipboard = (string: string) => {
    Clipboard.setString(string);
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={props.onClosePressed}>
        <Icon
          icon={"close"}
          style={{ height: 16, width: 16 }}
          containerStyle={{ flexDirection: "row", width: "100%", justifyContent: "flex-end" }}
        />
      </Pressable>
      <Image
        style={{ width: (windows.width / 3) * 2, height: (windows.width / 3) * 2 }}
        source={require("../../assets/wx_customer_qr.jpeg")}
        width={windows.width / 3}
        height={windows.width / 3}
        resizeMode={"stretch"}
      />
      <Text style={{ fontSize: 16, marginBottom: 24, textAlign: "center", marginTop: 60 }}>
        请截图保存相册后，扫一扫添加客服微信「趣泡体验馆@方泡泡」
      </Text>
      <Pressable
        onPress={() => {
          copyToClipboard("qu_pao2");
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 8 }}>官方微信客服号：qu_pao2</Text>
          <Icon icon={"copy"} containerStyle={{ width: 12, height: 12 }} style={{ width: 12, height: 12 }} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          copyToClipboard("17601238095");
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Text style={{ marginRight: 8 }}>官方微信手机号：17521368841</Text>
          <Icon icon={"copy"} containerStyle={{ width: 12, height: 12 }} style={{ width: 12, height: 12 }} />
        </View>
      </Pressable>
    </View>
  );
}
