import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { Header, Icon } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import StringUtils from "../../utils/ReularUtils";
import { RootNavigation } from "../../navigation";
import ToastGlobal from "../../utils/Toast";
import HomeApi from "../main-screen/HomeApi";

export const MobileLoginScreen = () => {
  const [mobile, setMobile] = useState<string>();

  const inputMobile = useRef<TextInput>();

  function onVerificationBtnPressed() {
    if (StringUtils.isPhone(mobile)) {
      HomeApi.getVerificationCode(mobile).then(response => {
        RootNavigation.navigate("MobileLoginVerificationCodeScreen", { mobile: mobile });
      });
    } else {
      ToastGlobal.show("您输入的手机号码不合法");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <Header />

        <Text
          style={{
            width: "100%",
            marginTop: 24,
            marginBottom: 80,
            paddingHorizontal: 16,
            fontSize: 24,
            color: "#333",
            fontWeight: "bold"
          }}
        >
          手机号登录注册
        </Text>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#666"
            }}
          >
            中国+86
          </Text>
          <TextInput
            ref={inputMobile}
            onChangeText={text => {
              setMobile(text);
            }}
            placeholder={"请输入您的手机号"}
            keyboardType={"phone-pad"}
            style={{
              fontSize: 16,
              flex: 1,
              padding: 0,
              marginLeft: 12,
              color: "#333",
              fontWeight: "bold"
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setMobile("")
              inputMobile.current.clear();
            }}
          >
            <Icon
              icon={"clear"}
              style={{
                width: 16,
                height: 16
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.primary,
            marginTop: 8
          }}
        />

        <View
          style={{
            width: "100%",
            paddingHorizontal: 12,
            marginTop: 72
          }}
        >
          <UIButton onPress={onVerificationBtnPressed} containerStyle={{ width: "100%" }}>
            获取验证码
          </UIButton>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            marginTop: 12
          }}
        >
          未注册的手机号码验证后自动注册
        </Text>
      </View>
    </SafeAreaView>
  );
};
