import Alipay, { OrderResult } from "@uiw/react-native-alipay";
import HomeApi from "../screens/main-screen/HomeApi";
import WeChat from "react-native-wechat-lib";
import ToastGlobal from "../utils/Toast";

const APP_ID = "2021002138698762";

export default class AliPay {
  static init() {
    const scheme = "alipay" + APP_ID;
    Alipay.setAlipayScheme(scheme);
  }

  static async _pay(payInfo: string): Promise<OrderResult> {
    // 支付宝端支付
    // payInfo 是后台拼接好的支付参数
    return await Alipay.alipay(payInfo);
  }

  static async payOrder(orderId: number) {
    const resp = await HomeApi.orderAliPrePay(orderId);
    if (resp["code"] === 200) {
      const data = resp["data"];
      return await AliPay._pay(data);
    } else {
      return Promise.reject("预付款接口失败");
    }
  }
}
