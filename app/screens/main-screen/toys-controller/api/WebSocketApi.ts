import { FangHeApi } from "~/services/api";

function createRoom() {
  return FangHeApi.post("/websocket/createRoom");
}

function enterRoom(code: string) {
  return FangHeApi.get("/websocket/entRoom", { code: code });
}

function exitRoom(code: string) {
  return FangHeApi.post("websocket/exitRoom  ");
}

export const WSApi = {
  createRoom,
  enterRoom,
  exitRoom
};
