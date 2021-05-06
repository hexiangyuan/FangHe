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


/**
 * 获取短视频列表
 * @param page
 */
function getVideoList(page) {
  return FangHeApi.get("/app/video/list", {page: page, pageSize: 20})
}

/**
 * 获取短视频详情
 * @param id 图册id
 */
function getVideoDetail(id) {
  return FangHeApi.get("/app/video/detail", {id: id})
}

/**
 * 添加短视频喜欢
 * @param id 图册id
 */
function addVideoLike(id: number) {
  return FangHeApi.get("/app/video/likes/add", {id: id})
}

/**
 * 取消短视频喜欢
 * @param id 图册id
 */
function cancelVideoLike(id: number) {
  return FangHeApi.get("/app/video/likes/cancel", {id: id})
}

/**
 * 添加短视频收藏
 * @param id 图册id
 */
function addVideoCollect(id: number) {
  return FangHeApi.get("/app/video/collect/add", {id: id})
}

/**
 * 取消短视频收藏
 * @param id 图册id
 */
function cancelVideoCollect(id: number) {
  return FangHeApi.get("/app/video/collect/cancel", {id: id})
}

/**
 * 获取短视频评论列表
 * @param id 图册id
 */
function getVideoCommentList(id: number, page: number) {
  return FangHeApi.get("/app/video/comment/list", {id: id, page: page, pageSize: 20})
}

/**
 * 添加短视频评论
 * @param id 图册id
 */
function addVideoComment(request: { id: number; content: string; img: string }) {
  return FangHeApi.post("/app/video/comment/add", request)
}

/**
 * 删除短视频评论
 * @param id
 */
function deleteVideoComment(id: number) {
  return FangHeApi.get("/app/video/comment/delete", {id: id})
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
  deleteImgsComment,
  getVideoList,
  getVideoDetail,
  addVideoLike,
  cancelVideoLike,
  addVideoCollect,
  cancelVideoCollect,
  getVideoCommentList,
  addVideoComment,
  deleteVideoComment
};

export default FindApi