export function isEmpty(str: string): boolean {
  if (!str) {
    return true;
  }
  if (str.trim().length === 0) {
    return true;
  }
  return false;
}

export function isPhone(phone: string): boolean {
  if (isEmpty(phone)) {
    return false;
  }
  // 通过正则表达式判断手机号码格式是否正确,根据电信，联通、移动手机号码规则可以到以下正则
  // 手机号码第一位是[1]开头，第二位[3,4,5,7,8]中的一位，第三位到第十一位则是[0-9]中的数字；
  // ^1表示开头为1

  // [0-9]{9} 匹配包含0-9的数字
  const reg = /^1[0-9]{10}/;
  if (reg.test(phone)) {
    return true; // 手机号码正确
  }

  return false;
}

/**
 * 是否是验证码
 * @param code
 */
export function isVerificationCode(code: string): boolean {
  if (isEmpty(code)) {
    return false;
  }
  const reg = /^[0-9]{6}/;
  if (reg.test(code)) {
    return true; // 手机号码正确
  }
  return false;
}

export function formatDistanceMeter(distanceMeter: number): string {
  if (distanceMeter === null || distanceMeter === undefined || distanceMeter < 0) {
    return "未知";
  }
  if (distanceMeter < 1000) {
    return distanceMeter + "米";
  }
  return distanceMeter / 1000 + "千米";
}

const StringUtils = {
  isEmpty,
  isPhone,
  formatDistanceMeter
};

export default StringUtils;
