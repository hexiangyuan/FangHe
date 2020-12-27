import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Header } from "../components";

const InputItem = (props: { title: string; containerStyle: ViewStyle } & TextInputProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center"
        },
        props.containerStyle
      ]}
    >
      <Text
        style={{
          width: "20%",
          fontSize: 14,
          color: "#333"
        }}
      >
        {props.title}：
      </Text>
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#f0f0f0",
          padding: 4
        }}
        {...props}
      />
    </View>
  );
};

export const CmsAddShopScreen = () => {
  let shopName: string;
  let shopImg: string;
  let shopScore: number;
  let shopAddress: string;
  let shopAvaPrice: number;
  let shopInfo: string;
  let shopTags: string[];

  function confirm() {}

  function uploadImag() {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"新增/编辑店铺"} />
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 12
          }}
        >
          <InputItem
            onChangeText={text => {
              shopName = text;
            }}
            containerStyle={{ marginVertical: 12 }}
            title={"店铺名称"}
            placeholder={"请输入店铺名称"}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家评分"}
            placeholder={"请输入1-5分"}
            keyboardType={"numeric"}
            onChangeText={text => {
              shopScore = Number.parseInt(text);
            }}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家标签"}
            onChangeText={text => {
              shopTags = text.split(";");
            }}
            placeholder={"红色标签;分号隔开;最多四个"}
          />
          <InputItem
            onChangeText={text => {
              shopAddress = text;
            }}
            containerStyle={{ marginVertical: 12 }}
            title={"商家位置"}
            placeholder={"商家具体地址"}
          />
          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"人均消费"}
            onChangeText={text => {
              shopAvaPrice = Number.parseInt(text);
            }}
            placeholder={"请输入人均消费价格"}
            keyboardType={"numeric"}
          />
          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家优惠"}
            onChangeText={text => {
              shopInfo = text;
            }}
            placeholder={"235元套餐，App 预约8折优惠"}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333"
              }}
            >
              商家主图：
            </Text>
            <TouchableOpacity onPress={uploadImag}>
              <UIImage
                source={require("./ic_upload_img.png")}
                style={{
                  width: 64,
                  marginLeft: 16,
                  marginTop: 16,
                  height: 64
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 12
        }}
      >
        <UIButton onPress={confirm} containerStyle={{ width: "100%" }}>
          确定
        </UIButton>
      </View>
    </SafeAreaView>
  );
};
