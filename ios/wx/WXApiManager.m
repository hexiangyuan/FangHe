//
//  WXApiManager.m
//  SDKSample
//
//  Created by Jeason on 16/07/2015.
//
//

#import "WXApiManager.h"
#import "NativeToJSEventEmitter.h"

@implementation WXApiManager

#pragma mark - LifeCycle
+(instancetype)sharedManager {
  static dispatch_once_t onceToken;
  static WXApiManager *instance;
  dispatch_once(&onceToken, ^{
    instance = [[WXApiManager alloc] init];
  });
  return instance;
}

#pragma mark - WXApiDelegate
- (void)onResp:(BaseResp *)resp {
  if([resp isKindOfClass:[PayResp class]]){
    //支付返回结果，实际支付结果需要去微信服务器端查询
    NSLog(@"微信支付，retcode = %d, retstr = %@", resp.errCode,resp.errStr);
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"WXPayResp"
                                                        object:self
                                                      userInfo:@{ @"errCode" : @(resp.errCode) }];
  }
}

- (void)onReq:(BaseReq *)req {
  
}

@end
