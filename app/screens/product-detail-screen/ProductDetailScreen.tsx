import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Screen } from "../../components";
import { color, spacing } from "../../theme";
import { RootNavigation } from "../../navigation";
import { ProductDetailContent } from "./ProductDetailContent";

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

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  flex: 1
};

const CONTENT_CONTAINER: ViewStyle = { flex: 1 };

const BOLD: TextStyle = { fontWeight: "bold" };

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
  backgroundColor: color.transparent,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000
};
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5
};

export const ProductDetailScreen = () => {
  const goBack = () => RootNavigation.goBack();

  return (
    <View style={FULL}>
      <Screen unsafe={true} style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <View style={CONTENT_CONTAINER}>
          <ProductDetailContent {...MockData} />
        </View>
      </Screen>
    </View>
  );
};
