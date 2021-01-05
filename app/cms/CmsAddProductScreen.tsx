import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Header } from "../components";
import { FangHeApi } from "../services/api";
import { useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import HomeApi from "../screens/main-screen/HomeApi";

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

export const CmsAddProductScreen = () => {
  let productName: string;
  let productSubTitle: string;
  let tags: string[];
  let price: number;
  let originPrice: number;
  let mainImag: string;
  let shopImags: string[];

  const [mainImage, setMainImage] = useState("");

  const shopId = useRoute().params.shopId;

  function confirm() {
    FangHeApi.post("/product/create", {
      shopId: shopId,
      mainImg: mainImag,
      productName: productName,
      subProductTitle: productSubTitle,
      tags: tags,
      discountPrice: price * 100,
      price: originPrice * 100,
      productDescImgs: shopImags
    });
  }

  function uploadImag() {
    launchImageLibrary({ mediaType: "photo" }, callback => {
      console.log(callback);
      // HomeApi.pictureUpload(callback.uri, callback.filename).then(value => {
      //   setMainImage({...callback});
      // });
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"新增商品"} />
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
              productName = text;
            }}
            containerStyle={{ marginVertical: 12 }}
            title={"物品名称"}
            placeholder={"请输入物品名称"}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"副标题"}
            placeholder={"请输入副标题"}
            onChangeText={text => {
              productSubTitle = text;
            }}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"物品标签"}
            onChangeText={text => {
              tags = text.split(";");
            }}
            placeholder={"红色标签;分号隔开;最多四个"}
          />
          <InputItem
            onChangeText={text => {
              price = Number.parseInt(text);
            }}
            containerStyle={{ marginVertical: 12 }}
            title={"出售价格"}
            keyboardType={"numeric"}
            placeholder={"填写真实的购买价格"}
          />
          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商品原价"}
            onChangeText={text => {
              originPrice = Number.parseInt(text);
            }}
            placeholder={"填写商品原来的价格"}
            keyboardType={"numeric"}
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
              物品主图：
            </Text>
            <TouchableOpacity onPress={uploadImag}>
              <UIImage
                source={mainImage ? { uri: mainImage } : require("./ic_upload_img.png")}
                style={{
                  width: 64,
                  marginLeft: 16,
                  marginTop: 16,
                  height: 64
                }}
              />
            </TouchableOpacity>
          </View>

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
              物品说明图：
            </Text>
            <View>
              <View style={{ flexDirection: "row" }}>
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
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12
                }}
              >
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
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12
                }}
              >
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
