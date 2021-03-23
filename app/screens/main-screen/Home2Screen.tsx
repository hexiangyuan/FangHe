import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { FlatList, Pressable, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { observer, useLocalStore } from "mobx-react-lite";
import { EmptyView } from "./home-tab/components/EmptyView";
import { RootNavigation } from "../../navigation";
import { HomeShopItem } from "./home-tab/components/HomeShopItem";
import HomeApi from "./HomeApi";
import { Icon } from "../../components";
import { icons } from "../../components/icon/icons";
import FastImage from "react-native-fast-image";
import Window from "../../constant/window";

function OrderNow(props) {
  return (
    <Pressable>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ flex: 1 }}>立即预订</Text>
        <Icon icon={icons.home_arrow}></Icon>
      </View>
    </Pressable>
  );
}

function Title(props) {
  return (
    <Text
      style={{
        backgroundColor: "white",
        color: "#333",
        paddingHorizontal: 6,
        paddingVertical: 6,
        fontSize: 20
      }}
    >
      {props.title}
    </Text>
  );
}

function ShopName(props) {
  return (
    <Pressable>
      <View
        style={{
          backgroundColor: "black",
          marginHorizontal: 12,
          marginVertical: 8,
          paddingHorizontal: 12,
          paddingVertical: 8
        }}
      >
        <Text style={{ flex: 1, color: "white" }}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

const HomeProductList = observer((props: { type: number }) => {
  const store = useLocalStore(() => ({
    data: []
  }));

  useEffect(() => {
    HomeApi.shopDetailProductList(1).then(response => {
      if (response.code === 200) {
        store.data = response.data;
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={store.data}
        keyExtractor={(item, index) => index.toString()}
        // refreshControl={<RefreshControl refreshing={store.refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => {
          console.log(item.mainImg);
          return (
            <View>
              <View style={{ backgroundColor: "#FEFEFE", flexDirection: "row", justifyContent: "space-between" }}>
                <ShopName title={"方泡泡"} />
              </View>
              <FastImage
                style={{ width: Window.width, height: (Window.width * 3) / 2 }}
                source={{ uri: item.mainImg }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ height: 48, backgroundColor: "rgb(230,235,237)" }} />
              <Title title={item.productName} />
              <OrderNow />
            </View>
          );
        }}
      />
    </View>
  );
});

export default HomeProductList;
