import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../components";
import { Colors } from "../../theme/Theme";
import { UIButton } from "react-native-pjt-ui-lib";
import { useRoute } from "@react-navigation/native";
import HomeApi from "../main-screen/HomeApi";
import ToastGlobal from "../../utils/Toast";
import LocalCookieStore from "../../services/local/UserCookieStore";
import { FangHeApi, setFangHeApiCookie } from "../../services/api";
import { userUserStore } from "../../models/user-store/user-store";

export const MobileLoginVerificationCodeScreen = () => {
  const params = useRoute<any>().params;
  const [code, setCode] = useState<string>("");

  const userStore = userUserStore();

  const [countDown, setCountDown] = useState<number>();
  let interval: NodeJS.Timeout;
  let time = 30;

  function startCountDown() {
    interval = setInterval(() => {
      time = time - 1;
      if (time >= 0) {
        setCountDown(time);
      } else {
        clearInterval(interval);
        interval = null;
      }
    }, 1000);
  }

  useEffect(() => {
    startCountDown();
    return () => {
      clearInterval(interval);
    };
  }, []);

  function countDownPressed() {
    if (countDown <= 0 && interval === undefined) {
      time = 30;
      HomeApi.getVerificationCode(params.mobile).then(value => {
        if (value.code === 200) {
          startCountDown();
        } else {
          ToastGlobal.show(value.errorMsg);
        }
      });
    }
  }

  function loginPressed() {
    HomeApi.loginMobile({
      mobile: params.mobile,
      verificationCode: code
    })
      .then(value => {
        if (value.code === 200) {
          if (value.data?.cookie) {
            LocalCookieStore.saveUser({
              mobile: params.mobile,
              cookie: value.data.cookie
            }).then(result => {
              userStore.loginSucceed(params.mobile, value.data?.cookie);
              setFangHeApiCookie(value.data?.cookie);
            });
          }
        } else {
          ToastGlobal.show(value.errorMsg);
        }
      })
      .catch(e => {
        console.log("abcd", e);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16
        }}
      >
        <Text
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#333",
            fontWeight: "bold"
          }}
        >
          请输入6位数验证码
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontSize: 16,
            color: "#666"
          }}
        >
          验证码已发送到你的手机：{params.mobile}
        </Text>
        <View
          style={{
            marginTop: 80,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TextInput
            onChangeText={text => setCode(text)}
            maxLength={6}
            placeholder={"短信验证码"}
            keyboardType={"phone-pad"}
            style={{
              fontSize: 16,
              flex: 1,
              padding: 0,
              color: "#333",
              fontWeight: "bold"
            }}
          />

          <Text
            onPress={countDownPressed}
            style={{
              color: countDown <= 0 ? Colors.primary : "#666",
              fontSize: 16
            }}
          >
            {countDown > 0 ? `重新获取(${countDown})` : "重新获取"}
          </Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: Colors.primary,
            marginTop: 8
          }}
        />

        <UIButton
          onPress={() => {
            console.log("dddd");
            loginPressed();
          }}
          containerStyle={{
            width: "100%",
            marginTop: 16
          }}
        >
          登录
        </UIButton>
      </View>
    </SafeAreaView>
  );
};
