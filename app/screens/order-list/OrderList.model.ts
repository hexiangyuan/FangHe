export interface ProductInfo {
  productName: string;
  productId: number;
  productImg: string;
  shopName: string;
  shopId: number;
}

export interface OrderListItem {
  orderNo: string;
  quantity: number;
  price: number;
  time: string;
  orderStatus: number;
  productInfo: ProductInfo;
}
