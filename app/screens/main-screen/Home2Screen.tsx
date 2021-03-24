import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { observer, useLocalStore } from "mobx-react-lite";
import HomeApi from "./HomeApi";
import { Icon } from "../../components";
import FastImage from "react-native-fast-image";
import Window from "../../constant/window";
import { RootNavigation } from "../../navigation";

function OrderNow(props) {
  return (
    <Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "relative",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: "#333",
            fontWeight: "bold",
            paddingHorizontal: 12,
            paddingVertical: 12
          }}
        >
          立即预订
        </Text>
        <Icon icon={"home_arrow"} style={{ height: 24, width: 24, marginRight: 12 }} />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 4,
            left: 5,
            borderColor: "white",
            borderWidth: 1,
            zIndex: -1
          }}
        />
      </View>
      <View></View>
    </Pressable>
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
          return (
            <Pressable
              onPress={() => {
                RootNavigation.push("ProductDetailScreen", { id: item.id });
              }}
            >
              <View style={{ position: "relative" }}>
                <View style={{ backgroundColor: "#FEFEFE", flexDirection: "row", justifyContent: "space-between" }}>
                  <ShopName title={"趣泡"} />
                </View>
                <FastImage
                  style={{ width: Window.width, height: (Window.width * 3) / 2 }}
                  source={{ uri: item.mainImg }}
                  resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{ height: 48, backgroundColor: "rgb(230,235,237)" }} />
                <View
                  style={{
                    position: "absolute",
                    bottom: 24,
                    width: "100%",
                    flexDirection: "column"
                  }}
                >
                  <View
                    style={{
                      width: "84%",
                      flexDirection: "row",
                      marginHorizontal: "8%"
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "white",
                        color: "#333",
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        fontSize: 24
                      }}
                    >
                      {item.productName}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: "white", width: "84%", marginHorizontal: "8%", marginTop: 16 }}>
                    <OrderNow />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
});

export default HomeProductList;
