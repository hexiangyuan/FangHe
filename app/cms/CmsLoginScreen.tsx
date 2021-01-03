import { SafeAreaView, TextInput, View } from "react-native";
import React from "react";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../navigation";
import { useNavigation } from "@react-navigation/native";

export const CmsLoginScreen = () => {


  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12
        }}
      >
        <TextInput style={{ width: "100%" }} placeholder={"请输入账号"} />
        <View style={{ height: 32 }} />
        <TextInput style={{ width: "100%" }} placeholder={"请输入密码"} textContentType={"password"} />
        <UIButton
          containerStyle={{
            width: "100%",
            marginTop: 72
          }}
          onPress={() => {
            RootNavigation.push( "CmsMainScreen");
          }}
        >
          登录管理后台
        </UIButton>
      </View>
    </SafeAreaView>
  );
};
