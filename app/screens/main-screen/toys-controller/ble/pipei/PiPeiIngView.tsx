import { ActivityIndicator, View, Text } from "react-native";
import { Button } from "../../../../../components";
import React, { useState, useEffect, useRef } from "react";
import { useInterval, useTimeout } from "usehooks-ts";
import { WSApi } from "../../api/WebSocketApi";
import { RootNavigation } from "../../../../../navigation";

export const PiPeiIngView = (props: { onCancel: () => void; onTimeOut: () => void }) => {
  const [count, setCount] = useState(15);

  useInterval(
    () => {
      setCount(count - 1);
    },
    count <= 0 ? null : 1000
  );

  useInterval(() => {
    WSApi.getUserInfo()
      .then(value => {
        if (value.code === 200 && value.roomId) {
          console.log("匹配完成");
          RootNavigation.push("DouBleControllerPage");
        }
        console.log(value);
      })
      .catch(e => {
        console.log(e);
      });
  }, 2000);

  useTimeout(props.onTimeOut, 15000);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)"
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
        <ActivityIndicator size="large" animating={true} color={"d7000f"} />
        <View style={{ height: 16 }} />
        <Text style={{ fontSize: 20, color: "#FF770F", fontWeight: "bold" }}>正在努力匹配中,请等候</Text>
        <View style={{ height: 16 }} />
        <Text style={{ fontSize: 32, color: "#FF770F", fontWeight: "bold" }}>{count}</Text>
        <Button
          style={{ marginLeft: 16, marginRight: 16, marginTop: 38, width: "80%" }}
          onPress={() => {
            props.onCancel();
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16
            }}
          >
            停止匹配
          </Text>
        </Button>
      </View>
    </View>
  );
};
