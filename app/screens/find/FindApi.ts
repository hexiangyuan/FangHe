import {FangHeApi} from "../../services/api";

/**
 * 获取美女图册列表
 * @param page
 */
function getImgsList(page) {
  return FangHeApi.get("/app/imgs/list", {page: page, pageSize: 20})
}

/**
 * 获取美女图册详情
 * @param id 图册id
 */
function getImgsDetail(id) {
  return FangHeApi.get("/app/imgs/detail", {id: id})
}

/**
 * 添加图册喜欢
 * @param id 图册id
 */
function addImgsLike(id: number) {
  return FangHeApi.get("/app/imgs/likes/add", {id: id})
}

/**
 * 取消图册喜欢
 * @param id 图册id
 */
function cancelImgsLike(id: number) {
  return FangHeApi.get("/app/imgs/likes/cancel", {id: id})
}

/**
 * 添加图册收藏
 * @param id 图册id
 */
function addImgsCollect(id: number) {
  return FangHeApi.get("/app/imgs/collect/add", {id: id})
}

/**
 * 取消图册收藏
 * @param id 图册id
 */
function cancelImgsCollect(id: number) {
  return FangHeApi.get("/app/imgs/collect/cancel", {id: id})
}

/**
 * 获取图册评论列表
 * @param id 图册id
 */
function getImgsCommentList(id: number, page: number) {
  return FangHeApi.get("/app/imgs/comment/list", {id: id, page: page, pageSize: 20})
}

/**
 * 添加图册评论
 * @param id 图册id
 */
function addImgsComment(request: { id: number; content: string; img: string }) {
  return FangHeApi.post("/app/imgs/comment/add", request)
}

/**
 * 删除图册评论
 * @param id
 */
function deleteImgsComment(id: number) {
  return FangHeApi.get("/app/imgs/comment/delete", {id: id})
}

const FindApi = {
  getImgsList,
  getImgsDetail,
  addImgsLike,
  cancelImgsLike,
  addImgsCollect,
  cancelImgsCollect,
  getImgsCommentList,
  addImgsComment,
  deleteImgsComment
};

export default FindApi