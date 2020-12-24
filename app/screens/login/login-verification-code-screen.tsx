import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import { useRoute } from "@react-navigation/native";

export const MobileLoginVerificationScreen = () => {
  const route = useRoute<any>();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 24, marginBottom: 80, fontSize: 24, color: "#333", fontWeight: "bold" }}>
        请输入6位数验证码
      </Text>
      <Text style={{ fontSize: 14, color: "#333" }}>已发到:+86 {route.mobile}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, color: "#666" }}>中国+86</Text>
        <TextInput
          placeholder={"请输入您的手机号"}
          textContentType={"telephoneNumber"}
          style={{ fontSize: 16, padding: 0, color: "#666" }}
        />
        <TouchableOpacity>
          <Icon icon={"bullet"} style={{ width: 16, height: 16 }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: Colors.primary, marginTop: 8 }} />

      <View style={{ width: "100%", paddingHorizontal: 12, marginTop: 72 }}>
        <UIButton containerStyle={{ flex: 1 }}>获取验证码</UIButton>
      </View>
      <Text style={{ fontSize: 14, color: "#666" }}>未注册的手机号码验证后自动注册</Text>
    </View>
  );
};
