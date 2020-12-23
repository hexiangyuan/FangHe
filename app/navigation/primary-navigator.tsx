import React from "react";

import Screens from "./screen-manifest";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true
      }}
    >
      {Screens.map(item => (
        <Stack.Screen key={item.name} name={item.name} component={item.component} options={item.options} />
      ))}
    </Stack.Navigator>
  );
}

const exitRoutes = ["mainTab"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
