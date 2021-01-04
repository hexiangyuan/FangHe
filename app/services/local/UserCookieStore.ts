import * as storage from "../../utils/storage";

const COOKIE_KEY_LOCAL_STORE = "COOKIE_KEY_LOCAL_STORE_FANG_HE";

export interface UserModel {
  cookie: string;
  mobile: string;
}

async function saveUser(user: UserModel): Promise<boolean> {
  return await storage.save(COOKIE_KEY_LOCAL_STORE, user);
}

async function getUser(): Promise<UserModel> {
  return storage.load(COOKIE_KEY_LOCAL_STORE);
}

async function clearUser(): Promise<void> {
  return storage.remove(COOKIE_KEY_LOCAL_STORE);
}

const LocalCookieStore = {
  saveUser,
  getUser,
  clearUser
};

export default LocalCookieStore;
