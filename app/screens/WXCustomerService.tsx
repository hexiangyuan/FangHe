import React from "react";
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { Icon } from "../components";

export function WXCustomerService(props: { onClosePressed: () => void }) {
  const windows = useWindowDimensions();
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
        source={require("../../assets/wx_customer_qr.png")}
        width={windows.width / 3}
        height={windows.width / 3}
        resizeMode={"stretch"}
      />
      <Text style={{ fontSize: 16, marginBottom: 24, textAlign: "center", marginTop: 60 }}>
        请截图保存相册后，扫一扫添加客服微信客服「方泡泡」好友
      </Text>
    </View>
  );
}
