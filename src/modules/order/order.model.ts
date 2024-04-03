import { prisma } from "../../config";
import { IOrder, OrderStatus } from "./order.types";

class OrderModel {
  async findMany(): Promise<IOrder[]> {
    const orders = await prisma.order.findMany();
    return orders.map((order) => ({
      ...order,
      status: order.status as OrderStatus
    }));
  }

  async findOrderById(id: number): Promise<IOrder | null> {
    const order = await prisma.order.findUnique({
      where: { id }
    });
    if (!order) {
      return null;
    }
    return {
      ...order,
      status: order.status as OrderStatus
    };
  }

  async insertOrder(orderData: IOrder): Promise<IOrder> {
    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        status: OrderStatus.CREATED
      }
    });
    return {
      ...newOrder,
      status: newOrder.status as OrderStatus
    };
  }

  async updateOrder(
    id: number,
    updatedOrderData: Partial<IOrder>
  ): Promise<IOrder | null> {
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    });
    if (!existingOrder) {
      return null;
    }
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { ...updatedOrderData }
    });

    return {
      ...updatedOrder,
      status: updatedOrder.status as OrderStatus
    };
  }

  async deleteOrder(id: number): Promise<IOrder | null> {
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    });

    if (!existingOrder) {
      return null;
    }

    const deletedOrder = await prisma.order.delete({
      where: { id }
    });

    return {
      ...deletedOrder,
      status: deletedOrder.status as OrderStatus
    };
  }
}

export default new OrderModel();
