import { DeviceEventEmitter, FlatList, Image, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components";
import { OrderListItem } from "./OrderList.model";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { canPayOrder, getOrderNameByStatus, getPayStatusNameByPayStatus } from "./OrderStatus";
import { RootNavigation } from "../../navigation";
import HomeApi from "../main-screen/HomeApi";
import { EmptyView } from "../main-screen/find-tab/components/EmptyView";
import { useNavigation, StackActions, useFocusEffect } from "@react-navigation/native";
import { EVENT_NAME_LOGIN_SUCCEED } from "../login/login-verification-code-screen";
import WeChatSdk from "../../weixin/WeChatSdk";
import ToastGlobal from "../../utils/Toast";

export const OrderItem = (props: OrderListItem) => {
  const payOrder = useCallback(() => {
    WeChatSdk.payOrder(props.id).catch(e => {
      console.log(e.toString());
    });
  }, [props.id]);

  return (
    <Pressable
      style={{ padding: 12 }}
      onPress={() => {
        RootNavigation.push("ProductDetailScreen", { id: props.productId });
      }}
    >
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
      <View
        style={{
          flexDirection: "row",
          marginTop: 8
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
            flex: 1,
            marginLeft: 8,
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text
              style={{
                fontSize: 18,
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

          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 8
              }}
            >
              {"预约时间: " + props.time}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                marginTop: 8
              }}
            >
              {"客服电话: " + props.contactMobie}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.primary
              }}
            >
              ¥{props.price / 100}
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
      {canPayOrder(props.payStatus) ? (
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
            fontStyle={{ color: "white" }}
            type={"primary"}
            onPress={payOrder}
          >
            支付
          </UIButton>
          <View style={{ width: 16 }} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row-reverse",
            marginTop: 12
          }}
        >
          <Text>{getPayStatusNameByPayStatus(props.payStatus)}</Text>
          <View style={{ width: 16 }} />
        </View>
      )}
    </Pressable>
  );
};

export const OrderListComponent = () => {
  const [data, setDate] = useState<Array<OrderListItem>>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("WeChat_Resp", resp => {
      if (resp.type === "WXLaunchMiniProgramReq.Resp") {
        // 从小程序回到APP的事件
      } else if (resp.type === "SendMessageToWX.Resp") {
        // 发送微信消息后的事件
      } else if (resp.type === "PayReq.Resp") {
        // 支付回调
        getList();
      }
      return () => {
        listener.remove();
      };
    });
  }, []);

  function getList() {
    setRefreshing(true);
    HomeApi.orderList(0).then(value => {
      if (value.code === 200 && value.data) {
        setDate(value.data);
      } else {
        ToastGlobal.show(value["errorMsg"]);
      }
      setRefreshing(false);
    });
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const event = DeviceEventEmitter.addListener(EVENT_NAME_LOGIN_SUCCEED, () => {
      getList();
    });
    return () => {
      event.remove();
    };
  }, []);

  useEffect(() => {
    const event = DeviceEventEmitter.addListener("OrderListChanged", () => {
      getList();
    });
    return () => {
      event.remove();
    };
  }, []);

  const renderItem = (item: OrderListItem) => {
    return <OrderItem {...item} />;
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => renderItem(item)}
      ListEmptyComponent={() => {
        return (
          <EmptyView
            onPress={() => {
              getList();
            }}
            text={"暂时还没发现您的订单哦\n 快快去下单吧"}
          />
        );
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getList} />}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: "#F0f0f0"
          }}
        />
      )}
    />
  );
};

export const OrderListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header
          headerText={"我的预约单"}
          onLeftPress={() => {
            navigation.dispatch(StackActions.popToTop());
          }}
        />
        <OrderListComponent />
      </View>
    </SafeAreaView>
  );
};

export const OrderListSafeAreComponent = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <OrderListComponent />
    </SafeAreaView>
  );
};
