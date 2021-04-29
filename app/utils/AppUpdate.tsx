import { View } from "react-native";
import React, { useEffect, useState } from "react";
import FangPaoPaoNativeModule from "../native/NativeModule";

const useAppVersion = () =>{
  
}

const AppUpdate = () => {
  const [updateMode, setUpdateMode] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    async function () {
      
    };
  }, []);

  return <View />;
};
