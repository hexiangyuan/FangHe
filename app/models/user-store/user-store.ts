import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { UserModel } from "../../services/local/UserCookieStore";
import StringUtils from "../../utils/ReularUtils";

export const UserStoreModel = types
  .model({
    mobile: types.optional(types.string, ""),
    cookie: types.optional(types.string, "")
  })
  .actions(self => ({
    loginSucceed(mobile: string, cookie: string) {
      self.mobile = mobile;
      self.cookie = cookie;
    },

    isLogin(): boolean {
      return !StringUtils.isEmpty(self.cookie);
    },

    logout() {
      self.cookie = "";
      self.mobile = "";
    }
  }));

export interface UserStore extends Instance<typeof UserStoreModel> {}

export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}

const UserStoreContext = createContext<UserStore>({} as UserStore);

export const UserStoreProvider = UserStoreContext.Provider;

export const userUserStore = () => useContext(UserStoreContext);

export function setupUserStore(user: UserModel) {
  console.log("user",user)
  if (user) {
    return UserStoreModel.create(user);
  } else {
    return UserStoreModel.create({
      mobile: "",
      cookie: ""
    });
  }
}
