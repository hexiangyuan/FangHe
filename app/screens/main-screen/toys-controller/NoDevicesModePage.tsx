import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ModelAll } from "./ModeSelectedView";

export const NoDevicesModePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 30 }} />
        <MatchView />
      </View>
    </SafeAreaView>
  );
};

const MatchView = () => {
  const [state, setState] = useState(0);
  const [mode, setMode] = useState("");

  const getTipsString = (state: number, mode: String) => {
    switch (state) {
      case 0:
        return "开始匹配";
      case 10:
        return "匹配中";
      case 30:
        return mode;
      case 100:
        return "重新匹配";
    }
    return "搜索中";
  };

  return (
    <View style={{ alignItems: "center" }}>
      <MatchAnimate>
        <Text>{getTipsString(state, mode)}</Text>
      </MatchAnimate>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("aaaaaaa");
          }}
        >
          <View style={{ height: 16 }} />
        </TouchableOpacity>
        <ModelAll
          onModeChange={(index,title) => {
            setMode(title);
            setState(30)
          }}
        />
      </View>
    </View>
  );
};

const MatchAnimate = ({ children }) => {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {children}
    </View>
  );
};
