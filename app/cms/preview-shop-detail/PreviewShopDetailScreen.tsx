import React, { useCallback, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { Header, Screen, Text } from "../../components";
import { color } from "../../theme";
import {
  PreviewShopDetailContent,
  ShopDetail,
  ShopDetailProductItem,
  ShopDetailProductList
} from "./PreviewShopDetailContent";
import { UIButton } from "react-native-pjt-ui-lib";
import { RootNavigation } from "../../navigation";
import { useRoute } from "@react-navigation/native";
import HomeApi from "../../screens/main-screen/HomeApi";
import ToastGlobal from "../../utils/Toast";

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent
};

const CONTENT_CONTAINER: ViewStyle = {};

export const PreviewShopDetailScreen = () => {
  const shopId = useRoute().params["id"];

  const [shopDetail, setShopDetail] = useState<ShopDetail>(undefined);
  const [productList, setProductList] = useState<Array<ShopDetailProductItem>>(undefined);

  useEffect(() => {
    HomeApi.shopDetail(shopId).then(response => {
      if (response["code"] === 200) {
        setShopDetail(response["data"]);
      } else {
        ToastGlobal.show(response["errorMsg"]);
      }
    });
    HomeApi.shopDetailProductList(shopId).then(response => {
      if (response["code"] === 200) {
        setProductList(response["data"]);
      }
    });
  }, [shopId]);

  const rightPressed = useCallback(() => {
    RootNavigation.push("EditShopScreen", { id: shopId });
  }, [shopId]);

  return (
    <View style={FULL}>
      <Screen
        unsafe={false}
        statusBar={"dark-content"}
        style={CONTAINER}
        preset="scroll"
        backgroundColor={color.transparent}
      >
        <View style={CONTENT_CONTAINER}>
          <Header headerText={"查看店铺"} rightIcon={"order"} onRightPress={rightPressed} />
          {shopDetail && <PreviewShopDetailContent {...shopDetail} />}
          <View
            style={{
              backgroundColor: "#D8D8D8",
              height: 8
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingTop: 12
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
          {productList && <ShopDetailProductList productList={productList} />}
          <UIButton
            onPress={() => {
              RootNavigation.push("CmsAddProductScreen", { shopId: shopId });
            }}
            containerStyle={{ width: "100%" }}
          >
            新增物品
          </UIButton>
        </View>
      </Screen>
    </View>
  );
};
