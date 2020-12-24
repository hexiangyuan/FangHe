import React from "react";
import { Image, ScrollView, StatusBar, Text, View, ViewStyle } from "react-native";
import { ProductDetailContent } from "./ProductDetailContent";
import { ShopDetailProductList } from "../shop-detail-screen/ShopDetailContent";
import { Colors } from "../../theme/Theme";
import Window from "../../constant/window";

const MockData = {
  id: 0,
  mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
  productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
  subProductTitle:
    "stri这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么ng",
  tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
  discountPrice: 120,
  price: 200,
  productDescImgs: [
    "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg"
  ],
  shopInfo: {
    id: 0,
    img: "string",
    shopName: "string",
    score: 0,
    averPrice: 0,
    tag: ["string"],
    info: "string",
    distanceMeter: 0,
    shopDetailsImgs: ["string"]
  }
};

const MockProList = [
  {
    id: 0,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  },
  {
    id: 1,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  },
  {
    id: 2,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  },
  {
    id: 3,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  }
];

const FULL: ViewStyle = {
  flex: 1
};

export const ProductDetailScreen = () => {
  return (
    <View style={FULL}>
      <StatusBar translucent={true} barStyle={"dark-content"} />
      <ScrollView horizontal={false} style={{ flex: 1 }}>
        <ProductDetailContent {...MockData} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 42,
              width: "100%",
              backgroundColor: "#D8D8D8"
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: Colors.primary,
                width: Window.width / 8
              }}
            />
            <Image
              source={require("./icon_heart.png")}
              style={{
                width: 16,
                height: 16,
                marginHorizontal: 8
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginRight: 8
              }}
            >
              更多商品
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.primary,
                width: Window.width / 8
              }}
            />
          </View>
        </View>
        <ShopDetailProductList productList={MockProList} />
      </ScrollView>
    </View>
  );
};
