import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  Image,
  Pressable,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BleManager from "react-native-ble-manager";
import { Colors } from "../../../../theme/Theme";
import { Header } from "../../../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-community/async-storage";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const ScanToysPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"添加设备"}
        onLeftPress={() => {
          navigation.dispatch(StackActions.pop());
        }}
      />
      <View style={{ flex: 1 }}>
        <Content />
      </View>
    </SafeAreaView>
  );
};

const Container = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
      <Image
        style={{ width: 48, height: 48, marginTop: 100, resizeMode: "cover" }}
        source={require("../../../../../assets/lanya.png")}
      />

      <View style={{ height: 16, width: "100%" }} />

      <Text>使用前请打开蓝牙</Text>

      <Image
        style={{ width: "100%", height: "60%", marginTop: 100, resizeMode: "center" }}
        source={require("../../../../../assets/juxing_8_copy.png")}
      />

      <Image
        style={{
          width: "30%",
          marginTop: 100,
          resizeMode: "center",
          position: "absolute",
          bottom: 0
        }}
        source={require("../../../../../assets/zu_26.png")}
      />
    </View>
  );
};

/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

const Content = () => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connectedBles, setConnectedBles] = useState([]);

  const { getItem, setItem } = useAsyncStorage("ConnectedBle");

  useEffect(() => {
    BleManager.start({ showAlert: false });
    startScan();
    bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral);
    bleManagerEmitter.addListener("BleManagerStopScan", handleStopScan);
    bleManagerEmitter.addListener("BleManagerDisconnectPeripheral", handleDisconnectedPeripheral);
    bleManagerEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", handleUpdateValueForCharacteristic);

    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }

    retrieveConnected();

    return () => {
      bleManagerEmitter.removeListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral);
      bleManagerEmitter.removeListener("BleManagerStopScan", handleStopScan);
      bleManagerEmitter.removeListener("BleManagerDisconnectPeripheral", handleDisconnectedPeripheral);
      bleManagerEmitter.removeListener("BleManagerDidUpdateValueForCharacteristic", handleUpdateValueForCharacteristic);
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      //"d34e"
      BleManager.scan([], 5, true)
        .then(results => {
          console.log("Scanning...");
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleStopScan = () => {
    console.log("Scan is stopped");
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = data => {
    const peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setConnectedBles([]);
      startScan();
    }
    console.log("Disconnected from " + data.peripheral);
  };

  const handleConnectedSucceed = data => {
    console.log("handleConnectedSucceed", data);
    getItem()
      .then(value => {
        const old = value ? JSON.parse(value) : [];
        const found = old.find(it => it.id === data.id);
        if (!found) {
          old.push({ id: data.id, name: data.name, rssi: data.rssi });
        }
        return old;
      })
      .then(value => {
        return setItem(JSON.stringify(value));
      })
      .catch(reason => {
        console.log("save error", reason);
      });
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log("Received data from " + data.peripheral + " characteristic " + data.characteristic, data.value);
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length === 0) {
        console.log("No connected peripherals");
      } else {
        console.log(JSON.stringify(results));
        results.forEach((value, index) => {
          value.connected = true;
        });
        setConnectedBles(results);
      }
    });
  };

  const showDissconnectAlert = (id: string) => {
    Alert.alert("断开", "您需要断开链接么？", [
      {
        text: "取消"
      },
      {
        text: "断开",
        onPress: () => {
          disconnected(id);
        }
      }
    ]);
  };

  const disconnected = (id: string) => {
    BleManager.disconnect(id, true)
      .then(() => {
        console.log("aaaa", "disconnect");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDiscoverPeripheral = peripheral => {
    console.log("Got ble peripheral", peripheral);
    if (!peripheral.name) {
      peripheral.name = "NO NAME";
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const connectBle = item => {
    setTimeout(() => {
      BleManager.connect(item.id)
        .then(() => {
          console.log("connected succeed");
          setConnected(true);
          handleConnectedSucceed(item);
          retrieveConnected();
        })
        .catch(e => {
        });
    }, 500);
  };

  const testPeripheral = (item, index) => {
    if (peripheral) {
      BleManager.retrieveServices(peripheral.id)
        .then(peripheralInfo => {
          console.log(peripheralInfo);
          const service = "fffe";
          const bakeCharacteristic = "fe01";
          const crustCharacteristic = "fe02";
          setTimeout(() => {
            BleManager.write(peripheral.id, service, crustCharacteristic, [0x03, 0x12, index]).then(() => {
              console.log("Writed NORMAL crust");
            });
          }, 500);
        })
        .catch(error => {
          console.log("Notification error", error);
        });
    }
  };

  const renderItem = item => {
    const color = item.connected ? Colors.blue : "#fff";
    const fontColor = item.connected ? "#fff" : "#333";
    return (
      <Pressable onPress={() => (item.connected ? showDissconnectAlert(item.id) : connectBle(item))}>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: color,
            alignItems: "center",
            marginHorizontal: 16
          }}
        >
          <Image
            source={require("../../../../../assets/bluetooth_blue.png")}
            style={{ width: 32, height: 32, resizeMode: "center" }}
          />
          <View style={[{ flexDirection: "column" }, { backgroundColor: color, paddingHorizontal: 8 }]}>
            <Text style={{ fontSize: 16, color: fontColor }}>{item.name}</Text>
            <Text style={{ fontSize: 10, color: fontColor, paddingTop: 2 }}>RSSI: {item.rssi + "  " + item.id}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          width: "100%",
          backgroundColor: "#9999FF",
          fontSize: 16,
          color: "white",
          paddingVertical: 8,
          paddingHorizontal: 16
        }}
      >
        使用前请务必打开蓝牙
      </Text>

      <View>
        <Text style={{ paddingHorizontal: 12, fontSize: 24, marginTop: 16 }}>我的设备</Text>
        <View style={{ height: 16 }} />
        {<FlatList data={connectedBles} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.id} />}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ paddingHorizontal: 12, fontSize: 24, marginTop: 16 }}>可用设备</Text>
        <Pressable onPress={() => startScan()}>
          <Text style={{ paddingHorizontal: 12, fontSize: 16, marginTop: 16 }}>
            {isScanning ? "扫描中..." : "扫描设备"}
          </Text>
        </Pressable>
      </View>
      {<FlatList data={list} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.id} />}
    </View>
  );
};
