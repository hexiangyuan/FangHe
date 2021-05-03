import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ImageSourcePropType, Pressable, ActivityIndicator, DeviceEventEmitter } from "react-native";
import { Header } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import { useRoute } from "@react-navigation/native";
import WeChatSdk from "../../weixin/WeChatSdk";
import AliPaySDK from "../../weixin/AliPay";
import { NativeEvent } from "./NativeEvent";
import HomeApi from "../main-screen/HomeApi";
import { interval, from, Subscription } from "rxjs";
import { mergeMap, filter, take } from "rxjs/operators";

/**
 * 轮训查找订单状态 每隔2s查一次，一共查询10次
 */

function getOrderStatus(orderId: number) {
  function getData(orderId) {
    return from(HomeApi.getOrderInfo(orderId)).pipe(filter(it => it["code"] === 200 && it["data"]["payStatus"] === 1));
  }
  return interval(3000).pipe(mergeMap(() => getData(orderId)));
}

enum WXPAYRESPCODE {
  ERR_USER_CANCEL = -2,
  OK = 0
}

enum ALIPAYRESULTCODE {
  OK = "9000"
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
      <Image source={props.logo} style={{ width: 32, height: 32 }} resizeMode={"cover"} />
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
            resizeMode={"cover"}
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
            resizeMode={"cover"}
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

  const [orderInfoSubscription, setOrderInfoSubscription] = useState<Subscription>(null);

  useEffect(() => {
    const WXRespEvent = NativeEvent.emitter()?.addListener("WXPayResp", data => {
      const errCode = data["errCode"];
      if (errCode == WXPAYRESPCODE.OK) {
        setPayState(PAYSTATUS.SUCCEED);
        DeviceEventEmitter.emit("OrderListChanged");
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

  useEffect(() => {
    if (payState == PAYSTATUS.SUCCEED) {
      console.log("payOrderStatusSubscribe", orderInfoSubscription);
      orderInfoSubscription?.unsubscribe();
    }
    return () => {
      console.log("payOrderStatusSubscribe", orderInfoSubscription);
      orderInfoSubscription?.unsubscribe();
    };
  }, [payState, orderInfoSubscription]);

  const pay = useCallback(() => {
    switch (payMethod) {
      case 0:
        WeChatSdk.payOrder(params["orderId"])
          .then(value => {
            setPayState(PAYSTATUS.DEALING);
          })
          .catch(e => {
            setPayState(PAYSTATUS.FAILED);
            setErrMsg(e["errorMsg"]);
          });
        break;
      case 1:
        AliPaySDK.prePayOrder(params["orderId"])
          .then(value => {
            if (value["code"] === 200) {
              setPayState(PAYSTATUS.DEALING);
              const payOrderStatusSubscribe = getOrderStatus(params["orderId"]).subscribe(succeed => {
                setPayState(PAYSTATUS.SUCCEED);
                DeviceEventEmitter.emit("OrderListChanged");
              });
              setOrderInfoSubscription(payOrderStatusSubscribe);
              return value["data"];
            } else {
              throw Error("支付失败 ，请稍后重试");
            }
          })
          .then(value => {
            return AliPaySDK.pay(value);
          })
          .then(value => {
            if (value && value.resultStatus == ALIPAYRESULTCODE.OK) {
              setPayState(PAYSTATUS.SUCCEED);
              DeviceEventEmitter.emit("OrderListChanged");
            } else {
              setPayState(PAYSTATUS.FAILED);
              setErrMsg(value?.memo ?? "支付宝支付失败，请您稍后");
            }
          })
          .catch(e => {
            setPayState(PAYSTATUS.FAILED);
            setErrMsg("支付宝支付失败，请您稍后重试");
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
