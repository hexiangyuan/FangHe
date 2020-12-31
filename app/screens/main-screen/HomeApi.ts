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

const HomeApi = {
  getHomeList,
  shopDetail,
  shopDetailProductList,
  productDetail
};

export default HomeApi;
