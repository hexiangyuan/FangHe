import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Header } from "../../../../components";
import { VerifyCode } from "./VerifyCode";
import { RootNavigation } from "../../../../navigation";

export const YidiModePwdPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"加入房间"}
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
  const onChangeVerifyCode = text => {
    console.log("text====>", text);
    if (text.length === 6) {
      RootNavigation.push("YiDiModeRoom", { roomId: text });
    }
  };

  return (
    <View style={{ justifyContent: "flex-start", alignContent: "center", flex: 1, height: "100%" }}>
      <Text style={{ textAlign: "center", marginTop: 16, fontSize: 24, paddingHorizontal: 16 }}>
        请向房主索要房间码,输入房间码进入房间</Text>
      <VerifyCode verifyCodeLength={6} onChangeText={text => onChangeVerifyCode(text)} />
    </View>
  );
};
