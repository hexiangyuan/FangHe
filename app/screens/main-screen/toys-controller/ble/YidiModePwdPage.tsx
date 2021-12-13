import React from "react";
import { View } from "react-native";
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
        headerText={"模式选择"}
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
  const onChangeVerifyCode = text => {
    console.log("text====>", text);
    if (text.length === 4) {
      RootNavigation.push("YiDiModeRoom", { roomId: text });
    }
  };

  return (
    <View style={{ justifyContent: "center", alignContent: "center", flex: 1, height: "100%" }}>
      <VerifyCode verifyCodeLength={4} onChangeText={text => onChangeVerifyCode(text)} />
    </View>
  );
};
