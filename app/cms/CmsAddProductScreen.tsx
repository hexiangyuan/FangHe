import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Header } from "../components";
import { FangHeApi } from "../services/api";
import { useRoute } from "@react-navigation/native";
import ImagePicker, { launchImageLibrary } from "react-native-image-picker";
import HomeApi from "../screens/main-screen/HomeApi";
import OS from "../constant/OS";
import ToastGlobal from "../utils/Toast";
import { options } from "./CmsAddShopScreen";

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
  const [mainImag, setMainImag] = useState<string>(undefined);
  const [shopImags, setShopImags] = useState<Array<string>>(undefined);
  const [originPrice, setOriginPrice] = useState<number>(undefined);
  const [price, setPrice] = useState<number>(undefined);
  const [tags, setTags] = useState<string[]>(undefined);
  const [productSubTitle, setProductSubTitle] = useState<string>(undefined);
  const [productName, setProductName] = useState<string[]>(undefined);

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
    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const filePath = OS.isAndroid ? "file://" + response.path : response.path;
        HomeApi.pictureUpload({
          uri: filePath,
          name: response.fileName,
          type: response.type
        })
          .then(value => {
            if (value.code === 200) {
              ToastGlobal.show("图片上传成功");
              setMainImag(value.data);
              console.log(value);
            } else {
              ToastGlobal.show("图片上传失败" + value.errorMsg);
            }
          })
          .catch(e => {
            ToastGlobal.show("图片上传失败" + e.toString());
          });
      }
    });
  }

  function uploadProductImagList(index: number) {
    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const filePath = OS.isAndroid ? "file://" + response.path : response.path;
        HomeApi.pictureUpload({
          uri: filePath,
          name: response.fileName,
          type: response.type
        })
          .then(value => {
            if (value.code === 200) {
              ToastGlobal.show("图片上传成功");
              setMainImag(value.data);
              console.log(value);
            } else {
              ToastGlobal.show("图片上传失败" + value.errorMsg);
            }
          })
          .catch(e => {
            ToastGlobal.show("图片上传失败" + e.toString());
          });
      }
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
              setProductName(text);
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
              setProductSubTitle(text);
            }}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"物品标签"}
            onChangeText={text => {
              setTags(text.split(" "));
            }}
            placeholder={"红色标签;分号隔开;最多四个"}
          />
          <InputItem
            onChangeText={text => {
              setPrice(Number.parseInt(text));
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
              setOriginPrice(Number.parseInt(text));
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(0);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(1);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(2);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(3);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(4);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(5);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(6);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(7);
                  }}
                >
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
                <TouchableOpacity
                  onPress={() => {
                    uploadProductImagList(8);
                  }}
                >
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
