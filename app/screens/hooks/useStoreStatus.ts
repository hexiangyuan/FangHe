import { useState, useEffect } from "react";
import { Platform } from "react-native";
import iosStore from "../../models/user-store/ios-store-store";

export function useStoreStatus() {
  const [storeStatus, setStoreStatus] = useState<boolean>(() => {
    if (Platform.OS === "ios") {
      return undefined;
    } else {
      return false;
    }
  });

  useEffect(() => {
    function handleStatusChange(isStoreReviewStatus: boolean) {
      setStoreStatus(isStoreReviewStatus);
    }

    if (Platform.OS === "ios") {
      iosStore
        .getIosShellParams()
        .then(bool => {
          handleStatusChange(bool);
        })
        .catch(e => {
          handleStatusChange(true);
        });
    }
  });

  return storeStatus;
}
