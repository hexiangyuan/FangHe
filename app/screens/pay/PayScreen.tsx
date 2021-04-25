import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { View, Text, Image, ImageSourcePropType, Pressable } from "react-native";
import { Header } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import { useRoute } from "@react-navigation/native";
import WeChatSdk from "../../weixin/WeChatSdk";
import AliPay from "../../weixin/AliPay";
import { RootNavigation } from "../../navigation";

const PayMethod = (props: { logo: ImageSourcePropType; title: string; checked: boolean }) => {
  return (
    <View style={{ flexDirection: "row", width: "100%", padding: 16 }}>
      <Image source={props.logo} style={{ width: 32, height: 32 }} resizeMode={"center"} />
      <Text style={{ fontSize: 16, marginLeft: 12, color: "#333", flex: 1 }}>{props.title}</Text>
      {props.checked && (
        <Image source={require("../../../assets/checkbox_checked.png")} style={{ width: 24, height: 24 }} />
      )}
    </View>
  );
};

const PayScreen = () => {
  const [payMethod, setPayMethod] = useState(0);

  const params = useRoute().params;

  const pay = useCallback(() => {
    switch (payMethod) {
      case 0:
        WeChatSdk.payOrder(params["orderId"])
          .then(value => {
            RootNavigation.goBack();
          })
          .catch(e => {
            console.log(e.toString());
          });
        break;
      case 1:
        AliPay.payOrder(params["orderId"])
          .then(value => {
            RootNavigation.goBack();
          })
          .catch(e => {
            console.log(e);
          });
        break;
    }
  }, [params, payMethod]);

  const amountString = params["amount"] / 100;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header headerText={"收银台"} />
        <View style={{ alignItems: "center", marginVertical: 26 }}>
          <Text style={{ color: "#666" }}>支付金额</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ color: Colors.primaryDark, fontSize: 16, fontWeight: "bold" }}>¥</Text>
            <Text style={{ color: Colors.primaryDark, fontSize: 24, marginLeft: 8, fontWeight: "bold" }}>
              {amountString}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", backgroundColor: "rgb(249,249,249)", padding: 16 }}>
          <Text style={{ color: "#666", fontSize: 16 }}>请选择支付方式</Text>
        </View>
        <Pressable
          onPress={() => {
            setPayMethod(0);
          }}
        >
          <PayMethod
            logo={require("../../../assets/weixin_pay_logo.png")}
            title={"微信支付"}
            checked={payMethod === 0}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setPayMethod(1);
          }}
        >
          <PayMethod
            logo={require("../../../assets/ali_pay_logo.png")}
            title={"支付宝支付"}
            checked={payMethod === 1}
          />
        </Pressable>
      </View>
      <View style={{ padding: 16 }}>
        <UIButton containerStyle={{ width: "100%" }} onPress={pay}>
          支付
        </UIButton>
      </View>
    </SafeAreaView>
  );
};

export default PayScreen;
