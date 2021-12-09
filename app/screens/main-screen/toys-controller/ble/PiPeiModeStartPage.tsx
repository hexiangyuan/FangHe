import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { ModelAll } from "../ModeSelectedView";
import { writeModeToBle } from "./BleUtils";

export const PiPeiModeStartPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"自助模式"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      />
      <Content />
    </SafeAreaView>
  );
};

const Content = () => {
  return (
    <View style={{ flex: 1 }}>
      <ModelAll
        onModeChange={(index, title) => {
          writeModeToBle(index + 1 === 10 ? 0 : index)
            .then(value => {})
            .catch(reason => {});
        }}
      />
    </View>
  );
};
