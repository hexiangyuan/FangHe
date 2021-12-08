import BleManager from "react-native-ble-manager";

export const writeModeToBle = async (mode: number) => {
  const connected = await BleManager.getConnectedPeripherals([]);
  const peripheralInfo = await BleManager.retrieveServices(connected[0].id);
  return BleManager.write(peripheralInfo.id, "fffe", "fe02", [0x03, 0x12, mode]);
};
