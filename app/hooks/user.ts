import { useEffect, useState } from "react";
import { ApiConstant } from "../screens/main-screen/HomeApi";
import ToastGlobal from "../utils/Toast";

interface UserInfo {
  id: number;
  mobile: string;
  myCode: string;
}

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>(undefined);
  const _ = require("lodash");

  useEffect(() => {
    function handleStatusChange(user: UserInfo) {
      if (!_.isEqual(userInfo, user)) {
        setUserInfo(user);
      }
    }

    ApiConstant.getUserInfo()
      .then(value => {
        if (value["code"] === 200) {
          handleStatusChange(value["data"]);
        }
      })
      .catch(error => {
        ToastGlobal.show(error.toString());
      });
  }, []);
  return userInfo;
}
