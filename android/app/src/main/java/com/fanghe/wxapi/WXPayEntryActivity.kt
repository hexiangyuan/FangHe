package com.fanghe.wxapi

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.tencent.mm.opensdk.modelbase.BaseReq
import com.tencent.mm.opensdk.modelbase.BaseResp
import com.tencent.mm.opensdk.openapi.IWXAPI
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler
import com.tencent.mm.opensdk.openapi.WXAPIFactory


class WXPayEntryActivity : Activity(), IWXAPIEventHandler {

    private var api: IWXAPI? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        api = WXAPIFactory.createWXAPI(this, "wx0c50b0961074ff2d")
        api?.handleIntent(intent, this)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        api?.handleIntent(intent, this)
    }

    private fun sendEvent(reactContext: ReactContext,
                          eventName: String,
                          params: WritableMap?) {
        reactContext
                .getJSModule<RCTDeviceEventEmitter>(RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }


    override fun onResp(resp: BaseResp?) {
        val reactContext = (applicationContext as ReactApplication).reactNativeHost.reactInstanceManager.currentReactContext
        if (resp != null && reactContext != null) {
            val writableMap = WritableNativeMap()
            writableMap.putInt("errCode", resp.errCode)
            writableMap.putString("errStr", resp.errStr)
            writableMap.putString("transaction", resp.transaction)
            writableMap.putString("openId", resp.openId)
            sendEvent(reactContext, "WXPayResp", writableMap)
        }
        finish()

    }

    override fun onReq(req: BaseReq?) {
        Log.e("onReq:", "req=" + req);
    }
}