//
//  PayEventManager.m
//  FangHe
//
//  Created by YYY on 2021/4/27.
//

#import "PayEventManager.h"

@implementation PayEventManager
{
  bool hasListeners;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"PayEventEmitter"];
}

-(void)sendPayEvent:(NSNotification *)notification
{
  NSDictionary *userInfo = notification.userInfo;
    [self sendEventWithName:@"WXPayResp" body:userInfo];
}


@end
