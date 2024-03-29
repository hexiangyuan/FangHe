import { FangHeApi } from "../../services/api";

export class ApiConstant {
  static getUserInfo() {
    return FangHeApi.get("/user/get");
  }
}

function getHomeList(request: {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  page: number;
  pagesize: number;
}) {
  return FangHeApi.post("/home/shop/list", request);
}

function shopDetail(id: number) {
  return FangHeApi.get("/shop/detail", { id: id });
}

function shopDetailProductList(id: number) {
  return FangHeApi.get("/shop/product/list", { shopId: id });
}

function productDetail(id: number) {
  return FangHeApi.get("/product/detail", { id: id });
}

function orderSubmit(request: { productId: number; couponReceiveId?: number; quantity: number; time: string }) {
  return FangHeApi.post("/order/create", request);
}

function getVerificationCode(mobile: string) {
  return FangHeApi.get("/common/verification-code", { mobile: mobile });
}

function loginMobile(request: { mobile: string; verificationCode: string; invitedCode?: string }) {
  return FangHeApi.post("/login/mobile", request);
}

function orderList(page: number) {
  return FangHeApi.get("/order/list", {
    pageSize: 200,
    page: page
  });
}

function pictureUpload(file: { uri: string; name: string; type: string }) {
  const body = new FormData();
  console.log(file);
  body.append("file", file);
  body.append("fileName", file.name + ".jpg");
  return FangHeApi.post("/picture/upload", body);
}

/**
 * 支付的预付款
 * @param orderId
 */
function cancelOrder(orderId: number) {
  return FangHeApi.get("/order/canelOrder", { orderId: orderId });
}

/**
 * 支付的预付款
 * @param orderId
 */
function orderPrePay(orderId: number) {
  return FangHeApi.get("/order/prePay", { orderId: orderId });
}

/**
 * 支付宝的预付款
 * @param orderId
 */
function orderAliPrePay(orderId: number) {
  return FangHeApi.get("/order/getAlipaySign", { orderId: orderId });
}

function getOrderInfo(orderId: number) {
  return FangHeApi.get("/order/getOrder", { orderId: orderId });
}

function getAllCouponList() {
  return FangHeApi.post("/coupon/list");
}

/**
 * 获取Product 可用的优惠券
 * @param productId 商品ID
 */
function getProductCouponList(productId: number) {
  return FangHeApi.get("/coupon/list/product", { productId: productId });
}

function updateShopInfo(req: {
  id: number;
  img: string;
  isForAppStore: boolean;
  shopName: string;
  score: number;
  averPrice: number;
  tag: string[];
  info: string;
  shopDetailsImgs: string[];
  contactMobie: string;
  shopAddress: string;
  latitude: string;
  longitude: string;
}) {
  return FangHeApi.post("/shop/update", req);
}

const HomeApi = {
  getHomeList,
  shopDetail,
  shopDetailProductList,
  productDetail,
  orderSubmit,
  getVerificationCode,
  loginMobile,
  orderList,
  pictureUpload,
  orderPrePay,
  orderAliPrePay,
  getOrderInfo,
  updateShopInfo,
  getAllCouponList,
  getProductCouponList,
  cancelOrder
};

export default HomeApi;
