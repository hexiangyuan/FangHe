import React, { useCallback, useState } from "react";
import { Alert, Text } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { UIButton } from "react-native-pjt-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components";
import ToastGlobal from "../utils/Toast";
import CmsAPI from "./api/CmsApi";

const CmsSmsScreen = props => {
  const [smsContent, setSmsContent] = useState("");

  const sendSms = useCallback(() => {
    CmsAPI.sendSmsApi(smsContent)
      .then(value => {
        if (value && value["code"] === 200) {
          Alert.alert("提示", "短信发送成功,短信会有一定的延迟时间，请注意不要重复");
        } else {
          Alert.alert("提示", "短信发送失败," + (value && value["errorMsg"]));
        }
      })
      .catch(e => {
        Alert.alert("提示", "短信发送失败");
      });
  }, [smsContent]);

  const confirm = () => {
    Alert.alert("提示", "确定发送短信么？", [
      { text: "取消", style: "cancel" },
      { text: "确认发送", style: "default", onPress: sendSms }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <Header headerText={"营销短信发送"}></Header>
      <View style={{ flex: 1, flexDirection: "column", padding: 12 }}>
        <TextInput
          style={{ height: "50%", backgroundColor: "white", borderColor: "#333", borderWidth: 0.5 }}
          maxLength={199}
          multiline={true}
          onChange={e => {
            setSmsContent(e.nativeEvent.text);
          }}
        />
        <Text>{`${smsContent.length}/499`}</Text>
      </View>
      <UIButton onPress={confirm} containerStyle={{ width: "100%" }}>
        发送
      </UIButton>
    </SafeAreaView>
  );
};

export default CmsSmsScreen;
