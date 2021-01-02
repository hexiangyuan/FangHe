import * as storage from "../../utils/storage";

const COOKIE_KEY_LOCAL_STORE = "COOKIE_KEY_LOCAL_STORE_FANG_HE";

async function saveCookie(cookie: string): Promise<boolean> {
  return await storage.save(COOKIE_KEY_LOCAL_STORE, cookie);
}

async function getCookie(): Promise<string> {
  return storage.loadString(COOKIE_KEY_LOCAL_STORE);
}

const LocalCookieStore = {
  saveCookie,
  getCookie
};

export default LocalCookieStore;
