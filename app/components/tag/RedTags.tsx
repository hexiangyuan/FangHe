import { ColorValue, Text, View } from "react-native"
import React from "react"
import { color } from "../../theme"

export interface Props {
  tag?: string[]
  color?: ColorValue
}

export const RedTags = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      {props.tag?.map((item) => (
        <View
          key={item.toString()}
          style={{
            borderWidth: 1,
            borderColor: props.color || "#FF4D4D",
            marginHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 2,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: props.color || "#FF4D4D",
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  )
}
