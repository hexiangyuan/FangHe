import React, { useEffect, useRef, useState } from "react";
import { View, ViewStyle, Animated, TouchableOpacity } from "react-native";
import { Icon, Screen, Text } from "../../components";
import { color } from "../../theme";
import { ShopDetail, ShopDetailContent, ShopDetailProductItem, ShopDetailProductList } from "./ShopDetailContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Window from "../../constant/window";
import { RootNavigation } from "../../navigation";
import { useRoute } from "@react-navigation/native";
import HomeApi from "../main-screen/HomeApi";
import ToastGlobal from "../../utils/Toast";
import { BottomModal, ModalContent } from "react-native-modals";
import MapUtils from "../../utils/MapUtils";

const FULL: ViewStyle = {
  flex: 1,
  position: "relative"
};
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent
};

const CONTENT_CONTAINER: ViewStyle = {};

export const ShopDetailScreen = () => {
  const insets = useSafeAreaInsets();
  // 滚动动画监听
  const animatedScrollYValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [statusBarStyle, setStatusBarStyle] = useState<string>("light-content");
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

  const [shopDetail, setShopDetail] = useState<ShopDetail>(undefined);
  const [productList, setProductList] = useState<Array<ShopDetailProductItem>>(undefined);

  const [mapVisible, setMapVisible] = useState(false);

  const shopId = useRoute().params.id;

  function mapLinking(lon: number, lat: number, address: string, mapType: string) {
    MapUtils.turn2MapApp(lon, lat, mapType, address);
  }

  useEffect(() => {
    HomeApi.shopDetail(shopId).then(response => {
      if (response.code === 200) {
        setShopDetail(response.data);
      } else {
        ToastGlobal.show(response.errorMsg);
      }
    });
    HomeApi.shopDetailProductList(shopId).then(response => {
      if (response.code === 200) {
        setProductList(response.data);
      }
    });
  }, []);

  return (
    <View style={FULL}>
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
      <Screen
        unsafe={true}
        style={CONTAINER}
        statusBar={statusBarStyle}
        scrollViewProps={{
          onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], {
            useNativeDriver: false
          })
        }}
        preset="scroll"
      >
        <View style={CONTENT_CONTAINER}>
          {!!shopDetail && (
            <ShopDetailContent
              {...shopDetail}
              mapClick={() => {
                setMapVisible(true);
              }}
            />
          )}
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
          {!!productList && <ShopDetailProductList productList={productList} />}
        </View>
      </Screen>
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
                mapLinking(shopDetail.longitude, shopDetail.latitude, shopDetail.shopAddress, "gaode");
              }}
            >
              <Text style={{ color: "#333" }}>高德地图导航</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12 }}
              onPress={() => {
                setMapVisible(false);
                mapLinking(shopDetail.longitude, shopDetail.latitude, shopDetail.shopAddress, "baidu");
              }}
            >
              <Text style={{ color: "#333" }}>百度地图导航</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 12 }}
              onPress={() => {
                setMapVisible(false);
                mapLinking(shopDetail.longitude, shopDetail.latitude, shopDetail.shopAddress, "browser");
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
