import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./home-tab/HomeScreen";
import MineScreen from "./mine-tab/MineScreen";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mine" component={MineScreen} />
    </Tab.Navigator>
  );
}
