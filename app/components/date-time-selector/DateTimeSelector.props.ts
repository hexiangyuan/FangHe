import { ViewStyle } from "react-native";

export interface KeyValue {
  key: string;
  value: string;
}

export interface DateTimeModel {
  date: KeyValue;
  time: KeyValue[];
}

export interface DateTimeSelectorProps {
  dateTime: DateTimeModel[];
  containStyle?: ViewStyle;
  selectedDate?: KeyValue;
  selectedTime?: KeyValue;
  onSelected?: (date: KeyValue, time: KeyValue) => void;
}
