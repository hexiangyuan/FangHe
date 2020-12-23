import { Text, View } from "react-native";
import React from "react";

export interface Props {
  tag?: string[];
}

export const Tags = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 8
      }}
    >
      {props.tag?.map(item => (
        <View
          key={item.toString()}
          style={{
            backgroundColor: "rgba(221, 221, 221, 0.5)",
            marginHorizontal: 4,
            paddingVertical: 2,
            paddingHorizontal: 4
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: "#333"
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};
