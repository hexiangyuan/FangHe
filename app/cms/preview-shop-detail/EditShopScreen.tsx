import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Header } from "../../components";
import { FangHeApi, GaoDeMapApi } from "../../services/api";
import ToastGlobal from "../../utils/Toast";
import ImagePicker from "react-native-image-picker";
import HomeApi from "../../screens/main-screen/HomeApi";
import OS from "../../constant/OS";
import { useRoute } from "@react-navigation/core";

export const options = {
  title: "选择图片",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

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

export function tagsToString(tags: string[]): string {
  let str: string = "";
  if (tags && tags.length > 0) {
    tags.forEach(value => {
      str = str + value + " ";
    });
  }
  return str.trim();
}

export const EditShopScreen = () => {
  const [mainImage, setMainImage] = useState(undefined);
  const [shopName, setShopName] = useState(undefined);
  const [shopScore, setShopScore] = useState(undefined);
  const [shopAddress, setShopAddress] = useState(undefined);
  const [shopAvaPrice, setAvaPrice] = useState<number>(undefined);
  const [shopInfo, setShopInfo] = useState(undefined);
  const [shopTags, setShopTags] = useState<string[]>(undefined);
  const [shopMobile, setShopMobile] = useState(undefined);

  const shopId = useRoute().params["id"];

  useEffect(() => {
    HomeApi.shopDetail(shopId).then(response => {
      if (response["code"] === 200) {
        const data = response["data"];
        setMainImage(data.img);
        setShopName(data.shopName);
        setShopScore(data.score);
        setShopAddress(data.shopAddress);
        setAvaPrice(data.averPrice / 100);
        setShopInfo(data.info);
        setShopTags(data.tagList);
        setShopMobile(data.contactMobie);
      } else {
        ToastGlobal.show(response["errorMsg"]);
      }
    });
  }, [shopId]);

  async function getAddressLocationByAddress(address: string): Promise<string> {
    const respone = await GaoDeMapApi.get("/v3/geocode/geo", {
      address: address,
      city: "上海",
      key: "5f43991b2d421e409b43af4064993f94"
    });
    if (respone["status"] === "1") {
      return respone["geocodes"][0]?.location;
    } else {
      return Promise.reject("获取地址经纬度失败");
    }
  }

  function confirm() {
    getAddressLocationByAddress(shopAddress)
      .then(value => {
        if (value) {
          const locations = value.split(",");
          HomeApi.updateShopInfo({
            id: shopId,
            img: mainImage,
            isForAppStore: false,
            shopName: shopName,
            score: shopScore,
            averPrice: shopAvaPrice * 100,
            tag: shopTags,
            info: shopInfo,
            shopDetailsImgs: [],
            contactMobie: shopMobile,
            shopAddress: shopAddress,
            latitude: locations[1],
            longitude: locations[0]
          })
            .then(v => {
              if (v["code"] === 200) {
                Alert.alert("更新成功", "更新成功");
                ToastGlobal.show("更新成功");
              } else {
                Alert.alert("更新失败", v["errorMsg"]);
              }
            })
            .catch(e => {
              ToastGlobal.show(e);
            });
        } else {
          ToastGlobal.show("获取商家经纬度失败");
        }
      })
      .catch(e => {
        ToastGlobal.show(e);
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
            if (value["code"] === 200) {
              ToastGlobal.show("图片上传成功");
              setMainImage(value["data"]);
              console.log(value);
            } else {
              ToastGlobal.show("图片上传失败" + value["errorMsg"]);
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
              setShopName(text);
            }}
            value={shopName}
            containerStyle={{ marginVertical: 12 }}
            title={"店铺名称"}
            placeholder={"请输入店铺名称"}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家手机号"}
            value={shopMobile}
            keyboardType={"phone-pad"}
            onChangeText={text => {
              setShopMobile(text);
            }}
            placeholder={"商家手机号码"}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家评分"}
            placeholder={"请输入1-5分"}
            value={shopScore + ""}
            keyboardType={"numeric"}
            onChangeText={text => {
              setShopScore(text);
            }}
          />

          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家标签"}
            value={tagsToString(shopTags)}
            onChangeText={text => {
              setShopTags(text.split(" "));
            }}
            placeholder={"红色标签 空格分开 最多四个"}
          />
          <InputItem
            onChangeText={text => {
              setShopAddress(text);
            }}
            value={shopAddress}
            containerStyle={{ marginVertical: 12 }}
            title={"商家位置"}
            placeholder={"商家具体地址"}
          />
          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"人均消费"}
            value={shopAvaPrice + ""}
            onChangeText={text => {
              setAvaPrice(Number.parseInt(text));
            }}
            placeholder={"请输入人均消费价格"}
            keyboardType={"numeric"}
          />
          <InputItem
            containerStyle={{ marginVertical: 12 }}
            title={"商家优惠"}
            value={shopInfo}
            onChangeText={text => {
              setShopInfo(text);
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
                source={mainImage ? { uri: mainImage } : require("../ic_upload_img.png")}
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

export default EditShopScreen;
