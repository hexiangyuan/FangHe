import {
  DeviceEventEmitter,
  DeviceEventEmitterStatic,
  NativeEventEmitter,
  NativeModules,
  Platform
} from "react-native";

export class NativeEvent {
  static emitter(): DeviceEventEmitterStatic | NativeEventEmitter {
    if (Platform.OS !== "ios") {
      return DeviceEventEmitter;
    } else {
      return new NativeEventEmitter(NativeModules.NativeToJSEventEmitter);
    }
  }
}
