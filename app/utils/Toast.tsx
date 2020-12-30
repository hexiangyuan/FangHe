import { DURATION } from "react-native-easy-toast";

const ToastRef = {
  show(text?: string, duration?: DURATION, callback?: () => void) {},
  close(duration?: DURATION) {}
};

export function setToastRef(ref) {
  for (const method in ToastRef) {
    ToastRef[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
}

export default ToastRef;
