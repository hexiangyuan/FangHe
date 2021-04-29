package com.fanghe

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FangHeNativeModule(reactContext: ReactApplicationContext?)
    : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "FangHeNativeModule"
    }

    @ReactMethod
    fun getAppVersion(callBack:Promise) {
        callBack.resolve(BuildConfig.VERSION_NAME)
    }

    @ReactMethod
    fun getAppBuildNumber(callBack: Promise){
        callBack.resolve(BuildConfig.VERSION_CODE)
    }

}