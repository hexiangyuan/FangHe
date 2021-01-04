import React, { useEffect } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { HomeShopItem } from "./HomeShopItem";
import { RootNavigation } from "../../../../navigation";
import { getLocation } from "../../../../models/location-store/LocationStore";
import HomeApi from "../../HomeApi";
import { observer, useLocalStore } from "mobx-react-lite";
import { EmptyView } from "./EmptyView";

export interface Props {
  key: "100" | "200";
}

export const ShopList = observer((props: { type: number }) => {
  const store = useLocalStore(() => ({
    data: undefined,
    refreshing: false,
    get empty() {
      if (store.data) {
        return store.data.length === 0;
      } else {
        return false;
      }
    },
    refreshData() {
      store.refreshing = true;
      getLocation()
        .then(location => {
          HomeApi.getHomeList({
            id: props.type,
            location: {
              latitude: location.latitude,
              longitude: location.longitude
            },
            page: 0,
            pagesize: 100
          }).then(value => {
            store.refreshing = false;
            if (value.code === 200) {
              store.data = value.data;
            }
          });
        })
        .catch(e => {
          store.refreshing = false;
          console.log(e);
        });
    }
  }));

  function onRefresh() {
    store.refreshData();
  }

  useEffect(() => {
    store.refreshData();
  }, []);

  if (store.empty) {
    console.log("empty", store.empty);
    return <EmptyView onPress={store.refreshData} />;
  } else {
    console.log("empty2", store.empty);
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
          refreshControl={<RefreshControl refreshing={store.refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  RootNavigation.push("ShopDetailScreen", { id: item.id });
                }}
              >
                <HomeShopItem {...item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
});
