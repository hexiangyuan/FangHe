import React from "react"
import { ImageBackground, View, Image } from "react-native"
import { Text } from "../../../components"


export const ScanToysPage = () => {
    return <View style={{ flex: 1 }}>
        <ImageBackground
            style={{ flex: 1 }}
            source={require("../../../../assets/bg8.png")}
        >
            <Container></Container>
        </ImageBackground>

    </View>
}

const Container = () => {
    return <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
        <Image
            style={{ width: 48, height: 48, marginTop: 100, resizeMode: "cover" }}
            source={require("../../../../assets/lanya.png")}>
        </Image>

        <View style={{ height: 16, width: "100%" }} />


        <Text>使用前请打开蓝牙</Text>

        <Image
            style={{ width: "100%", height: "60%", marginTop: 100, resizeMode: "center" }}
            source={require("../../../../assets/juxing_8_copy.png")}>
        </Image>

        <Image
            style={{
                width: "30%",
                marginTop: 100,
                resizeMode: "center",
                position: "absolute",
                bottom: 0
            }}
            source={require("../../../../assets/zu_26.png")}>
        </Image>
    </View>
}