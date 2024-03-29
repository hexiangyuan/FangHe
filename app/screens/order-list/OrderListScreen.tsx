import { DeviceEventEmitter, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components";
import { OrderListItem } from "./OrderList.model";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { canCancelOrder, canPayOrder, getOrderNameByStatus, getPayStatusNameByPayStatus } from "./OrderStatus";
import { RootNavigation } from "../../navigation";
import HomeApi from "../main-screen/HomeApi";
import { EmptyView } from "../main-screen/find-tab/components/EmptyView";
import { useNavigation, StackActions } from "@react-navigation/native";
import { EVENT_NAME_LOGIN_SUCCEED } from "../login/login-verification-code-screen";
import ToastGlobal from "../../utils/Toast";
import { useStoreStatus } from "../../hooks/useStoreStatus";

export const OrderItem = (props: OrderListItem & { iosStatus: boolean; cancleOrder: (id: number) => void }) => {
  const payOrder = useCallback(() => {
    RootNavigation.push("PayScreen", { orderId: props.id, amount: props.price });
  }, [props.id, props.price]);

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
      <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
        {canCancelOrder(props.status) && (
          <UIButton
            containerStyle={{
              height: 32
            }}
            type={"minor"}
            onPress={() => {
              props.cancleOrder(props.id);
            }}
          >
            取消
          </UIButton>
        )}

        {!props.iosStatus ? (
          canPayOrder(props.payStatus, props.status) ? (
            <View
              style={{
                flexDirection: "row-reverse"
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
          )
        ) : null}
      </View>
    </Pressable>
  );
};

export const OrderListComponent = () => {
  const [data, setDate] = useState<Array<OrderListItem>>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const iosStatus = useStoreStatus();
  const [reload, setReload] = useState<string>("");

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
      if (value["code"] === 200 && value["data"]) {
        setDate(value["data"]);
      } else {
        ToastGlobal.show(value["errorMsg"]);
      }
      setRefreshing(false);
    });
  }

  useEffect(() => {
    getList();
  }, [reload]);

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

  const renderItem = (item: OrderListItem & { iosStatus: boolean }) => {
    return (
      <OrderItem
        {...item}
        cancleOrder={(id: number) => {
          HomeApi.cancelOrder(id)
            .then(value => {
              setReload(Date().toString());
            })
            .catch(e => {});
        }}
      />
    );
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => renderItem({ ...item, iosStatus: iosStatus })}
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
