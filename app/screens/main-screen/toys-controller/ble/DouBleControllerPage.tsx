import React, { useState } from "react";
import { Switch, View, Text, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../../components";
import { StackActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModelAll } from "../ModeSelectedView";
import { writeModeToBle } from "./BleUtils";
import { WSCenter } from "../ws/WSCenter";
import { Colors } from "../../../../theme/Theme";

export const DouBleControllerPage = () => {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.dispatch(StackActions.popToTop());
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"互动模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      />
      <Content />
    </SafeAreaView>
  );
};

const Content = () => {
  const [controlSelf, setControlSelf] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ModelAll
        onModeChange={(index, title) => {
          if (controlSelf) {
            writeModeToBle(index + 1 === 10 ? 0 : index)
              .then(value => {
                console.log("controlSelf", value);
              })
              .catch(reason => {
                console.log("controlSelf", reason);
              });
          } else {
            WSCenter.getInstance().sendControlMessage((index + 1 === 10 ? 0 : index) + "");
          }
        }}
      />

      <View style={{ flex: 1, width: "100%", alignItems: "center", flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            marginRight: 8,
            color: !controlSelf ? "black" : Colors.primaryDark
          }}
        >
          控制自己
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.orangeAiMaShi }}
          thumbColor={controlSelf ? Colors.blueKlein : "#767577"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setControlSelf(!controlSelf);
          }}
          value={controlSelf}
        />
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            marginLeft: 8,
            color: !controlSelf ? Colors.primaryDark : "black"
          }}
        >
          控制对象
        </Text>
      </View>
    </View>
  );
};
