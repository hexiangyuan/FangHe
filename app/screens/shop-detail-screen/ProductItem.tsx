import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Subtitle1, UIImage } from "react-native-pjt-ui-lib";
import { RedTags } from "../../components/tag/RedTags";
import { RootNavigation } from "../../navigation";

export interface ProductItemProps {
  id: number;
  mainImg: string;
  productName: string;
  tagList: string[];
  discountPrice: number;
  price: number;
}

const styles = StyleSheet.create({
  imgStyle: {
    height: 72,
    width: 72
  },
  itemContainer: {
    flex: 1,
    marginTop: 20,
    height: 72,
    flexDirection: "row",
    paddingHorizontal: 12
  }
});

export const ProductItem = (props: ProductItemProps) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        RootNavigation.navigate("ProductDetailScreen", { id: props.id });
      }}
    >
      {!!props.mainImg && props.mainImg !== "string" && (
        <UIImage
          source={{
            uri: props.mainImg
          }}
          style={styles.imgStyle}
        />
      )}
      <View
        style={{
          flex: 1,
          marginLeft: 12,
          justifyContent: "space-between"
        }}
      >
        <View>
          <Subtitle1 style={{ fontSize: 14 }} numberOfLines={1}>
            {props.productName}
          </Subtitle1>
          <RedTags tag={props.tagList} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FA6400",
              fontWeight: "bold"
            }}
          >
            ￥{props.discountPrice}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#666",
              marginLeft: 8,
              textDecorationLine: "line-through"
            }}
          >
            ￥{props.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
