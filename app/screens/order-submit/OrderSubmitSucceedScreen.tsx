import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Image, View, Text } from "react-native";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../../navigation";

export const OrderSubmitSucceedScreen = () => {
  function onReview() {
    RootNavigation.push("OrderListScreen");
  }

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: "row-reverse",
            marginTop: 16
          }}
        >
          <Text
            style={{
              color: "#333",
              fontSize: 16,
              marginRight: 12
            }}
            onPress={() => {
              RootNavigation.push("OrderListScreen");
            }}
          >
            完成
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 80
          }}
        >
          <Image
            source={require("./img_succeed.png")}
            style={{
              width: 80,
              height: 80
            }}
          />
          <Text
            style={{
              marginTop: 24,
              fontSize: 20,
              color: "#333",
              height: 40
            }}
          >
            预约成功
          </Text>

          <View style={{ height: 48, backgroundColor: "blue" }} />

          <UIButton onPress={onReview} containerStyle={{ width: "70%" }}>
            查看我的预约
          </UIButton>
        </View>
      </View>
    </SafeAreaView>
  );
};
