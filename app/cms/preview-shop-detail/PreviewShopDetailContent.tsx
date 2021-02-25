import { TouchableOpacity, View } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Window from "../../constant/window";
import { UIImage, H6 } from "react-native-pjt-ui-lib";
import React, { useEffect, useState } from "react";
import { Score } from "../../components/score/Score";
import { Tags } from "../../components/tag/Tags";
import { Text } from "../../components";
import { RootNavigation } from "../../navigation";
import { ProductItem } from "../../screens/shop-detail-screen/ProductItem";
import ToastGlobal from "../../utils/Toast";

export interface ShopDetail {
  id: number;
  img: string;
  shopName: string;
  score: number;
  averPrice: number;
  tag: string[];
  info: string;
  distanceMeter: number;
  shopDetailsImgs: string[];
}

export interface ShopDetailProductItem {
  id: number;
  mainImg: string;
  productName: string;
  tags: string[];
  discountPrice: number;
  price: number;
}

export interface ShopDetailProductListProps {
  productList: ShopDetailProductItem[];
}

const TOP_IMAGE: ImageStyle = {
  height: Window.width / 2,
  width: Window.width
};

export const PreviewShopDetailContent = (props: ShopDetail) => {
  return (
    <View>
      <UIImage
        source={{
          uri: props.img
        }}
        style={TOP_IMAGE}
      />
      <View
        style={{
          padding: 12
        }}
      >
        <H6>{props.shopName}</H6>
        <View style={{ marginTop: 12 }} />
        <Score score={props.score} />
        <View style={{ marginTop: 12 }} />
        {/* <Tags tag={props.tag} />*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
                color: "#333"
              }}
            >
              props.location
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#666"
              }}
            >
              距离{props.distanceMeter}米
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 14,
                color: "#333"
              }}
            >
              导航
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const ShopDetailProductList = (props: ShopDetailProductListProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingBottom: 36
      }}
    >
      {props.productList.map(item => (
        <TouchableOpacity key={item.id} onPress={() => RootNavigation.push("ProductDetailScreen", { id: item.id })}>
          <View style={{ position: "relative" }}>
            <ProductItem {...item} />
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                marginLeft: 16,
                marginTop: 16,
                position: "absolute",
                right: 0,
                bottom: 0
              }}
              onPress={() => {
                ToastGlobal.show("该功能 暂未实现");
              }}
            >
              下架物品
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
