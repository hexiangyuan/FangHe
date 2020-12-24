import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { UIButton, UIImage } from "react-native-pjt-ui-lib";
import { Colors } from "../../theme/Theme";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../../components";
import Window from "../../constant/window";
import { BottomModal, ModalContent } from "react-native-modals";
import { DateTimeSelector } from "../../components/date-time-selector/DateTimeSelector";
import { KeyValue } from "../../components/date-time-selector/DateTimeSelector.props";

export interface SkuInfo {
  id: number;
  shopName: string;
  productImg: string;
  productName: string;
  price: string;
  size: number;
}

const Sku = (props: SkuInfo) => {
  return (
    <View style={{ padding: 12 }}>
      <Text
        style={{
          fontSize: 18,
          color: "#333",
          fontWeight: "bold"
        }}
      >
        {props.productName}
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
          <Text
            style={{
              fontSize: 14,
              color: "#333"
            }}
            numberOfLines={2}
          >
            {props.productName}
          </Text>
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
    </View>
  );
};

const dateArray: KeyValue[] = [
  {
    key: "12-10",
    value: "12-10[今天]"
  },
  {
    key: "12-11",
    value: "12-11[今天]"
  },
  {
    key: "12-12",
    value: "12-12[今天]"
  }
];

const timeArray: KeyValue[] = [
  {
    key: "9:00-10:00",
    value: "9:00-10:00"
  },
  {
    key: "9:00-10:00",
    value: "9:00-10:00"
  },
  {
    key: "9:00-10:00",
    value: "9:00-10:00"
  }
];

export const OrderSubmitScreen = () => {
  const route = useRoute();
  const productInfo = route.params;
  const [date, setDate] = useState<string>("12月10号");
  const [time, setTime] = useState<string>("9:00-10:00");
  const [visible, setVisible] = useState<boolean>(false);

  const bottomBtnPressed = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1
      }}
    >
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
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#333"
                }}
              >
                {date}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#333"
                }}
              >
                {time}
              </Text>
            </View>
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
        <UIButton
          onPress={event => {
            setVisible(true);
          }}
          containerStyle={{ width: "100%" }}
        >
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
            <DateTimeSelector
              containStyle={{
                height: 300,
                width: Window.width
              }}
              date={dateArray}
              time={timeArray}
            />
          </View>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  );
};
