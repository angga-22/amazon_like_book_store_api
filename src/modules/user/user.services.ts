import { IBook } from "../book/book.types";
import RepoUser from "./user.repository";
import { IServiceUser, IUser } from "./user.types";

class ServiceUser implements IServiceUser {
  private _repoUser: RepoUser;

  constructor(repoUser: RepoUser) {
    this._repoUser = repoUser;
  }

  public async getUserById(id: number): Promise<IUser | null> {
    return (await this._repoUser.findById(id)) as IUser;
  }

  public async getAllUser(): Promise<IUser[] | Array<[]>> {
    return (await this._repoUser.list()) as IUser[];
  }

  public async createUser(userData: IUser): Promise<IUser> {
    return (await this._repoUser.create(userData)) as IUser;
  }

  public async getUserByUsername(username: string): Promise<IUser | null> {
    return (await this._repoUser.findByUsername(username)) as IUser;
  }

  public async updateUser(
    userId: number,
    userData: IUser
  ): Promise<IUser | null> {
    return await this._repoUser.updateUser(userId, userData);
  }

  public async getOrderedBooksByUserId(
    userId: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<IBook[]> {
    return this._repoUser.findOrderedBooksByUser(userId, page, pageSize);
  }
}

export default ServiceUser;
