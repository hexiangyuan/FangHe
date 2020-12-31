import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { OrderListItem } from "./OrderList.model";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { canCancelOrder, getOrderNameByStatus } from "./OrderStatus";
import { RootNavigation } from "../../navigation";

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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
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
  },{
    orderNo: "KKKKKKK",
    quantity: 1,
    price: 100,
    time: "12-10 9:00-10:00",
    orderStatus: 40,
    productInfo: {
      shopName: "惺惺惜惺惺休息休息嘻嘻嘻嘻嘻嘻嘻",
      productImg: "https://tse4-mm.cn.bing.net/th/id/OIP.cXt1-NxPSVRV7Zya9YgjUwHaNK?pid=Api&rs=1",
      productName: "惺惺惜惺惺休息休息嘻嘻嘻嘻嘻嘻嘻",
      productId: 1111,
      shopId: 2222
    }
  },{
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

export const OrderItem = (props: OrderListItem) => {
  return (
    <View style={{ padding: 12 }}>
      <Text
        onPress={() => {
          RootNavigation.navigate("ShopDetailScreen", { id: props.productInfo.shopId });
        }}
        style={{
          fontSize: 18,
          color: "#333",
          fontWeight: "bold"
        }}
      >
        {props.productInfo.shopName}
      </Text>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate("ProductDetailScreen", { id: props.productInfo.productId });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            height: 72
          }}
        >
          <UIImage
            source={{ uri: props.productInfo.productImg }}
            style={{
              width: 72,
              height: 72
            }}
          />
          <View
            style={{
              height: 72,
              flex: 1,
              marginLeft: 8,
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#333",
                  flex: 1
                }}
                numberOfLines={2}
              >
                {props.productInfo.productName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FF4D4D",
                  marginLeft: 12
                }}
              >
                {getOrderNameByStatus(props.orderStatus)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.primary
                }}
              >
                ￥{props.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333"
                }}
              >
                x1
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {canCancelOrder(props.orderStatus) && (
        <View
          style={{
            flexDirection: "row-reverse",
            marginTop: 12
          }}
        >
          <UIButton
            containerStyle={{
              borderColor: "#999",
              height: 32
            }}
            fontStyle={{ color: "#999" }}
            type={"minor"}
          >
            取消
          </UIButton>
        </View>
      )}
    </View>
  );
};

export const OrderListScreen = () => {
  const [data, setDate] = useState<Array<OrderListItem>>([]);
  useEffect(() => {
    setDate(MOCK_DATA);
  });

  const renderItem = (item: OrderListItem) => {
    return <OrderItem {...item} />;
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#F0f0f0"
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
