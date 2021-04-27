import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Header } from "../../components";

const PayResultScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Image source={require("../../../assets/pay_succeed_icon.png")} />
      <Text>订单支付成功</Text>
    </View>
  );
};

export default PayResultScreen;
