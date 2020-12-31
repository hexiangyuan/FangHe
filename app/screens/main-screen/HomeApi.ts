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
  return FangHeApi.get("/shop/product/list", { id: id });
}

const HomeApi = {
  getHomeList,
  shopDetail,
  shopDetailProductList
};

export default HomeApi;
