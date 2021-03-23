import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Header, Icon } from "../../components";
import Window from "../../constant/window";
import { UIImage } from "react-native-pjt-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { userUserStore } from "../../models/user-store/user-store";

type ItemProps = {
  title: string;
  content?: string;
  onPress?: () => void;
};
const Item = (props: ItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress && props.onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            flex: 1
          }}
        >
          {props.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {!!props.content && (
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                color: "#666"
              }}
            >
              {props.content}
            </Text>
          )}
          {props.onPress && (
            <Icon
              style={{
                height: 12,
                width: 12
              }}
              icon={"arrowRight"}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const AboutUsScreen = () => {
  const { mobile } = userUserStore();
  console.log(mobile)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"关于我们"} />

      <View
        style={{
          height: 200,
          width: Window.width,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <UIImage
          source={require("../../../assets/app-icon.png")}
          style={{
            width: 72,
            height: 72
          }}
        />
        <Text style={{ fontSize: 18, marginTop: 16, fontWeight: "bold" }}>方泡泡</Text>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <Item title={"应用版本"} content={"1.0.0"} onPress={() => {}} />
        {mobile === "13788936717" && (
          <Item
            title={"CMS"}
            onPress={() => {
              RootNavigation.push("CmsLoginScreen");
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
  /* <Item title={"用户协议"} onPress={() => {}} />
        <Item title={"开源代码许可"} onPress={() => {}} />
        <Item
          title={"CMS"}
          onPress={() => {
            RootNavigation.push("CmsLoginScreen");
          }}
        />
  * */
};
