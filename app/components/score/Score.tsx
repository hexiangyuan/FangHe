import { ScoreProps } from "./Score.props";
import { Image, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../theme/Theme";

export const Score = (props: ScoreProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {new Array(Number.parseInt(props.score.toString())).fill("").map((value, index) => {
        return (
          <View
            key={index.toString()}
            style={{
              width: 14,
              height: 14,
              marginRight: 4
            }}
          >
            <Image
              source={require("./score_start.png")}
              style={{
                width: 14,
                height: 14
              }}
            />
          </View>
        );
      })}

      <Text
        style={{
          fontSize: 10,
          marginLeft: 4,
          color: Colors.primary
        }}
      >
        {props.score}分
      </Text>
    </View>
  );
};
