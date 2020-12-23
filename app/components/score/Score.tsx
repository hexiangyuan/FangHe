import { ScoreProps } from "./Score.props";
import { Text, View } from "react-native";
import React from "react";
import { Colors } from "../../theme/Theme";

export const Score = (props: ScoreProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 10,
          color: Colors.primary
        }}
      >
        {props.score}分
      </Text>
    </View>
  );
};
