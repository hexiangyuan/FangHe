import { FangHeApi } from "../../services/api";

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
  return FangHeApi.post("/product/detail?id=5", { id: id });
}

function orderSubmit(request: { productId: number; quantity: number; time: string }) {
  return FangHeApi.post("/order/create", request);
}

function getVerificationCode(mobile: string) {
  return FangHeApi.get("/common/verification-code", { mobile: mobile });
}

function loginMobile(request: { mobile: string; verificationCode: string }) {
  return FangHeApi.post("/login/mobile", request);
}

const HomeApi = {
  getHomeList,
  shopDetail,
  shopDetailProductList,
  productDetail,
  orderSubmit,
  getVerificationCode,
  loginMobile
};

export default HomeApi;
