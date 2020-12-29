import React, { useRef, useState } from "react";
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
import { ProductDetailContent } from "./ProductDetailContent";
import { ShopDetailProductList } from "../shop-detail-screen/ShopDetailContent";
import { Colors } from "../../theme/Theme";
import Window from "../../constant/window";
import { RootNavigation } from "../../navigation";
import { Icon } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

const FULL: ViewStyle = {
  flex: 1,
  position: "relative"
};

export const ProductDetailScreen = () => {
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
        <ProductDetailContent {...MockData} />
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
        <ShopDetailProductList productList={MockProList} />
      </ScrollView>
    </View>
  );
};
