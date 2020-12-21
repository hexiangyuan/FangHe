import React from "react"
import { Text, View } from "react-native"
import { RootNavigation } from "../../../navigation"

const MineScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text onPress={() => RootNavigation.navigate("demoScreen")}>Home screen</Text>
    </View>
  )
}
export default MineScreen
