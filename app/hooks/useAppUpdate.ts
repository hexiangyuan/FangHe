import { useEffect, useState } from "react";
import Axios from "axios";

type AppNeedUpdate = {
  needUpdate: boolean;
  updateMode: number;
};

const useAppUpdate = () => {
  const [appNeedUpdate, setAppNeedUpdate] = useState<AppNeedUpdate>({ needUpdate: false, updateMode: 0 });

  useEffect(() => {
    Axios.get("https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopaoappversion")
      .then(response => {
        console.log("/aaaaa", response.data);
      })
      .catch(e => {
        console.log("/aaaaa", e);
      });
  }, []);

  return appNeedUpdate;
};

export default useAppUpdate;
