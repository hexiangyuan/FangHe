import React, { useEffect } from "react";

import Screens from "./screen-manifest";

import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation } from "@react-navigation/native";
import { setRootNavigation } from "./navigation-utilities";

const Stack = createNativeStackNavigator();

export function PrimaryNavigator() {
  const navigationContext = useNavigation();
  useEffect(() => {
    setRootNavigation(navigationContext);
  }, [navigationContext]);

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

const exitRoutes = ["MainTab"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
