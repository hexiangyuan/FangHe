import {NavigationState, SceneRendererProps} from "react-native-tab-view/lib/typescript/src/types";
import React from "react";
import {Route, TabBar} from "react-native-tab-view";
import {StyleSheet, Text} from "react-native";

const primary = "#FF4D4D";
const primaryDark = "#FF3535";
const primaryDisable = "#FF6D6D";

export const Colors = {
  primary,
  primaryDark,
  primaryDisable
};

export function CustomerTabBar<T extends Route>(
  props: SceneRendererProps & { navigationState: NavigationState<T>; } & { tabWidth?: number }
) {
  console.log("CustomerTabBar")
  const tabWidth = props.tabWidth ? props.tabWidth : 72
  return (
    <TabBar
      {...props}
      tabStyle={{width: tabWidth}}
      style={{
        backgroundColor: "white",
        elevation: 0,
        shadowColor: "transparent"
      }}
      labelStyle={{
        fontSize: 16,
        color: "#333"
      }}
      renderLabel={item => {
        return <Text style={item.focused ? tabStyles.focusLabel : tabStyles.unFocusLabel}>{item.route.title}</Text>;
      }}
      indicatorStyle={{
        backgroundColor: Colors.primary,
        height: 3,
        borderRadius: 3,
        width: 18,
        marginHorizontal: (tabWidth - 18) / 2,
        alignSelf: "center"
      }}
    />
  );
}

const tabStyles = StyleSheet.create({
  focusLabel: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold"
  },
  unFocusLabel: {
    fontSize: 18,
    color: "#333",
    fontWeight: "normal"
  }
});
