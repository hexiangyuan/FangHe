import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from "../../../navigation";
import { useAsyncStorage } from "@react-native-community/async-storage";
import BleManager from "react-native-ble-manager";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../../theme/Theme";

export const DeviceMatchPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9999FF" }}>
      <View style={{ flex: 1 }}>
        <DeviceView />
      </View>
    </SafeAreaView>
  );
};

const DeviceView = () => {
  const { getItem } = useAsyncStorage("ConnectedBle");
  const [connectedFlag, setConnectedFlag] = useState(true);

  const [connectedHistory, setConnectedHistory] = useState([]);

  useEffect(() => {
    requestHistory();
  }, [connectedFlag]);

  function requestHistory() {
    getConnectedDevices()
      .then(value => {
        console.log("connectedHistory", value);
        if (value) {
          setConnectedHistory(value);
        }
      })
      .catch(reason => {
        console.log("connectedHistory error", reason);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      requestHistory();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const getConnectedDevices = async () => {
    const history = await getItem();
    const historyArray = !!history ? JSON.parse(history) : [];
    console.log("historyArray", historyArray[0].id);
    const connected = await BleManager.getConnectedPeripherals([]);
    if (connected.length > 0) {
      console.log("connected", connected[0]);
      for (let i = 0; i < historyArray.length; i++) {
        for (let j = 0; j < connected.length; j++) {
          if (historyArray[i].id === connected[j].id) {
            historyArray[i].isConnecting = true;
          }
        }
      }
    }
    return historyArray;
  };

  const connectBle = item => {
    setTimeout(() => {
      BleManager.connect(item.id)
        .then(() => {
          console.log("connected succeed");
          setConnectedFlag(!connectedFlag);
        })
        .catch(e => {
          console.log("connected error", e);
        });
    }, 500);
  };

  const _renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 16,
          backgroundColor: "white",
          minHeight: 72,
          justifyContent: "center",
          alignItems: "center",
          flex: 0.5,
          marginLeft: 8,
          marginRight: 8
        }}
        onPress={() => {
          if (!item.isConnecting) {
            connectBle(item);
          } else {
            RootNavigation.push("ChooseModePage");
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            position: "relative"
          }}
        >
          <Image
            source={require("../../../../assets/girls_tiaodan.png")}
            style={{ width: 40, height: 40, position: "absolute", bottom: 8, right: 8 }}
          />
          <View style={{ flex: 1, marginTop: 12, marginLeft: 12 }}>
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: item.isConnecting ? Colors.blue : "gray"
                }}
              />
              <Text style={{ fontSize: 12, color: item.isConnecting ? "#333" : "#666", marginLeft: 8 }}>
                {item.isConnecting ? "已连接" : "未连接"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={{ paddingHorizontal: 12, fontSize: 24, marginTop: 16 }}>我的设备</Text>
        {/* <Pressable*/}
        {/*  onPress={() => {*/}
        {/*    RootNavigation.push("NoDevicesModePage");*/}
        {/*  }}*/}
        {/* >*/}
        {/*  <Text style={{ paddingHorizontal: 12, fontSize: 16, marginTop: 16 }}>我没有设备</Text>*/}
        {/* </Pressable>*/}
      </View>

      <View style={{ height: 16 }} />

      <View style={{ paddingHorizontal: 8 }}>
        <FlatList
          data={connectedHistory}
          renderItem={({ item }) => _renderItem(item)}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ width: 16, height: 16 }} />}
        />
      </View>

      <View style={{ width: "100%", paddingHorizontal: 12, flexDirection: "row", marginTop: 16 }}>
        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            minHeight: 72,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
          onPress={() => {
            // RootNavigation.push("ChooseModePage");
            RootNavigation.push("ScanToysPage");
          }}
        >
          <Text>添加设备</Text>
        </TouchableOpacity>

        <View style={{ width: 16 }} />
        <Pressable
          onPress={() => {
            RootNavigation.push("YidiModePwdPage", { mode: 10 });
          }}
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            minHeight: 72,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Text>没有设备</Text>
        </Pressable>
      </View>
    </View>
  );
};
