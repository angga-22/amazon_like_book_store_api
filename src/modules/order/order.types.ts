/* eslint-disable no-unused-vars */

export enum OrderStatus {
  // Order is created but not yet confirmed
  CREATED = "CREATED",
  // Order has been paid for, but not yet shipped
  PAID = "PAID",
  // Order has been shipped
  SHIPPED = "SHIPPED",
  // Order has been delivered
  DELIVERED = "DELIVERED",
  // Order cancel
  CANCELLED = "CANCELLED"
}

export interface IOrder {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  bookId: number;
  quantity: number;
  totalCost: number;
  status: OrderStatus;
}

export interface IServiceOrder {
  getAllOrder(): Promise<IOrder[] | Array<[]>>;
  createNewOrder(newOrderData: IOrder): Promise<IOrder>;
  getOrderById(id: number): Promise<IOrder | null>;
  updateOrder(
    id: number,
    updatedOrderData: Partial<IOrder>
  ): Promise<IOrder | null>;
  deleteOrder(id: number): Promise<IOrder | null>;
}

export interface IRepoOrder {
  list(): Promise<IOrder[] | Array<[]>>;
  insertOrder(orderData: IOrder): Promise<IOrder>;
  findOrderById(id: number): Promise<IOrder | null>;
  updateOrder(
    id: number,
    updatedOrderData: Partial<IOrder>
  ): Promise<IOrder | null>;
  deleteOrder(id: number): Promise<IOrder | null>;
}
