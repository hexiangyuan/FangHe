import { Platform } from "react-native"

const isAndroid = Platform.OS === "android"

const isIOS = Platform.OS === "ios"

const OS = {
  isAndroid,
  isIOS,
}

export default OS
