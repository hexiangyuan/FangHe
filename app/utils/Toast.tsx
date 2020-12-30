import { DURATION } from "react-native-easy-toast";

const ToastGlobal = {
  show(text?: string, duration?: DURATION, callback?: () => void) {},
  close(duration?: DURATION) {}
};

export function setToastRef(ref) {
  for (const method in ToastGlobal) {
    ToastGlobal[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
}

export default ToastGlobal;
