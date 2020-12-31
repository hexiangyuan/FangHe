import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { HomeShopItem } from "./HomeShopItem";
import { RootNavigation } from "../../../../navigation";
import { getLocation, useLocation, useLocationStore } from "../../../../models/location-store/LocationStore";
import HomeApi from "../../HomeApi";

export interface Props {
  key: "100" | "200";
}

const mockData = [
  {
    id: 0,
    img: "https://api88.net/api/img/rand/?rand_type=rand_mz",
    shopName: "string",
    score: 1,
    averPrice: 100,
    tag: ["tag1"],
    info: "string",
    distanceMeter: 1000
  },
  {
    id: 2,
    img: "https://api88.net/api/img/rand/?rand_type=rand_mz",
    shopName: "string",
    score: 1,
    averPrice: 100,
    tag: ["tag1"],
    info: "string",
    distanceMeter: 1000
  },
  {
    id: 3,
    img: "https://api88.net/api/img/rand/?rand_type=rand_mz",
    shopName: "string",
    score: 2,
    averPrice: 100,
    tag: ["tag1"],
    info: "string",
    distanceMeter: 1000
  },
  {
    id: 4,
    img: "https://api88.net/api/img/rand/?rand_type=rand_mz",
    shopName: "string",
    score: 1,
    averPrice: 100,
    tag: ["tag1"],
    info: "string",
    distanceMeter: 1000
  }
];

export const ShopList = (props: { type: number }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation()
      .then(location => {
        HomeApi.getHomeList({
          id: props.type,
          location: {
            latitude: location.latitude,
            longitude: location.longitude
          },
          page: 0,
          pagesize: 20
        }).then(value => {
          setData(value.data);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                RootNavigation.navigate("ShopDetailScreen", { id: item.id });
              }}
            >
              <HomeShopItem {...item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
