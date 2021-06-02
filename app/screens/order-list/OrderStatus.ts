export enum OrderStatus {
  BOOKED = 10,
  ACCEPTED = 20,
  FINISHED = 30,
  CANCELED = 40,
  ACCEPTED_CANCEL = 50
}

export enum PayStatus {
  PAYED = 1,
  UN_PAY = 0
}

export function getOrderNameByStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.BOOKED:
    case OrderStatus.ACCEPTED:
      return "已预约";
    case OrderStatus.FINISHED:
      return "已完成";
    case OrderStatus.CANCELED:
      return "取消中";
    case OrderStatus.ACCEPTED_CANCEL:
      return "已取消";
    default:
      return "";
  }
}

export function canPayOrder(payStatus: PayStatus): boolean {
  return payStatus !== PayStatus.PAYED;
}

export function canCancelOrder(orderStatus: OrderStatus): boolean {
  return orderStatus === OrderStatus.ACCEPTED || orderStatus === OrderStatus.BOOKED;
}

export function getPayStatusNameByPayStatus(status: PayStatus): string {
  switch (status) {
    case PayStatus.PAYED:
      return "已支付";
    default:
      return "未支付";
  }
}
