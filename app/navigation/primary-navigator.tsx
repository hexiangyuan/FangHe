import React from "react";

import Screens from "./screen-manifest";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

const Stack = createNativeStackNavigator();

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: "white"
        }
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
