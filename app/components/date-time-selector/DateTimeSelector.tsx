import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { DateTimeSelectorProps, KeyValue } from "./DateTimeSelector.props";
import Window from "../../constant/window";

export const DateTimeSelector = (props: DateTimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<KeyValue>(props.date[0]);
  const [selectedTime, setSelectedTime] = useState<KeyValue>(props.time[0]);

  return (
    <View
      style={[
        props.containStyle,
        {
          flexDirection: "row",
          marginHorizontal: 12
        }
      ]}
    >
      <View
        style={{
          flex:1
        }}
      >
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {props.date?.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={{
                height: 48,
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
          marginTop: 12
        }}
      >
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          {props.time?.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={{
                borderRadius: 2,
                borderWidth: 1,
                justifyContent: "center",
                borderColor: selectedTime.key === item.key ? "#FF4D4D" : "#F0F0F0",
                height: 32,
                width: "100%",
                paddingVertical: 8,
                paddingLeft: 16,
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
  );
};
