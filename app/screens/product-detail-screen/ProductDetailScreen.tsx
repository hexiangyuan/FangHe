import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { ProductDetailContent, ProductDetailProps } from "./ProductDetailContent";
import { ShopDetailProductItem, ShopDetailProductList } from "../shop-detail-screen/ShopDetailContent";
import { Colors } from "../../theme/Theme";
import Window from "../../constant/window";
import { RootNavigation } from "../../navigation";
import { Icon } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeApi from "../main-screen/HomeApi";
import { useRoute } from "@react-navigation/native";
import { BottomModal, ModalContent } from "react-native-modals";
import MapUtils from "../../utils/MapUtils";

const FULL: ViewStyle = {
  flex: 1,
  position: "relative"
};

export const ProductDetailScreen = () => {
  const productId = useRoute().params?.id;
  const insets = useSafeAreaInsets();
  const animatedScrollYValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>("light-content");
  const color = animatedScrollYValue.interpolate({
    inputRange: [0, Window.width / 4],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp"
  });
  const [value, setValue] = useState<number>(0);

  animatedScrollYValue.addListener(state => {
    if (state.value < Window.width / 4) {
      setStatusBarStyle("light-content");
    } else {
      setStatusBarStyle("dark-content");
    }
    setValue(state.value);
  });

  const [productDetail, setProductDetail] = useState<ProductDetailProps>(undefined);
  const [productList, setProductList] = useState<Array<ShopDetailProductItem>>(undefined);
  const [mapVisible, setMapVisible] = useState<boolean>(false);

  useEffect(() => {
    HomeApi.productDetail(productId).then(value => {
      if (value.code === 200) {
        value.data && setProductDetail(value.data);
        HomeApi.shopDetailProductList(value.data.shop.id).then(shopList => {
          if (shopList.code === 200) {
            setProductList(shopList.data);
          }
        });
      }
    });
  }, [productId]);

  function mapLinking(lon: number, lat: number, address: string, mapType: string) {
    MapUtils.turn2MapApp(lon, lat, mapType, address);
  }

  return (
    <View style={FULL}>
      <StatusBar translucent={true} barStyle={statusBarStyle} />
      <Animated.View
        style={[
          {
            paddingTop: insets.top,
            position: "absolute",
            paddingHorizontal: 16,
            backgroundColor: color,
            paddingVertical: 12,
            left: 0,
            top: 0,
            width: "100%",
            zIndex: 100
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            RootNavigation.goBack();
          }}
        >
          <Icon
            icon={value < Window.width / 4 ? "back_white" : "back_black"}
            style={{
              width: 26,
              marginTop: 12,
              height: 26
            }}
          />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        horizontal={false}
        style={{ flex: 1 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], {
          useNativeDriver: false
        })}
      >
        {productDetail && (
          <ProductDetailContent
            {...productDetail}
            mapClick={() => {
              setMapVisible(true);
            }}
          />
        )}
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
        {productList && <ShopDetailProductList productList={productList} />}
      </ScrollView>
      <BottomModal
        visible={mapVisible}
        onTouchOutside={() => {
          setMapVisible(false);
        }}
      >
        <ModalContent>
          <View>
            <TouchableOpacity
              style={{ paddingVertical: 12 }}
              onPress={() => {
                setMapVisible(false);
                mapLinking(
                  productDetail.shop.longitude,
                  productDetail.shop.latitude,
                  productDetail.shop.shopAddress,
                  "gaode"
                );
              }}
            >
              <Text style={{ color: "#333" }}>高德地图导航</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12 }}
              onPress={() => {
                setMapVisible(false);
                mapLinking(
                  productDetail.shop.longitude,
                  productDetail.shop.latitude,
                  productDetail.shop.shopAddress,
                  "baidu"
                );
              }}
            >
              <Text style={{ color: "#333" }}>百度地图导航</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12 }}
              onPress={() => {
                setMapVisible(false);
                mapLinking(
                  productDetail.shop.longitude,
                  productDetail.shop.latitude,
                  productDetail.shop.shopAddress,
                  "browser"
                );
              }}
            >
              <Text style={{ color: "#333" }}>浏览器地图导航(不推荐)</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};
