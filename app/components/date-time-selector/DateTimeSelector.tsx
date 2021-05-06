import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { DateTimeSelectorProps, KeyValue } from "./DateTimeSelector.props";
import { UIButton } from "react-native-pjt-ui-lib";

export const DateTimeSelector = (props: DateTimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<KeyValue>(props.selectedDate || props.dateTime[0].date);
  const [selectedTime, setSelectedTime] = useState<KeyValue>(
    props.selectedTime || props.dateTime[0]?.time[0] || undefined
  );
  const currentSelectedDateIndex = useRef(0);
  useEffect(() => {
    currentSelectedDateIndex.current = props.dateTime.findIndex(value => value.date.key === selectedDate.key);
  }, [props, selectedDate.key]);

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
            {props.dateTime?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedDate(item.date);
                  currentSelectedDateIndex.current = index;
                }}
                key={item.date.key}
                style={{
                  height: 64,
                  backgroundColor: currentSelectedDateIndex.current === index ? "white" : "transparent",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{item.date.value}</Text>
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
            {props.dateTime[currentSelectedDateIndex.current]?.time?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTime(item);
                }}
                key={item.key}
                style={{
                  borderRadius: 2,
                  borderWidth: 1,
                  justifyContent: "center",
                  borderColor: selectedTime && selectedTime.key === item.key ? "#FF4D4D" : "#F0F0F0",
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
                    color: selectedTime && selectedTime.key === item.key ? "#FF4D4D" : "#333"
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
        onPress={() => {
          if (selectedTime) {
            if (props.onSelected) {
              props.onSelected(selectedDate, selectedTime);
            }
          }
        }}
        containerStyle={{
          width: "100%",
          marginTop: 24
        }}
      >
        确定
      </UIButton>
    </View>
  );
};
