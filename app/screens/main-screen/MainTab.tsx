import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./home-tab/HomeScreen";
import FindScreen from "./find-tab/FindScreen";
import MineScreen from "./mine-tab/MineScreen";
import { Icon } from "../../components";
import { Colors } from "../../theme/Theme";
import { useStoreStatus } from "../hooks/useStoreStatus";
import { OrderListComponent, OrderListSafeAreComponent, OrderListScreen } from "../order-list/OrderListScreen"

const Tab = createBottomTabNavigator();

const tabHome = (props: { focused: boolean }) => {
  return (
    <Icon
      style={{
        width: 25,
        height: 25
      }}
      icon={props.focused ? "tab_home_focus" : "tab_home"}
    />
  );
};

const tabFind = (props: { focused: boolean }) => {
  return (
    <Icon
      style={{
        width: 25,
        height: 25
      }}
      icon={props.focused ? "tab_discovery_focus" : "tab_discovery"}
    />
  );
};

const tabMine = (props: { focused: boolean }) => {
  return (
    <Icon
      style={{
        width: 25,
        height: 25
      }}
      icon={props.focused ? "tab_mine_focus" : "tab_mine"}
    />
  );
};

export default function HomeTab() {
  const isStoreStatus = useStoreStatus();

  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.primary }} backBehavior={"none"}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: tabHome,
          title: "首页"
        }}
      />
      <Tab.Screen
        name="find"
        component={isStoreStatus ? OrderListSafeAreComponent : FindScreen}
        options={{
          tabBarIcon: tabFind,
          title: isStoreStatus ? "订单" : "发现"
        }}
      />
      <Tab.Screen
        name="mine"
        component={MineScreen}
        options={{
          tabBarIcon: tabMine,
          title: "我的"
        }}
      />
    </Tab.Navigator>
  );
}
