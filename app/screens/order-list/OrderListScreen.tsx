import { FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { OrderListItem } from "./OrderList.model";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { canCancelOrder, getOrderNameByStatus } from "./OrderStatus";
import { RootNavigation } from "../../navigation";
import HomeApi from "../main-screen/HomeApi";

export const OrderItem = (props: OrderListItem) => {
  return (
    <View style={{ padding: 12 }}>
      <Text
        onPress={() => {
          RootNavigation.push("ShopDetailScreen", { id: props.shopId });
        }}
        style={{
          fontSize: 18,
          color: "#333",
          fontWeight: "bold"
        }}
      >
        {props.shopName}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          // RootNavigation.push("ProductDetailScreen", { id: props.id });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            height: 72
          }}
        >
          {props.productImg && (
            <UIImage
              source={{ uri: props.productImg }}
              style={{
                width: 72,
                height: 72
              }}
            />
          )}
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
                {props.productName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FF4D4D",
                  marginLeft: 12
                }}
              >
                {getOrderNameByStatus(props.status)}
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
                ￥{props.price / 100}
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
      </TouchableWithoutFeedback>
      {canCancelOrder(props.status) && (
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

  useEffect(() => {}, []);
  useEffect(() => {
    HomeApi.orderList(0).then(value => {
      if (value.code === 200 && value.data) {
        setDate(value.data);
      }
    });
  }, []);

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
