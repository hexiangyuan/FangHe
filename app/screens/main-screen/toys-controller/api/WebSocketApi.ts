import { FangHeApi } from "~/services/api";

function createRoom() {
  return FangHeApi.post("/websocket/createRoom");
}

function enterRoom(code: string) {
  return FangHeApi.get("/websocket/entRoom", { code: code });
}

function exitRoom() {
  return FangHeApi.post("websocket/exitRoom");
}

function enterMatch(gender: number) {
  return FangHeApi.get("/websocket/enterMatch", { gender: gender });
}

function getUserInfo() {
  return FangHeApi.get("websocket/getUserInfo");
}

function getRoomInfo() {
  return FangHeApi.get("websocket/getRoomInfo");
}

export const WSApi = {
  createRoom,
  enterRoom,
  exitRoom,
  enterMatch,
  getUserInfo,
  getRoomInfo
};
