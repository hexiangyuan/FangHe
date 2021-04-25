import * as WeChat from "react-native-wechat-lib";
import HomeApi from "../screens/main-screen/HomeApi";
import ToastGlobal from "../utils/Toast";

const wxUniversalLink = "https://fangpaopao.cn/";

class WeChatSdk {
  static registerApp() {
    WeChat.registerApp("wx0c50b0961074ff2d", wxUniversalLink)
      .then(res => {
        console.log("WeiXin-Sdk", "初始化成功");
      })
      .catch(e => {
        console.log("WeiXin-Sdk", "初始化失败");
      });
  }

  static async payOrder(orderId: number) {
    const resp = await HomeApi.orderPrePay(orderId);
    if (resp["code"] === 200) {
      const { partnerId, prepayId, nonceStr, timeStamp, packageValue, sign } = resp["data"];
      WeChat.pay({
        nonceStr: nonceStr,
        package: packageValue,
        prepayId: prepayId,
        sign: sign,
        timeStamp: timeStamp,
        partnerId: partnerId
      })
        .then(value => {
          console.log(value);
        })
        .catch(e => {
          ToastGlobal.show(e.toString());
        });
    } else {
      ToastGlobal.show(resp["errorMsg"]);
    }
  }
}

export default WeChatSdk;
