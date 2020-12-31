import { useLocalStore } from "mobx-react-lite";
import ToastGlobal from "../../utils/Toast";
import RNLocation from "react-native-location";

/**
 * 通过 RN-location 获取位置
 */
export async function getLocation(): Promise<{ latitude: number; longitude: number }> {
  const errorToat = () => {
    ToastGlobal.show("获取定位信息失败，我们将无法为您推荐附近的店铺");
  };

  const hasPermission = await RNLocation.checkPermission({
    ios: "whenInUse",
    android: { detail: "fine" }
  });

  if (!hasPermission) {
    const granted = await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine"
      }
    });
    if (granted) {
      return await RNLocation.getLatestLocation({ timeout: 60000 });
    } else {
      errorToat();
      return {
        latitude: 0,
        longitude: 0
      };
    }
  } else {
    return await RNLocation.getLatestLocation({ timeout: 60000 });
  }
}

/**
 * 自定义 hook 获取位置
 */
export function useLocationStore() {
  // 推荐使用全局 Store 的规则来约束自定义 Hooks
  const store = useLocalStore(() => ({
    location: {
      latitude: 0,
      longitude: 0
    },
    updateLocation() {
      getLocation()
        .then(location => {
          store.location = location;
        })
        .catch(e => ToastGlobal.show(e.toString()));
    }
  }));
  return store;
}
