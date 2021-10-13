import React, { useState } from 'react';
import { BackHandler, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Route, TabView } from "react-native-tab-view";
import { CustomerTabBar } from "../../../theme/Theme";
import { ShopList } from "../home-tab/components/ShopList";
import { FindList } from "./components/FindList";
import { useFocusEffect } from "@react-navigation/native"
import { RootNavigation } from "../../../navigation"
import H5Web from './H5Web';

const keyTabArticle = "1";
const keyTabPhoto = "2";
const keyTabVideo = "3";

const tabRoutes: Array<Route> = [
  // {
  //   key: keyTabArticle,
  //   title: "精选文章"
  // },
  {
    key: keyTabPhoto,
    title: "美女图册"
  },
  // {
  //   key: keyTabVideo,
  //   title: "短视频"
  // }
];


const _renderScene = ({ route }) => {
  switch (route.key) {
    case keyTabArticle:
      return <FindList type={parseInt(route.key)} />;
    case keyTabPhoto:
      return <FindList type={parseInt(route.key)} />;
    case keyTabVideo:
      return <FindList type={parseInt(route.key)} />;
    default:
      return <ShopList type={parseInt(route.key)} />;
  }
};

const FindScreen = () => {
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row"
      }}
    >
      <View style={{ flex: 1 }}>
        {/* <TabView
          renderScene={_renderScene}
          renderTabBar={props => <CustomerTabBar {...props} tabWidth={96}/>}
          onIndexChange={index => {
            setIndex(index);
          }}
          navigationState={{
            index,
            routes: tabRoutes
          }}
          lazy={true}
        /> */}
        <H5Web />
      </View>

    </SafeAreaView>
  );
}

export default FindScreen;
