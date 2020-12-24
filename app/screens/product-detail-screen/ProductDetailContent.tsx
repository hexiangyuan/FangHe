import { View } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Window from "../../constant/window";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import React from "react";
import { Text } from "../../components";
import { RedTags } from "../../components/tag/RedTags";
import { Score } from "../../components/score/Score";

export interface ShopInfo {
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

export interface ProductDetailProps {
  id: number;
  mainImg: string;
  productName: string;
  subProductTitle: string;
  tags: string[];
  discountPrice: number;
  price: number;
  productDescImgs: string[];
  shopInfo: ShopInfo;
}

const TOP_IMAGE: ImageStyle = {
  height: Window.width / 2,
  width: Window.width
};

export const ShopDetailImgList = (props: { shopDetailsImgs: string[] }) => {
  return (
    <View
      style={{
        paddingTop: 12
      }}
    >
      <Text
        style={{
          paddingHorizontal: 12,
          paddingBottom: 12,
          fontSize: 14,
          color: "#666"
        }}
      >
        商品描述
      </Text>
      {props.shopDetailsImgs?.map((item, index) => (
        <UIImage
          key={item + index}
          source={{ uri: item }}
          style={{
            width: Window.width,
            height: Window.width
          }}
        />
      ))}
    </View>
  );
};

const ShopInfoComponent = (props: ShopInfo) => {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 12
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#666"
        }}
      >
        商家
      </Text>
      <Text
        style={{
          marginVertical: 8,
          fontSize: 16,
          color: "#333"
        }}
      >
        {props.shopName}
      </Text>
      <Score score={props.score} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#333"
          }}
        >
          {props.shopName}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#666"
          }}
        >
          距您{props.distanceMeter}米
        </Text>
      </View>
    </View>
  );
};

export const ProductDetailContent = (props: ProductDetailProps) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          height: Window.width / 2,
          width: Window.width,
          position: "relative"
        }}
      >
        <UIImage
          source={{
            uri: props.mainImg
          }}
          style={TOP_IMAGE}
        />
        <View
          style={{
            position: "absolute",
            paddingHorizontal: 12,
            bottom: 0,
            left: 0
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold"
            }}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {props.productName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "white",
              marginVertical: 8
            }}
            numberOfLines={1}
          >
            {props.subProductTitle}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 12
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#FA6400",
                fontWeight: "bold"
              }}
            >
              ￥{props.discountPrice}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                marginLeft: 8,
                textDecorationLine: "line-through"
              }}
            >
              ￥{props.price}
            </Text>
          </View>
          <UIButton>立即预订</UIButton>
        </View>
        <RedTags tag={props.tags} />
      </View>
      <View
        style={{
          height: 8,
          backgroundColor: "#D8D8D8"
        }}
      />
      <ShopInfoComponent {...props.shopInfo} />
      <View
        style={{
          height: 8,
          backgroundColor: "#D8D8D8"
        }}
      />
      <ShopDetailImgList shopDetailsImgs={props.productDescImgs} />
    </View>
  );
};
