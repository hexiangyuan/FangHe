import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types"
import MainTab from "../screens/main-screen/MainTab"
import React from "react"
import { DemoScreen } from "../screens"

interface Screen {
  name: string
  component: React.ComponentType<any>
  options?: StackNavigationOptions
}

const commonScreens: Array<Screen> = [
  // { name: "unknownPage", component: UnknownPathPage, options: { headerTitle: "拍机堂" } }
]

const mainTabScreen: Array<Screen> = [
  {
    name: "mainTab",
    component: MainTab,
    options: { headerShown: false },
  },
  {
    name: "demoScreen",
    component: DemoScreen,
  },
]

const Screens = commonScreens.concat(mainTabScreen)

export default Screens
