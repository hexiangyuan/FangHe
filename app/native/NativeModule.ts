import { NativeModules } from "react-native";

class FangPaoPaoNativeModule {
  static async getAppVersion(): Promise<string> {
    const fangHeNativeModule = NativeModules.FangHeNativeModule;
    return await fangHeNativeModule.getAppVersion();
  }

  static async getAppBuildNumber(): Promise<number> {
    const fangPaopaNativeModule = NativeModules.FangHeNativeModule;
    return await fangPaopaNativeModule.getAppBuildNumber();
  }
}

export default FangPaoPaoNativeModule;
