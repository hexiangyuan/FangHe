import { Linking, View } from "react-native"
import { WebView } from 'react-native-webview';
import React, { useRef } from 'react';
import { Icon, Text } from "../../../components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const H5Web = () => {
    const webViewRef = useRef(null);
    return <View style={{ flex: 1 }}>
        <View style={{ height: 48, flexDirection: "row", alignItems: "center" }}>
            <TouchableWithoutFeedback onPress={() => {
                webViewRef.current.goBack()
            }}>
                <Icon icon="back_black" style={{ width: 32, height: 32 }} />
            </TouchableWithoutFeedback>
            <Text style={{ color: 'black', fontSize: 22, marginLeft: 12 }}>方泡泡商场</Text>
        </View>
        <WebView source={{ uri: "https://weidian.com/?userid=1699852002" }}
            ref={webViewRef}
            style={{}}
        />
        <Text style={{ width: "100%", paddingVertical: 8, backgroundColor: 'orange', textAlign: 'center' }}
            onPress={() => {
                Linking.openURL("https://wxappopen.weidian.com/m/wx-auth/index.html?url=weixin://dl/business/?t=sLU7jDLeFqi#/").catch(err => {
                    console.log("aaaa", err)
                })
            }}
        >方泡泡商城小程序体验更佳</Text>

    </View>

}

export default H5Web;