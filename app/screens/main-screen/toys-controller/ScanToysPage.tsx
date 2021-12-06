import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  ImageBackground,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

import BleManager from "react-native-ble-manager";
import { SafeAreaProvider } from "react-native-safe-area-context";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// export const ScanToysPage = () => {
//     return <View style={{ flex: 1 }}>
//         <ImageBackground
//             style={{ flex: 1 }}
//             source={require("../../../../assets/bg8.png")}
//         >
//             <Container></Container>
//         </ImageBackground>

//     </View>
// }
export const ScanToysPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <App />
      </View>
    </SafeAreaView>
  );
};

const Container = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
      <Image
        style={{ width: 48, height: 48, marginTop: 100, resizeMode: "cover" }}
        source={require("../../../../assets/lanya.png")}
      ></Image>

      <View style={{ height: 16, width: "100%" }} />

      <Text>使用前请打开蓝牙</Text>

      <Image
        style={{ width: "100%", height: "60%", marginTop: 100, resizeMode: "center" }}
        source={require("../../../../assets/juxing_8_copy.png")}
      ></Image>

      <Image
        style={{
          width: "30%",
          marginTop: 100,
          resizeMode: "center",
          position: "absolute",
          bottom: 0
        }}
        source={require("../../../../assets/zu_26.png")}
      ></Image>
    </View>
  );
};

/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const [connected, setConnected] = useState(false);
  const [peripheral, setPeripheral] = useState({});

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan(["d34e"], 3, true)
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
      setList(Array.from(peripherals.values()));
    }
    console.log("Disconnected from " + data.peripheral);
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log("Received data from " + data.peripheral + " characteristic " + data.characteristic, data.value);
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log("No connected peripherals");
      } else {
        console.log(JSON.stringify(results));
        BleManager.disconnect(results[0].id).then(() => {
          setConnected(false);
          setPeripheral({});
        });
      }
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

  const connectBle = peripheral => {
    setTimeout(() => {
      BleManager.connect(peripheral.id)
        .then(() => {
          console.log("connected succeed");
          setConnected(true);
          setPeripheral(peripheral);
        })
        .catch(e => {});
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

          // setTimeout(() => {
          //     BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
          //         console.log('Started notification on ' + peripheral.id);
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

    //     }, 900);
    // }).catch((error) => {
    //     console.log('Connection error', error);
    // });
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });

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

    return () => {
      console.log("unmount");
      bleManagerEmitter.removeListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral);
      bleManagerEmitter.removeListener("BleManagerStopScan", handleStopScan);
      bleManagerEmitter.removeListener("BleManagerDisconnectPeripheral", handleDisconnectedPeripheral);
      bleManagerEmitter.removeListener("BleManagerDidUpdateValueForCharacteristic", handleUpdateValueForCharacteristic);
    };
  }, []);

  const renderItem = item => {
    const color = item.connected ? "green" : "#fff";

    return (
      <TouchableHighlight onPress={() => connectBle(item)}>
        <View style={[styles.rows, { backgroundColor: color }]}>
          <Text style={{ fontSize: 12, textAlign: "center", color: "#333333", padding: 10 }}>{item.name}</Text>
          <Text style={{ fontSize: 10, textAlign: "center", color: "#333333", padding: 2 }}>RSSI: {item.rssi}</Text>
          <Text
            style={{
              fontSize: 8,
              textAlign: "center",
              color: "#333333",
              padding: 2,
              paddingBottom: 20
            }}
          >
            {item.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderModeItem = (item, index) => {
    const color = item.connected ? "green" : "#fff";

    return (
      <TouchableHighlight onPress={() => testPeripheral(item, index)}>
        <View style={[styles.rows, { backgroundColor: color }]}>
          <Text style={{ fontSize: 12, textAlign: "center", color: "#333333", padding: 10 }}>{item}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <View style={{ margin: 10 }}>
              <Button title={"扫描d34e蓝牙 (" + (isScanning ? "on" : "off") + ")"} onPress={() => startScan()} />
            </View>

            <Text style={{ textAlign: "center" }}>{connected ? "已连接" : "未连接"}</Text>

            <View style={{ margin: 10 }}>
              <Button title="断开蓝牙" onPress={() => retrieveConnected()} />
            </View>

            {list.length == 0 && (
              <View style={{ flex: 1, margin: 20 }}>
                <Text style={{ textAlign: "center" }}>No peripherals</Text>
              </View>
            )}
          </View>
        </ScrollView>
        {!connected && (
          <FlatList data={list} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.id} />
        )}

        {connected && (
          <FlatList
            data={["模式0", "模式1", "模式2", "模式3", "模式4", "模式5", "模式6", "模式7", "模式8", "模式9", "模式10"]}
            renderItem={({ item, index }) => renderModeItem(item, index)}
            keyExtractor={(item, index) => index + ""}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

export default App;
