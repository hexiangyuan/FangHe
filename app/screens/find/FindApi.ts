import {FangHeApi} from "../../services/api";

function getImgsList(request: {
  page: number;
  pageSize: number;
}) {
  return FangHeApi.get("/app/imgs/list", request);
}

function getImgsDetail(request: {
  id: number
}) {
  return FangHeApi.get("/app/imgs/details", request);
}