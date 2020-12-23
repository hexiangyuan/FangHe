import React, { useState } from "react"
import { FlatList, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Route, TabView } from "react-native-tab-view"
import { Body1, H4 } from "react-native-pjt-ui-lib"
import { CustomerTabBar } from "../../../theme/Theme"
import { ShopList } from "./components/ShopList"

type NavigationBarProps = {
  title: string
}

const NavigationBar = (props: NavigationBarProps) => {
  return (
    <View
      style={{
        height: 48,
        paddingHorizontal: 12,
        justifyContent: "center",
      }}
    >
      <H4>{props.title}</H4>
    </View>
  )
}

const tabRoutes: Array<Route> = [
  {
    key: "100",
    title: "附近",
  },
  {
    key: "200",
    title: "推荐",
  },
]

const _renderScene = ({ route }) => {
  return <ShopList />
}

const HomeScreen = () => {
  const [index, setIndex] = useState(0)

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <NavigationBar title={"方和"} />
        <TabView
          renderScene={_renderScene}
          renderTabBar={(props) => <CustomerTabBar {...props} />}
          onIndexChange={(index) => {
            setIndex(index)
          }}
          navigationState={{
            index,
            routes: tabRoutes,
          }}
          lazy={true}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
