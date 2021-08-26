import MainTab from "../screens/main-screen/MainTab";
import React from "react";
import { ShopDetailScreen } from "../screens/shop-detail-screen/ShopDetailScreen";
import { ProductDetailScreen } from "../screens/product-detail-screen/ProductDetailScreen";
import { OrderSubmitScreen } from "../screens/order-submit/OrderSubmitScreen";
import { MobileLoginScreen } from "../screens/login/login-screen";
import { MobileLoginVerificationCodeScreen } from "../screens/login/login-verification-code-screen";
import { OrderSubmitSucceedScreen } from "../screens/order-submit/OrderSubmitSucceedScreen";
import { OrderListScreen } from "../screens/order-list/OrderListScreen";
import { NativeStackNavigationOptions } from "react-native-screens/native-stack";
import { AboutUsScreen } from "../screens/about-screen/AboutUsScreen";
import { CmsLoginScreen } from "../cms/CmsLoginScreen";
import { CmsMainScreen } from "../cms/CmsMainScreen";
import { CmsShopList } from "../cms/CmsShopList";
import { CmsAddShopScreen } from "../cms/CmsAddShopScreen";
import { PreviewShopDetailScreen } from "../cms/preview-shop-detail/PreviewShopDetailScreen";
import { CmsAddProductScreen } from "../cms/CmsAddProductScreen";
import { PrivacyPolicyScreen } from "../screens/policy-screens/privacy-policy-screen";
import ArticleDetailScreen from "../screens/find/article-detail-screen/ArticleDetailScreen";
import PhotoDetailScreen from "../screens/find/ptoto-detail-screen/PhotoDetailScreen";
import VideoDetailScreen from "../screens/find/video-detail-screen/VideoDetailScreen";
import { VideoSwiperScreen } from "../screens/find/video-detail-screen/VideoSwpiperSreen";
import ShareScreen from "../share/ShareScreen";
import PayScreen from "../screens/pay/PayScreen";
import PayResultScreen from "../screens/pay/PayResultScreen";
import EditShopScreen from "../cms/preview-shop-detail/EditShopScreen";
import { CmsEditProductScreen } from "../cms/edit-product/EditProductScreen";
import CmsSmsScreen from "../cms/CmsSmsScreen";
import MyCouponListScreen from "../screens/coupon/MyCouponListScreen";
import UseCouponListScreen from "../screens/coupon/UseCouponListScreen";

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
    name: "MainTab",
    component: MainTab,
    options: { headerShown: false }
  },
  {
    name: "ShopDetailScreen",
    component: ShopDetailScreen
  },
  {
    name: "ProductDetailScreen",
    component: ProductDetailScreen
  },
  {
    name: "OrderSubmitScreen",
    component: OrderSubmitScreen
  },
  {
    name: "OrderSubmitSucceedScreen",
    component: OrderSubmitSucceedScreen
  },
  {
    name: "OrderListScreen",
    component: OrderListScreen
  },
  {
    name: "MobileLoginScreen",
    component: MobileLoginScreen
  },
  {
    name: "MobileLoginVerificationCodeScreen",
    component: MobileLoginVerificationCodeScreen
  },
  {
    name: "AboutUsScreen",
    component: AboutUsScreen
  },
  {
    name: "PrivacyPolicyScreen",
    component: PrivacyPolicyScreen
  },
  {
    name: "CmsLoginScreen",
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
  },
  {
    name: "ArticleDetailScreen",
    component: ArticleDetailScreen
  },
  {
    name: "PhotoDetailScreen",
    component: PhotoDetailScreen
  },
  {
    name: "VideoDetailScreen",
    component: VideoDetailScreen
  },
  {
    name: "VideoSwiperScreen",
    component: VideoSwiperScreen
  },
  {
    name: "ShareScreen",
    component: ShareScreen
  },
  {
    name: "PayScreen",
    component: PayScreen
  },
  {
    name: "PayResultScreen",
    component: PayResultScreen
  },
  {
    name: "EditShopScreen",
    component: EditShopScreen
  },
  {
    name: "CmsEditProductScreen",
    component: CmsEditProductScreen
  },
  {
    name: "MyCouponListScreen",
    component: MyCouponListScreen
  },
  {
    name: "UseCouponListScreen",
    component: UseCouponListScreen
  },
  {
    name: "CmsSmsScreen",
    component: CmsSmsScreen
  }
];

const Screens = commonScreens.concat(mainTabScreen);

export default Screens;
