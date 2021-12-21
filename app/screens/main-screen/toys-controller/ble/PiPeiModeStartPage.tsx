import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Header } from "../../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { WSApi } from "../api/WebSocketApi";
import { PiPeiIngView } from "./pipei/PiPeiIngView";
import ToastGlobal from "../../../../utils/Toast";

export const PiPeiModeStartPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"匹配模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.pop());
        }}
      />
      <Content />
    </SafeAreaView>
  );
};

const Content = () => {
  const [piPeiIng, setPiPeiIng] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Image
        source={require("../../../../../assets/pipebig.png")}
        style={{ width: "100%", height: "60%" }}
        resizeMode={"contain"}
      />

      <Button
        style={{ marginLeft: 16, marginRight: 16, marginBottom: 32 }}
        onPress={() => {
          WSApi.enterMatch(2)
            .then(v => {
              if (v.code === 200) {
                setPiPeiIng(true);
              } else {
                setPiPeiIng(true);
              }
              console.log("v");
            })
            .catch(err => {
              setPiPeiIng(true);
              console.log("err");
            });
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16
          }}
        >
          立即匹配
        </Text>
      </Button>
      {piPeiIng && (
        <PiPeiIngView
          onTimeOut={() => {
            setPiPeiIng(false);
            ToastGlobal.show("暂时没有匹配到好友，请您重试进行匹配");
          }}
          onCancel={() => {
            setPiPeiIng(false);
          }}
        />
      )}
    </View>
  );
};
