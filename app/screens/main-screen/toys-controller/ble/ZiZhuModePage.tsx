import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  Image,
  Pressable,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BleManager, { getConnectedPeripherals } from "react-native-ble-manager";
import { Header } from "../../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { ModelAll } from "../ModeSelectedView";
import { writeModeToBle } from "./BleUtils";

const BleManagerModule = NativeModules.BleManager;

const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const ZiZhuModePage = () => {
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
