import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Icon } from "../../components";
import Window from "../../constant/window";
import { BottomModal, ModalContent } from "react-native-modals";
import { DateTimeSelector } from "../../components/date-time-selector/DateTimeSelector";
import { DateTimeModel, KeyValue } from "../../components/date-time-selector/DateTimeSelector.props";
import { RootNavigation } from "../../navigation";
import { getCurrentHouseFloor, getDateList, getHoursTotalDay } from "../../utils/date";
import HomeApi from "../main-screen/HomeApi";
import ToastGlobal from "../../utils/Toast";
import CouponUtils from "../coupon/ CouponUtils";
import { ItemProps } from "../coupon/UseCouponListScreen";

export interface SkuInfo {
  id: number;
  shopName: string;
  productImg: string;
  productName: string;
  price: number;
  size: number;
}

export const Sku = (props: SkuInfo) => {
  return (
    <View style={{ padding: 12 }}>
      <StatusBar barStyle={"dark-content"} />
      <Text
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
          marginTop: 8,
          height: 72
        }}
      >
        <UIImage
          source={{ uri: props.productImg }}
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
                color: "#333"
              }}
              numberOfLines={2}
            >
              {props.productName}
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
    </View>
  );
};

export const OrderSubmitScreen = ({ navigation }) => {
  const route = useRoute();

  const productInfo = route["params"] as SkuInfo;
  const [date, setDate] = useState<KeyValue>(undefined);
  const [time, setTime] = useState<KeyValue>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [dateTimeArray, setDateTimeArray] = useState<DateTimeModel[]>([]);
  const [couponList, setCouponList] = useState<ItemProps[]>(undefined);

  useEffect(() => {
    const dateList = getDateList(3).map((item, index) => {
      let value = "";
      switch (index) {
        case 0:
          value = "[今天]";
          break;
        case 1:
          value = "[明天]";
          break;
        case 2:
          value = "[后天]";
          break;
      }
      return {
        key: item,
        value: item + value
      };
    });

    let dataTimeTemp = [];
    dateList.forEach((value, index) => {
      let times;
      if (index === 0) {
        times = getCurrentHouseFloor().map(item => ({
          key: item,
          value: item
        }));
      } else {
        times = getHoursTotalDay().map(item => ({
          key: item,
          value: item
        }));
      }
      dataTimeTemp.push({
        date: value,
        time: times
      });
    });

    setDateTimeArray(dataTimeTemp);
  }, []);

  useEffect(() => {
    CouponUtils.getCouponList(productInfo.price * productInfo.size)
      .then(value => {
        const data = value.filter(value => value.available);
        setCouponList(data);
      })
      .catch(e => {
        ToastGlobal.show(e);
      });
  }, [productInfo.price, productInfo.size]);

  const bottomBtnPressed = () => {
    if (!date && !time) {
      setVisible(true);
    } else {
      HomeApi.orderSubmit({
        productId: productInfo.id,
        quantity: 1,
        couponReceiveId: selectedCoupon?.id ?? undefined,
        time: date.key + " " + time.key
      }).then(value => {
        if (value["code"] === 200) {
          DeviceEventEmitter.emit("OrderListChanged");
          RootNavigation.push("OrderSubmitSucceedScreen", value["data"]?.orderNo);
        } else {
          ToastGlobal.show(value["errorMsg"]);
        }
      });
    }
  };

  const couponItemClicked = () => {
    navigation.navigate("UseCouponListScreen", {
      productId: productInfo.id,
      price: productInfo.price * productInfo.size,
      selectedCoupon: selectedCoupon
    });
  };

  const timeDatePressed = () => {
    setVisible(true);
  };

  const onDateTimeSelected = (date: KeyValue, time: KeyValue) => {
    setDate(date);
    setTime(time);
    setVisible(false);
  };

  const selectedCoupon = route["params"]["selectedCoupon"] as ItemProps;

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Header headerText="提交订单" />
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 8,
            backgroundColor: "#F0F0F0"
          }}
        />
        <Sku {...productInfo} />

        <TouchableOpacity
          onPress={timeDatePressed}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingBottom: 12,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#333",
              fontWeight: "bold"
            }}
          >
            预约时间
          </Text>
          <View
            style={{
              flexDirection: "row",
              minHeight: 40,
              alignItems: "center"
            }}
          >
            {!!date && !!time ? (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#333"
                  }}
                >
                  {date?.value}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#333"
                  }}
                >
                  {time?.value}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  minHeight: 40,
                  justifyContent: "center"
                }}
              >
                <Text>请选择预约时间</Text>
              </View>
            )}
            <Icon
              style={{
                marginLeft: 12,
                width: 16,
                height: 16
              }}
              icon={"arrowRight"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={couponItemClicked}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingBottom: 12,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#333",
              fontWeight: "bold"
            }}
          >
            优惠券
          </Text>
          <View
            style={{
              flexDirection: "row",
              minHeight: 40,
              alignItems: "center"
            }}
          >
            {false ? (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.primary
                  }}
                >
                  {date?.value}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  minHeight: 40,
                  justifyContent: "center"
                }}
              >
                {selectedCoupon ? (
                  <Text style={{ color: Colors.primaryDark, fontSize: 16 }}>
                    {0 - selectedCoupon.couponMoney / 100}
                  </Text>
                ) : (
                  <Text style={{ color: "#333", fontSize: 16 }}>{couponList ? `${couponList.length}张可用` : ""}</Text>
                )}
              </View>
            )}
            <Icon
              style={{
                marginLeft: 12,
                width: 16,
                height: 16
              }}
              icon={"arrowRight"}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 16,
            backgroundColor: "#F0F0F0"
          }}
        />
        <Text
          style={{
            marginLeft: 12,
            marginTop: 12,
            fontSize: 16,
            color: "#666"
          }}
        >
          预约须知
        </Text>
        <Text
          style={{
            marginLeft: 12,
            marginTop: 12,
            fontSize: 14,
            color: "#666"
          }}
        >
          * 预约规则:本着为成年人的健康成长创造良好的社会环境原则，本产品依法不对未成年人开放。
        </Text>
      </View>
      <View
        style={{
          width: Window.width,
          paddingHorizontal: 12,
          paddingBottom: 12
        }}
      >
        <UIButton onPress={bottomBtnPressed} containerStyle={{ width: "100%" }}>
          立即预约
        </UIButton>
      </View>
      <BottomModal
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
      >
        <ModalContent>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                fontWeight: "bold",
                marginBottom: 24
              }}
            >
              预约时间
            </Text>
            <DateTimeSelector
              containStyle={{
                height: Window.height / 2,
                width: "100%"
              }}
              selectedDate={date}
              selectedTime={time}
              dateTime={dateTimeArray}
              onSelected={onDateTimeSelected}
            />
          </View>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  );
};
