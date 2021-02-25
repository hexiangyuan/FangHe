import { TouchableOpacity, View } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Window from "../../constant/window";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import React from "react";
import { Text } from "../../components";
import { RedTags } from "../../components/tag/RedTags";
import { Score } from "../../components/score/Score";
import { RootNavigation } from "../../navigation";

export interface ShopInfo {
  id: number;
  img: string;
  shopName: string;
  score: number;
  averPrice: number;
  tag: string[];
  info: string;
  shopAddress: string;
  latitude: number;
  longitude: number;
  shopDetailsImgs: string[];
}

export interface ProductDetailProps {
  id: number;
  mainImg: string;
  productName: string;
  subProductTitle: string;
  tagList: string[];
  discountPrice: number;
  price: number;
  productDescImgList: string[];
  shop: ShopInfo;
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

const ShopInfoComponent = (props: ShopInfo & { mapClick: () => void }) => {
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
      <TouchableOpacity
        onPress={props.mapClick}
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
          {props.shopAddress}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#666"
          }}
        >
          导航
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProductDetailContent = (props: ProductDetailProps & { mapClick: () => void }) => {
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
              ￥{props.discountPrice / 100}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                marginLeft: 8,
                textDecorationLine: "line-through"
              }}
            >
              ￥{props.price / 100}
            </Text>
          </View>
          <UIButton
            onPress={() => {
              RootNavigation.push("OrderSubmitScreen", {
                id: props.id,
                shopName: props.shop.shopName,
                productImg: props.mainImg,
                productName: props.productName,
                price: props.discountPrice,
                size: 1
              });
            }}
          >
            立即预订
          </UIButton>
        </View>
        <RedTags tag={props.tagList} />
      </View>
      <View
        style={{
          height: 8,
          backgroundColor: "#D8D8D8"
        }}
      />
      <ShopInfoComponent {...props.shop} mapClick={props.mapClick} />
      <View
        style={{
          height: 8,
          backgroundColor: "#D8D8D8"
        }}
      />
      <ShopDetailImgList shopDetailsImgs={props.productDescImgList} />
    </View>
  );
};
