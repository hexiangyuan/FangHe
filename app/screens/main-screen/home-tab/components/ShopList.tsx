import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native"
import { HomeShopItem } from "./HomeShopItem";
import { RootNavigation } from "../../../../navigation";

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

export const ShopList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(mockData);
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate("shopDetailScreen", { id: item.id });
            }}
          >
            <HomeShopItem {...item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};
