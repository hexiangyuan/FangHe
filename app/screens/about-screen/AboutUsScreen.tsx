import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Header, Icon } from "../../components";
import Window from "../../constant/window";
import { UIImage } from "react-native-pjt-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";

type ItemProps = {
  title: string;
  content?: string;
  onPress?: () => void;
};
const Item = (props: ItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress && props.onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            flex: 1
          }}
        >
          {props.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {!!props.content && (
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                color: "#666"
              }}
            >
              {props.content}
            </Text>
          )}
          {props.onPress && (
            <Icon
              style={{
                height: 12,
                width: 12
              }}
              icon={"arrowRight"}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const AboutUsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"关于我们"} />

      <View
        style={{
          height: 200,
          width: Window.width,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <UIImage
          source={{
            uri:
              "https://th.bing.com/th/id/R3bc8d2910c49988de330463f55b3d6ac?rik=aL44nhY2go3IfA&riu=http%3a%2f%2fimg02.tooopen.com%2fimages%2f20160406%2ftooopen_sy_158518878725.jpg&ehk=1GaWKdOcUGbYR0MzSz8iuv5TXRRermOasMbShG0CJ6U%3d&risl=&pid=ImgRaw"
          }}
          style={{
            width: 72,
            height: 72
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <Item title={"应用版本"} content={"1.0.0"} onPress={() => {}} />
        <Item title={"用户协议"} onPress={() => {}} />
        <Item title={"开源代码许可"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
