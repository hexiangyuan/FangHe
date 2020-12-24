import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { DateTimeSelectorProps, KeyValue } from "./DateTimeSelector.props";
import { UIButton } from "react-native-pjt-ui-lib";

export const DateTimeSelector = (props: DateTimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<KeyValue>(props.selectedDate || props.date[0]);
  const [selectedTime, setSelectedTime] = useState<KeyValue>(props.selectedTime || props.time[0]);

  return (
    <View>
      <View
        style={[
          props.containStyle,
          {
            flexDirection: "row"
          }
        ]}
      >
        <View
          style={{
            width: "25%",
            backgroundColor: "#F0F0F0"
          }}
        >
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {props.date?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedDate(item);
                }}
                key={item.key}
                style={{
                  height: 48,
                  backgroundColor: selectedDate.key === item.key ? "white" : "transparent",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{item.value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 12,
            marginLeft: 40
          }}
        >
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            {props.time?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTime(item);
                }}
                key={item.key}
                style={{
                  borderRadius: 2,
                  borderWidth: 1,
                  justifyContent: "center",
                  borderColor: selectedTime.key === item.key ? "#FF4D4D" : "#F0F0F0",
                  height: 32,
                  width: "100%",
                  paddingVertical: 8,
                  paddingHorizontal: 32,
                  marginTop: 12
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: selectedTime.key === item.key ? "#FF4D4D" : "#333"
                  }}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <UIButton
        onPress={() => props.onSelected && props.onSelected(selectedDate, selectedTime)}
        containerStyle={{ width: "100%", marginTop: 24 }}
      >
        确定
      </UIButton>
    </View>
  );
};
