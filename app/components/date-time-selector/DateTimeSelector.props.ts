import { ViewStyle } from "react-native";

export interface KeyValue {
  key: string;
  value: string;
}

export interface DateTimeSelectorProps {
  date: KeyValue[];
  time: KeyValue[];
  containStyle?: ViewStyle;
  selectedDate?: KeyValue;
  selectedTime?: KeyValue;
  onSelected?: (date: KeyValue, time: KeyValue) => void;
}
