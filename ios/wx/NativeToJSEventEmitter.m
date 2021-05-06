//
//  PayEventManager.m
//  FangHe
//
//  Created by YYY on 2021/4/27.
//

#import "NativeToJSEventEmitter.h"

@implementation NativeToJSEventEmitter
{
  bool hasListeners;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"WXPayResp"];//注册的RN的方法名称
}


// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(emitEventInternal:)
                                               name:@"WXPayResp"
                                             object:nil];
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

-(void)emitEventInternal:(NSNotification *)notification
{
    [self sendEventWithName:@"WXPayResp"
                       body:notification.userInfo];
}

@end
