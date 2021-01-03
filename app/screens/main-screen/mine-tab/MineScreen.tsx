import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootNavigation } from "../../../navigation";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { IconTypes } from "../../../components/icon/icons";
import { Icon } from "../../../components";
import { useNavigation } from "@react-navigation/native";

const UnLoginView = () => {

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.push( "MobileLoginScreen");
      }}
    >
      <View
        style={{
          height: 72,
          marginLeft: 12,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#333",
            fontWeight: "bold"
          }}
        >
          点击登录
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            marginTop: 8
          }}
        >
          登录更精彩
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LoginHeaderView = () => {

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.push( "MobileLoginScreen");
      }}
    >
      <View
        style={{
          height: 72,
          marginLeft: 12,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#333",
            fontWeight: "bold"
          }}
        >
          18964014563
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface ItemProps {
  icon: IconTypes;
  text: string;
  onPress: () => void;
}

const MineItem = (props: ItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1
          }}
        >
          <Icon
            style={{
              width: 20,
              height: 20
            }}
            icon={props.icon}
          />
          <Text
            style={{
              marginLeft: 12,
              fontSize: 18,
              color: "#333"
            }}
          >
            {props.text}
          </Text>
        </View>
        <Icon
          style={{
            width: 12,
            height: 12
          }}
          icon={"arrowRight"}
        />
      </View>
    </TouchableOpacity>
  );
};

const MineOrder = () => {

  return (
    <View
      style={{
        width: "100%",
        marginTop: 16
      }}
    >
      <MineItem
        icon={"order"}
        text={"我的订单"}
        onPress={() => {
          RootNavigation.push( "OrderListScreen");
        }}
      />

      <View
        style={{
          marginLeft: 40,
          height: 0.5,
          marginVertical: 16,
          backgroundColor: "#F0F0F0"
        }}
      />

      <MineItem
        icon={"about"}
        text={"关于我们"}
        onPress={() => {
          RootNavigation.push( "AboutUsScreen");
        }}
      />

      <View
        style={{
          marginLeft: 40,
          height: 0.5,
          marginVertical: 16,
          backgroundColor: "#F0F0F0"
        }}
      />

      <MineItem
        icon={"protected"}
        text={"隐私申明"}
        onPress={() => {
          RootNavigation.push( "PrivacyPolicyScreen");
        }}
      />
    </View>
  );
};

const MineScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          flexDirection: "row",
          paddingTop: 120,
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
        <UIImage
          source={require("./avatar.png")}
          style={{
            width: 72,
            height: 72
          }}
        />
        <LoginHeaderView />
      </View>
      <MineOrder />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 120
        }}
      >
        <UIButton containerStyle={{ width: "80%" }}>退出登录</UIButton>
      </View>
    </View>
  );
};
export default MineScreen;
