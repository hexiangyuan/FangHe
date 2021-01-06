import { FangHeApi } from "../../services/api";
import { DEFAULT_API_CONFIG } from "../../services/api/api-config";

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

function orderList(page: number) {
  return FangHeApi.get("/order/list", {
    pageSize: 20,
    page: page
  });
}

function pictureUpload(file: { uri: string; name: string; type: string }) {
  const body = new FormData();
  console.log(file);
  body.append("file", file);
  body.append("fileName", file.name + ".jpg");
  // return fetch(DEFAULT_API_CONFIG.url + "/picture/upload", {
  //   // Your POST endpoint
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "multipart/form-data"
  //   },
  //   body: body
  // }); // This
  return FangHeApi.post("/picture/upload", body);
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
  pictureUpload
};

export default HomeApi;
