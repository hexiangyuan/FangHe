import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route, TabView } from "react-native-tab-view";
import { H4 } from "react-native-pjt-ui-lib";
import { CustomerTabBar } from "../../../theme/Theme";
import { ShopList } from "./components/ShopList";
import Home2Screen from "../Home2Screen";
import { Modal, ModalContent } from "react-native-modals";
import { WXCustomerService } from "../../WXCustomerService";
import { useStoreStatus } from "../../../hooks/useStoreStatus";

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
  const [customerModelVisible, setCustomerModelVisible] = useState(false);

  const isIosShell = useStoreStatus();

  if (isIosShell === undefined) {
    return null;
  }

  if (isIosShell) {
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
        <Text
          style={{ textAlign: "center", margin: 12, fontSize: 16 }}
          onPress={() => {
            setCustomerModelVisible(true);
          }}
        >
          联系客服
        </Text>
      </View>
      <Modal
        width={0.9}
        visible={customerModelVisible}
        onTouchOutside={() => {
          setCustomerModelVisible(false);
        }}
      >
        <ModalContent>
          <WXCustomerService
            onClosePressed={() => {
              setCustomerModelVisible(false);
            }}
          />
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
