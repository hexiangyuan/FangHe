import { Platform } from "react-native";
import FangPaoPaoNativeModule from "../native/NativeModule";
import { FangHeApi } from "../services/api";

type AppNeedUpdate = {
  needUpdate: boolean;
  updateMode: number;
  desc?: string;
};

export default class AppUpdate {
  /**
   * 检查app是否需要更新
   * @returns 是否需要更新
   */
  static async checkUpdate(): Promise<AppNeedUpdate> {
    const appVersion = await FangPaoPaoNativeModule.getAppBuildNumber();
    const appUpdateApi = await FangHeApi.get("/app/key-value/get", { key: "app_update_min_version" });
    if (appUpdateApi["code"] === 200 && appUpdateApi["data"]) {
      const apiJson = JSON.parse(appUpdateApi["data"]["unValue"]);
      let appInfo: {
        min_app_version: number;
        mode: number;
        desc: string;
      };
      switch (Platform.OS) {
        case "ios":
          appInfo = apiJson["ios"];
          break;
        case "android":
          appInfo = apiJson["android"];
          break;
      }

      console.log("11111111", appVersion);

      return { needUpdate: appVersion < appInfo.min_app_version, updateMode: appInfo.mode, desc: appInfo.desc };
    } else {
      return { needUpdate: false, updateMode: 0 };
    }
  }
}
