import { useEffect, useState } from "react";
import { ApiConstant } from "../screens/main-screen/HomeApi";
import ToastGlobal from "../utils/Toast";
import { UserModel } from "../services/local/UserCookieStore";

export const userInfoMemory = { cookie: "", mobile: "" };

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserModel>(undefined);
  const _ = require("lodash");

  useEffect(() => {
    function handleStatusChange(user: UserModel) {
      if (!_.isEqual(userInfo, user)) {
        userInfoMemory.cookie = user.cookie;
        userInfoMemory.mobile = user.mobile;
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
