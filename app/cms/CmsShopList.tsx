import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from "../navigation";
import { CMSShopItemProps } from "./CmsMainScreen";
import { UIImage, Subtitle1, UIButton } from "react-native-pjt-ui-lib";
import { Score } from "../components/score/Score";
import { Header } from "../components";
import { FangHeApi } from "../services/api";
import ToastRef from "../utils/Toast";
import ToastGlobal from "../utils/Toast";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  imgStyle: {
    height: 96,
    width: 96
  },
  itemContainer: {
    flex: 1,
    paddingTop: 21,
    flexDirection: "row",
    paddingHorizontal: 12
  }
});

export const CmsShopItem = (props: CMSShopItemProps) => {
  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <UIImage
          source={{
            uri: props.img
          }}
          resizeMode={"center"}
          style={styles.imgStyle}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 12
          }}
        >
          <Subtitle1 numberOfLines={1}>{props.shopName}</Subtitle1>
          <View style={{ height: 8 }} />
          <Score score={props.score} />
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              marginBottom: 16,
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "#333"
              }}
            >
              ¥{props.averPrice}/人
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: "#666"
              }}
            >
              {props.distanceMeter}
            </Text>
          </View>
          {!!props.info && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  backgroundColor: "#FA6400",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 14,
                  height: 14,
                  marginRight: 8
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "white"
                  }}
                >
                  惠
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#333"
                }}
              >
                {props.info}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20
            }}
          >
            <UIButton type={"minor"}>编辑店铺</UIButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const CmsShopList = () => {
  const [data, setData] = useState<Array<CMSShopItemProps>>([]);

  useEffect(() => {
    FangHeApi.get("/shop/list", { isForAppStore: false })
      .then(value => {
        setData(value.data);
      })
      .catch(e => {
        ToastGlobal.show(e.toString());
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        rightIcon={"order"}
        headerText={"店铺管理"}
        onRightPress={() => {
          RootNavigation.push("CmsAddShopScreen");
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                RootNavigation.push("PreviewShopDetailScreen", { id: item.id });
              }}
            >
              <CmsShopItem {...item} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
