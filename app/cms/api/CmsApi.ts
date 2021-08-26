import { FangHeApi } from "../../services/api";

class CmsAPI {
  static sendSmsApi(message: string) {
    return FangHeApi.post("/common/sendMessageToAllUser", { message: message });
  }
}

export default CmsAPI;
