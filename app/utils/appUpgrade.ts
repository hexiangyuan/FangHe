import {
  downloadApk,
  versionName,
  versionCode,
  openAPPStore,
  checkIOSUpdate,
  addDownLoadListener
} from "rn-app-upgrade";
import { Platform } from "react-native";
import VersionNumber from "react-native-version-number";

import axios from "axios";

import compare from "semver";

export class AppUpgrade {
  static checkUpdate() {
    // 可通过RN.versionName获取apk版本号和远程版本号进行比较
    if (Platform.OS === "android") {
    } else {
    }
  }

  static checkAppVersion() {
    const platform = Platform.OS;
    axios
      .get("https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopaoappversion")
      .then(response => {
        return response.data[platform]["min_app_version"];
      })
      .then(app => {
      compare.value()
      });
  }
}
