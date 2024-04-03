import UserModel from "./user.model";
import { IUser, IRepoUser } from "./user.types";
import { IBook } from "../book/book.types";

class RepoUser implements IRepoUser {
  public async list(): Promise<IUser[] | Array<[]>> {
    return UserModel.findMany();
  }
  public async findByUsername(username: string): Promise<IUser | null> {
    return UserModel.findOneByUsername(username);
  }

  public async findById(id: number): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  public async create(userData: IUser): Promise<IUser> {
    return UserModel.create(userData);
  }

  public async updateUser(
    id: number,
    updatedUserData: Partial<IUser>
  ): Promise<IUser | null> {
    return UserModel.updateUser(id, updatedUserData);
  }

  public async findOrderedBooksByUser(
    userId: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<IBook[]> {
    return UserModel.findOrderedBooksByUser(userId, page, pageSize);
  }
}

export default RepoUser;
