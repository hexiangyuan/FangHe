//
//  FangHeNativeModule.m
//  FangHe
//
//  Created by YYY on 2021/4/28.
//

#import "FangHeNativeModule.h"

@implementation FangHeNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAppVersion : (RCTPromiseResolveBlock)resolve
                       rejecter : (RCTPromiseRejectBlock)reject)
{
  NSString *versionName =[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  resolve(versionName);
}

RCT_EXPORT_METHOD(getAppBuildNumber: (RCTPromiseResolveBlock)resolve
                          rejecter : (RCTPromiseRejectBlock)reject)
{
  NSString *buildNumber = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];
  resolve(buildNumber);
}
@end
