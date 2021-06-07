import { useRoute } from "@react-navigation/core";
import { observer, useLocalStore } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { FlatList, useWindowDimensions, View, Image, Pressable } from "react-native";
import { UIButton } from "react-native-pjt-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox, Header, Text } from "../../components";
import { Colors } from "../../theme/Theme";
import CouponUtils from "./ CouponUtils";

export interface ItemProps {
  couponMoney: number;
  id: number;
  fullMoney: number;
  couponId: string;
  couponName: string;
  status: number;
  endTime: string;
  available: boolean;
  selected: boolean;
}

const CouponItem = (props: ItemProps & { onItemPressable: (id: number) => {} }) => {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      onPress={() => {
        if (props.available) {
          props.onItemPressable(props.id);
        }
      }}
    >
      <View
        style={{ flex: 1, flexDirection: "row", backgroundColor: "white", borderRadius: 4, padding: 14, margin: 12 }}
      >
        <View style={{ flexDirection: "column", minWidth: width / 4, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: Colors.primary, fontSize: 32, fontWeight: "bold" }}>{props.couponMoney / 100}</Text>
          <Text style={{ color: "#333", fontSize: 14, fontWeight: "bold" }}>{`满${props.fullMoney / 100}可用`}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginHorizontal: 8,
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Text style={{ color: "#333", fontSize: 16, fontWeight: "bold" }}>{props.couponName}</Text>
          <Text style={{ color: "#333", marginTop: 8, fontSize: 12 }}>{props.endTime}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          {props.available ? (
            <Checkbox value={props.selected}></Checkbox>
          ) : (
            <Text style={{ color: "#666" }}>不可用</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const MyCouponListScreen = observer(({ navigation }) => {
  const store = useLocalStore(() => ({
    data: [],
    emptyData: false,
    preSelected: 0
  }));

  const { price, selectedCoupon } = useRoute().params;

  useEffect(() => {
    CouponUtils.getCouponList(price)
      .then(value => {
        if (selectedCoupon) {
          value.forEach(value => {
            value.selected = value.id === selectedCoupon.id;
          });
          store.preSelected = selectedCoupon?.id;
        }
        store.data = value;
        store.emptyData = store.data.length === 0;
      })
      .catch(e => {
        console.log("1111111", e);
      });
  }, [price, selectedCoupon, store]);

  const onItemPressable = (id: number) => {
    if (store.preSelected === id) {
      store.data.forEach(value => {
        value.selected = false;
      });
      store.preSelected = 0;
    } else {
      store.data.forEach(value => {
        value.selected = value.id === id;
      });
      store.preSelected = id;
    }
    store.data = store.data.slice();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"使用优惠券"} />

      {store.emptyData ? (
        <View style={{ flex: 1, marginTop: 100, alignItems: "center" }}>
          <Image source={require("../../../assets/coupon_empty.png")} style={{ width: 200 }} resizeMode={"cover"} />
          <Text style={{ color: "#333", fontSize: 16 }}>您没有可用的优惠券</Text>
        </View>
      ) : (
        <FlatList
          style={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}
          data={store.data}
          keyExtractor={(item, index) => index + ""}
          renderItem={({ item }) => {
            return <CouponItem {...item} onItemPressable={onItemPressable} />;
          }}
        />
      )}
      <View style={{ padding: 12 }}>
        <UIButton
          onPress={() => {
            navigation.navigate({
              name: "OrderSubmitScreen",
              params: {
                selectedCoupon: store.data.find(value => value.selected)
              },
              merge: true
            });
          }}
          containerStyle={{ width: "100%" }}
        >
          确定
        </UIButton>
      </View>
    </SafeAreaView>
  );
});

export default MyCouponListScreen;
