import { FangHeApi } from "../../services/api";
import { version } from "../../../package.json";

class iOSStore {
  async getIosShellParams() {
    const response = await FangHeApi.get("/app/key-value/get", { key: "ios_" + version + "_app_store_shell" });
    if (response.code === 200) {
      if (response.data.unValue === "true") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

const iosStore = new iOSStore();
export default iosStore;
