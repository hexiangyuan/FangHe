import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
  ActivityIndicator
} from "react-native";
import { Header } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import { useRoute } from "@react-navigation/native";
import WeChatSdk from "../../weixin/WeChatSdk";
import AliPay from "../../weixin/AliPay";
import { NativeEvent } from "./NativeEvent";

enum WXPAYRESPCODE {
  ERR_USER_CANCEL = -2,
  OK = 0
}

enum PAYSTATUS {
  READY = 0,
  DEALING,
  SUCCEED,
  FAILED
}

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

const PayDealView = (props: { payStatus: PAYSTATUS; errMsg: string }) => {
  switch (props.payStatus) {
    case PAYSTATUS.SUCCEED:
      return (
        <View style={{ flex: 1, marginTop: 100, alignItems: "center" }}>
          <Image
            style={{ width: 96, height: 96 }}
            source={require("../../../assets/pay_succeed_icon.png")}
            resizeMode={"center"}
          />
          <Text style={{ fontSize: 24, marginTop: 16 }}>支付成功</Text>
        </View>
      );
    case PAYSTATUS.FAILED:
      return (
        <View style={{ flex: 1, marginTop: 100, alignItems: "center" }}>
          <Image
            style={{ width: 96, height: 96 }}
            source={require("../../../assets/pay_failed_icon.png")}
            resizeMode={"center"}
          />
          <Text style={{ fontSize: 24, marginTop: 16 }}>支付失败</Text>
          <Text style={{ fontSize: 16, marginTop: 12, color: "#666" }}>{props.errMsg}</Text>
        </View>
      );
    default:
      return (
        <View style={{ flex: 1, marginTop: 100, alignItems: "center" }}>
          <ActivityIndicator animating={true} color={"red"} size={"large"} />
          <Text style={{ fontSize: 24, marginTop: 16 }}>支付中</Text>
        </View>
      );
  }
};

const PayScreen = () => {
  const [payMethod, setPayMethod] = useState(0);

  const params = useRoute().params;

  const [payState, setPayState] = useState(PAYSTATUS.READY);

  useEffect(() => {
    const WXRespEvent = NativeEvent.emitter()?.addListener("WXPayResp", data => {
      const errCode = data["errCode"];
      if (errCode == WXPAYRESPCODE.OK) {
        setPayState(PAYSTATUS.SUCCEED);
      } else {
        setPayState(PAYSTATUS.FAILED);
        if (data["errCode"] === WXPAYRESPCODE.ERR_USER_CANCEL) {
          setErrMsg("您取消了支付,请重新支付");
        } else {
          setErrMsg("由于微信原因支付失败，请您稍后重试");
        }
      }
    });
    return () => {
      WXRespEvent?.remove();
    };
  }, []);

  const [errMsg, setErrMsg] = useState("");

  const pay = useCallback(() => {
    switch (payMethod) {
      case 0:
        WeChatSdk.payOrder(params["orderId"])
          .then(value => {
            console.log("aaaaaaaa",value)
            setPayState(PAYSTATUS.DEALING);
          })
          .catch(e => {
            setPayState(PAYSTATUS.FAILED)
            setErrMsg(e["errorMsg"])
          });
        break;
      case 1:
        AliPay.payOrder(params["orderId"])
          .then(value => {
            console.log("Ali支付", value);
            setPayState(PAYSTATUS.DEALING);
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
      <Header headerText={"收银台"} />
      {payState === PAYSTATUS.READY && (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginVertical: 26 }}>
            <Text style={{ color: "#666" }}>支付金额</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ color: Colors.primaryDark, fontSize: 16, fontWeight: "bold" }}>¥</Text>
              <Text
                style={{
                  color: Colors.primaryDark,
                  fontSize: 24,
                  marginLeft: 8,
                  fontWeight: "bold"
                }}
              >
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
          <View style={{ padding: 16 }}>
            <UIButton containerStyle={{ width: "100%" }} onPress={pay}>
              支付
            </UIButton>
          </View>
        </View>
      )}
      {payState !== PAYSTATUS.READY && <PayDealView payStatus={payState} errMsg={errMsg} />}
    </SafeAreaView>
  );
};
export default PayScreen;
