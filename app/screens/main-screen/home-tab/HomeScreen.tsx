import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route, TabView } from "react-native-tab-view";
import { H4 } from "react-native-pjt-ui-lib";
import { CustomerTabBar } from "../../../theme/Theme";
import { ShopList } from "./components/ShopList";
import Home2Screen from "../Home2Screen";
import iosStore from "../../../models/user-store/ios-store-store";

type NavigationBarProps = {
  title: string;
};

const NavigationBar = (props: NavigationBarProps) => {
  return (
    <View
      style={{
        height: 48,
        paddingHorizontal: 12,
        justifyContent: "center"
      }}
    >
      <H4>{props.title}</H4>
    </View>
  );
};

const tabRoutes: Array<Route> = [
  {
    key: "10",
    title: "附近"
  },
  {
    key: "20",
    title: "推荐"
  }
];

const _renderScene = ({ route }) => {
  return <ShopList type={route.key} />;
};

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [isIOsShell, setIsIosShell] = useState(() => {
    if (Platform.OS === "ios") {
      return undefined;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      iosStore
        .getIosShellParams()
        .then(bool => {
          setIsIosShell(bool);
        })
        .catch(e => {
          setIsIosShell(true);
        });
    }
  }, []);

  if (isIOsShell === undefined) {
    return null;
  }

  if (isIOsShell) {
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
          <NavigationBar title={"方泡泡"} />
          <Home2Screen type={1} />
        </View>
      </SafeAreaView>
    );
  }

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
        <NavigationBar title={"方泡泡"} />
        <TabView
          renderScene={_renderScene}
          renderTabBar={props => <CustomerTabBar {...props} />}
          onIndexChange={index => {
            setIndex(index);
          }}
          navigationState={{
            index,
            routes: tabRoutes
          }}
          lazy={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
