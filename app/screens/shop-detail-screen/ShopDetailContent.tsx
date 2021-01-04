import { TouchableOpacity, View } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Window from "../../constant/window";
import { UIImage, H6 } from "react-native-pjt-ui-lib";
import React from "react";
import { Score } from "../../components/score/Score";
import { Tags } from "../../components/tag/Tags";
import { Text } from "../../components";
import { ProductItem } from "./ProductItem";

export interface ShopDetail {
  id: number;
  img: string;
  shopName: string;
  score: number;
  averPrice: number;
  tagList: string[];
  info: string;
  distanceMeter: number;
  shopAddress: string;
  latitude: number;
  longitude: number;
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

export const ShopDetailContent = (props: ShopDetail & { mapClick: () => void }) => {
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
        <Tags tag={props.tagList || []} />
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
              {props.shopAddress}
            </Text>
            {props.distanceMeter && (
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#666"
                }}
              >
                距离{props.distanceMeter}米
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={props.mapClick}>
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
      {props.productList?.map(item => (
        <ProductItem {...item} key={item.id} />
      ))}
    </View>
  );
};
