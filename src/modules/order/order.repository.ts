/* eslint-disable no-unused-vars */
import OrderModel from "./order.model";
import { IOrder, IRepoOrder } from "./order.types";

class RepoOrder implements IRepoOrder {
  public async list(): Promise<IOrder[] | Array<[]>> {
    return await OrderModel.findMany();
  }

  public async insertOrder(orderData: IOrder): Promise<IOrder> {
    return await OrderModel.insertOrder(orderData);
  }

  public async findOrderById(id: number): Promise<IOrder | null> {
    return await OrderModel.findOrderById(id);
  }

  public async updateOrder(
    id: number,
    updatedOrderData: Partial<IOrder>
  ): Promise<IOrder | null> {
    return await OrderModel.updateOrder(id, updatedOrderData);
  }

  public async deleteOrder(id: number): Promise<IOrder | null> {
    return await OrderModel.deleteOrder(id);
  }
}

export default RepoOrder;
