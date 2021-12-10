import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Header } from "../../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";

export const PiPeiModeStartPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"匹配模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      />
      <Content />
    </SafeAreaView>
  );
};

const Content = () => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Image
        source={require("../../../../../assets/pipebig.png")}
        style={{ width: "100%", height: "60%" }}
        resizeMode={"contain"}
      />

      <Button style={{ marginLeft: 16, marginRight: 16, marginBottom: 32 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16
          }}
        >
          立即匹配
        </Text>
      </Button>
    </View>
  );
};
