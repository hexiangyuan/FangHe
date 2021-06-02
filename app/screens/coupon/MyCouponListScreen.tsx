import { observer, useLocalStore } from "mobx-react-lite";
import React, { useEffect } from "react";
import { FlatList, useWindowDimensions, View, Image } from "react-native";
import { UIButton } from "react-native-pjt-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Text } from "../../components";
import { RootNavigation } from "../../navigation";
import { Colors } from "../../theme/Theme";
import HomeApi from "../main-screen/HomeApi";
import CouponUtils from "./ CouponUtils";

interface ItemProps {
  couponMoney: number;
  fullMoney: number;
  couponId: string;
  couponName: string;
  status: number;
  endTime: string;
}

const CouponItem = (props: ItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white", borderRadius: 4, padding: 14, margin: 12 }}>
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
        <UIButton>去使用</UIButton>
      </View>
    </View>
  );
};

const MyCouponListScreen = observer(() => {
  const store = useLocalStore(() => ({
    data: [],
    emptyData: false
  }));

  useEffect(() => {
    CouponUtils.getCouponList()
      .then(value => {
        store.data = value;
        store.emptyData = store.data.length === 0;
      })
      .catch(e => {
        console.log("1111111", e);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"我的优惠券"} />

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
          renderItem={({ item, index }) => {
            return <CouponItem {...item} />;
          }}
        />
      )}
      <View style={{ padding: 12 }}>
        <UIButton
          onPress={() => {
            RootNavigation.push("ShareScreen");
          }}
          containerStyle={{ width: "100%" }}
        >
          邀请新人得优惠券
        </UIButton>
      </View>
    </SafeAreaView>
  );
});

export default MyCouponListScreen;
