import React from "react";
import { View, ViewStyle } from "react-native";
import { Screen, Text } from "../../components";
import { color } from "../../theme";
import { ShopDetailContent, ShopDetailProductList } from "./ShopDetailContent";

const MockData = {
  id: 1000,
  img: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
  shopName: "xxxxxxxxxx体验店",
  score: 3,
  averPrice: 100,
  tag: ["24小时营业", "角色扮演", "免费零食", "场景多多"],
  info: "我是优惠信息优惠信息",
  distanceMeter: 1000,
  shopDetailsImgs: [
    "https://lh3.googleusercontent.com/proxy/vt6GBnZp_XkGvAnrGI2DUzZT4WNIlnk9ffJnsDZGnzeO3BMUFkKONoxNvmhLfVvUBAMZz49hHUMe3kh8NqKIgPvIjxK9KCDrZymIQYYSs5QMq_vlhubBsEIrytOgsc4KOugPeD_-_uFLbOrEArbsdqk",
    "https://lh3.googleusercontent.com/proxy/vt6GBnZp_XkGvAnrGI2DUzZT4WNIlnk9ffJnsDZGnzeO3BMUFkKONoxNvmhLfVvUBAMZz49hHUMe3kh8NqKIgPvIjxK9KCDrZymIQYYSs5QMq_vlhubBsEIrytOgsc4KOugPeD_-_uFLbOrEArbsdqk",
    "https://lh3.googleusercontent.com/proxy/vt6GBnZp_XkGvAnrGI2DUzZT4WNIlnk9ffJnsDZGnzeO3BMUFkKONoxNvmhLfVvUBAMZz49hHUMe3kh8NqKIgPvIjxK9KCDrZymIQYYSs5QMq_vlhubBsEIrytOgsc4KOugPeD_-_uFLbOrEArbsdqk"
  ]
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
  },
  {
    id: 4,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  },
  {
    id: 5,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  },
  {
    id: 6,
    mainImg: "https://thumbs.dreamstime.com/b/%E7%9F%A5%E6%9B%B4%E9%B8%9F-12417503.jpg",
    productName: "这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么这是商品名称么么么么么么",
    tags: ["泷泽萝拉", "小泽玛利亚", "苍老师"],
    discountPrice: 100,
    price: 200
  }
];

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent
};

const CONTENT_CONTAINER: ViewStyle = {};

export const ShopDetailScreen = () => {
  return (
    <View style={FULL}>
      <Screen unsafe={true} style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <View style={CONTENT_CONTAINER}>
          <ShopDetailContent {...MockData} />
          <View
            style={{
              backgroundColor: "#D8D8D8",
              height: 8
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 14,
                height: 14,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FA6400"
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "white"
                }}
              >
                厨
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 8,
                color: "#333"
              }}
            >
              商品橱窗
            </Text>
          </View>
          <ShopDetailProductList productList={MockProList} />
        </View>
      </Screen>
    </View>
  );
};
