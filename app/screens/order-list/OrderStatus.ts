export enum OrderStatus {
  BOOKED = 10,
  ACCEPTED = 20,
  FINISHED = 30,
  CANCELED = 40,
  ACCEPTED_CANCEL = 50
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

export function canCancelOrder(orderStatus: OrderStatus): boolean {
  return false;
  // return orderStatus === OrderStatus.BOOKED || orderStatus === OrderStatus.ACCEPTED;
}
