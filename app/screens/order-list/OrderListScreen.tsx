import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { Sku } from "../order-submit/OrderSubmitScreen";
import { OrderListItem } from "./OrderList.model";

const MOCK_DATA: OrderListItem[] = [
  {
    orderNo: "KKKKKKK",
    quantity: 1,
    price: 100,
    time: "12-10 9:00-10:00",
    orderStatus: 10,
    productInfo: {
      shopName: "惺惺惜惺惺休息休息嘻嘻嘻嘻嘻嘻嘻",
      productImg: "https://tse4-mm.cn.bing.net/th/id/OIP.cXt1-NxPSVRV7Zya9YgjUwHaNK?pid=Api&rs=1",
      productName: "惺惺惜惺惺休息休息嘻嘻嘻嘻嘻嘻嘻",
      productId: 1111,
      shopId: 2222
    }
  }
];

export const OrderListScreen = () => {
  const [data, setDate] = useState<Array<OrderListItem>>([]);
  useEffect(() => {
    setDate(MOCK_DATA);
  });

  const renderItem = (item: OrderListItem) => {
    return <Sku {...item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header headerText={"我的预约单"} />
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </SafeAreaView>
  );
};
