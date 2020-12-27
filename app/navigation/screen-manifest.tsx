import MainTab from "../screens/main-screen/MainTab";
import React from "react";
import { ShopDetailScreen } from "../screens/shop-detail-screen/ShopDetailScreen";
import { ProductDetailScreen } from "../screens/product-detail-screen/ProductDetailScreen";
import { OrderSubmitScreen } from "../screens/order-submit/OrderSubmitScreen";
import { MobileLoginScreen } from "../screens/login/login-screen";
import { MobileLoginVerificationScreen } from "../screens/login/login-verification-code-screen";
import { OrderSubmitSucceedScreen } from "../screens/order-submit/OrderSubmitSucceedScreen";
import { OrderListScreen } from "../screens/order-list/OrderListScreen";
import { NativeStackNavigationOptions } from "react-native-screens/native-stack";
import { AboutUsScreen } from "../screens/about-screen/AboutUsScreen";
import { CmsLoginScreen } from "../cms/CmsLoginScreen";
import { CmsMainScreen } from "../cms/CmsMainScreen";
import { CmsShopList } from "../cms/CmsShopList";
import { CmsAddShopScreen } from "../cms/CmsAddShopScreen";
import { PreviewShopDetailScreen } from "../cms/preview-shop-detail/PreviewShopDetailScreen";
import { CmsAddProductScreen } from "../cms/CmsAddProductScreen"

interface Screen {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
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
  },
  {
    name: "orderSubmitSucceedScreen",
    component: OrderSubmitSucceedScreen
  },
  {
    name: "orderListScreen",
    component: OrderListScreen
  },
  {
    name: "mobileLoginScreen",
    component: MobileLoginScreen
  },
  {
    name: "mobileLoginVerificationCodeScreen",
    component: MobileLoginVerificationScreen
  },
  {
    name: "aboutUsScreen",
    component: AboutUsScreen
  },
  {
    name: "cmsLoginScreen",
    component: CmsLoginScreen
  },
  {
    name: "CmsMainScreen",
    component: CmsMainScreen
  },
  {
    name: "CmsShopList",
    component: CmsShopList
  },
  {
    name: "CmsAddShopScreen",
    component: CmsAddShopScreen
  },
  {
    name: "CmsAddProductScreen",
    component: CmsAddProductScreen
  },
  {
    name: "PreviewShopDetailScreen",
    component: PreviewShopDetailScreen
  }
];

const Screens = commonScreens.concat(mainTabScreen);

export default Screens;
