import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import HomeScreen from "./home-tab/HomeScreen";
import MineScreen from "./mine-tab/MineScreen";
import { Icon } from "../../components";
import { Colors } from "../../theme/Theme";

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
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.primary }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: tabHome,
          title: "首页"
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
