import { FangHeApi } from "../../services/api";

class iOSStore {
  async getIosShellParams() {
    const response = await FangHeApi.get("/app/key-value/get", { key: "ios_1.0.0_app_store_shell" });
    if (response.code === 200) {
      return response.data.unValue;
    } else {
      return false;
    }
  }
}

const iosStore = new iOSStore();
export default iosStore;
