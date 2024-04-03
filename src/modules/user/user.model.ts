import { prisma } from "../../config";
import { IUser } from "../../interfaces";
import { IBook } from "../book/book.types";

class UserModel {
  async findMany(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  async findOneByUsername(username: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { username }
    });
  }

  async findById(id: number): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async create(userData: IUser): Promise<IUser> {
    return prisma.user.create({
      data: userData
    });
  }

  async updateUser(
    id: number,
    updatedUserData: Partial<IUser>
  ): Promise<IUser | null> {
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    if (!existingUser) {
      return null;
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...updatedUserData }
    });

    return updatedUser;
  }

  async findOrderedBooksByUser(
    userId: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<IBook[]> {
    const skipAmount = (page - 1) * pageSize;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          where: {
            status: {
              in: ["DELIVERED"]
            }
          },
          include: {
            book: true
          },
          take: pageSize,
          skip: skipAmount
        }
      }
    });
    if (user) {
      return user.orders.map((order) => order.book);
    } else {
      return [];
    }
  }
}

export default new UserModel();
