import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Header } from "../../../../components";
import { RootNavigation } from "../../../../navigation";

export const ChooseModePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"模式选择"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
      />
      <View style={{ flex: 1 }}>
        <Content />
      </View>
    </SafeAreaView>
  );
};

const Content = () => {
  return (
    <View style={{ justifyContent: "center", alignContent: "center", flex: 1, height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
          alignItems: "flex-end",
          height: "50%",
          position: "relative"
        }}
      >
        <Pressable
          style={[styles.cardContent, { right: "50%", bottom: 0, margin: 16 }]}
          onPress={() => {
            console.log("aaaaaa");
            RootNavigation.push("ZiZhuModePage");
          }}
        >
          <Image
            source={require("../../../../../assets/pipeomode.png")}
            style={{ width: 120, resizeMode: "cover", height: 90 }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>匹配模式</Text>
        </Pressable>
        <Pressable
          style={[styles.cardContent, { left: "50%", margin: 16, marginBottom: 16 }]}
          onPress={() => {
            console.log("aaaaaa");
            RootNavigation.push("PiPeiModeStartPage");
          }}
        >
          <Image
            source={require("../../../../../assets/zizhumode.png")}
            style={{ width: 120, resizeMode: "cover", height: 90 }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>自助模式</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
        <Pressable
          style={[styles.cardContent, { right: "50%", margin: 16 }]}
          onPress={() => {
            RootNavigation.push("PiPeiModeStartPage");
          }}
        >
          <Image
            source={require("../../../../../assets/yidimode.png")}
            style={{ width: 120, resizeMode: "cover", height: 90 }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>异地模式</Text>
        </Pressable>

        <Pressable
          style={[styles.cardContent, { left: "50%", margin: 16 }]}
          onPress={() => {
            console.log("aaaaaa");
            RootNavigation.push("PiPeiModeStartPage");
          }}
        >
          <Image
            source={require("../../../../../assets/yidimode.png")}
            style={{ width: 120, resizeMode: "cover", height: 90 }}
          />
          <Text style={{ textAlign: "center", marginTop: 8 }}>使用教程</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    width: 120,
    height: 120,
    flexDirection: "column",
    position: "absolute"
  }
});
