/* eslint-disable no-unused-vars */
import { IRepoBook } from "../book/book.types";
import { IRepoUser } from "../user/user.types";
import { IOrder, IServiceOrder, IRepoOrder } from "./order.types";

class ServiceOrder implements IServiceOrder {
  private _repoOrder: IRepoOrder;
  private _repoBook: IRepoBook;
  private _repoUser: IRepoUser;

  constructor(repoOrder: IRepoOrder, repoBook: IRepoBook, repoUser: IRepoUser) {
    this._repoOrder = repoOrder;
    this._repoBook = repoBook;
    this._repoUser = repoUser;
  }

  public async getAllOrder(): Promise<IOrder[] | Array<[]>> {
    return await this._repoOrder.list();
  }

  public async createNewOrder(orderData: IOrder): Promise<IOrder> {
    const { userId, bookId, quantity } = orderData;
    const user = await this._repoUser.findById(userId);
    const book = await this._repoBook.findBookById(bookId);

    // validate the user and book
    if (!user || !book) {
      throw new Error("User or book not found");
    }
    const totalCost = book.price * quantity;

    // check if the user has enough points to make the order
    if (user.points < totalCost) {
      throw new Error("User does not have enough points");
    }

    user.points = user.points - totalCost;
    book.stocks = book.stocks - quantity;
    await this._repoUser.updateUser(userId, user);
    await this._repoBook.updateBook(bookId, book);

    const newOrder = { ...orderData, totalCost };
    return await this._repoOrder.insertOrder(newOrder);
  }

  public async getOrderById(id: number): Promise<IOrder | null> {
    return await this._repoOrder.findOrderById(id);
  }

  public async updateOrder(
    id: number,
    updatedOrderData: Partial<IOrder>
  ): Promise<IOrder | null> {
    return await this._repoOrder.updateOrder(id, updatedOrderData);
  }

  public async deleteOrder(id: number): Promise<IOrder | null> {
    return await this._repoOrder.deleteOrder(id);
  }
}

export default ServiceOrder;
