import HomeApi from "../main-screen/HomeApi";
import { ItemProps } from "./UseCouponListScreen";

export default class CouponUtils {
  static async getCouponList(price?: number) {
    const resp = await HomeApi.getAllCouponList();
    const data = resp["data"] as ItemProps[];
    if (data == undefined || resp['code'] != 200) {
      return null;
    } else {
      const _data = data.filter(value => value.status === 0);
      _data.forEach(value => {
        value.available = price ? price >= value.fullMoney : true;
      });
      _data.sort((a, b) => Number(!!a) - Number(!!b));
      return _data;
    }
  }
}
