import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import MainTab from "../screens/main-screen/MainTab";
import React from "react";
import { ShopDetailScreen } from "../screens/shop-detail-screen/ShopDetailScreen";
import { ProductDetailScreen } from "../screens/product-detail-screen/ProductDetailScreen";
import { OrderSubmitScreen } from "../screens/ order-submit/OrderSubmitScreen";

interface Screen {
  name: string;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
}

const commonScreens: Array<Screen> = [
  // { name: "unknownPage", component: UnknownPathPage, options: { headerTitle: "拍机堂" } }
];

const mainTabScreen: Array<Screen> = [
  {
    name: "mainTab",
    component: MainTab,
    options: { headerShown: false }
  },
  {
    name: "shopDetailScreen",
    component: ShopDetailScreen
  },
  {
    name: "productDetail",
    component: ProductDetailScreen
  },
  {
    name: "orderSubmitScreen",
    component: OrderSubmitScreen
  }
];

const Screens = commonScreens.concat(mainTabScreen);

export default Screens;
