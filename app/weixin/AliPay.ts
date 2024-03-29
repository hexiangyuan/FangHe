import Alipay, { OrderResult } from "@uiw/react-native-alipay";
import HomeApi from "../screens/main-screen/HomeApi";

const APP_ID = "2021002138698762";

export default class AliPaySDK {
  static init() {
    const scheme = "alipay" + APP_ID;
    Alipay.setAlipayScheme(scheme);
  }

  static async pay(payInfo: string): Promise<OrderResult> {
    // 支付宝端支付
    // payInfo 是后台拼接好的支付参数
    return await Alipay.alipay(payInfo);
  }

  static setUrlSchema(schema: string) {
    Alipay.setAlipayScheme(schema);
  }

  static async prePayOrder(orderId: number) {
    return await HomeApi.orderAliPrePay(orderId);
  }
}
