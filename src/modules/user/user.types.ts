/* eslint-disable no-unused-vars */
import { IBook } from "../book/book.types";

export interface IUser {
  id: number;
  email: string;
  password: string;
  points: number;
  username: string;
}

export interface IRepoUser {
  list(): Promise<IUser[] | Array<[]>>;
  findByUsername(username: string): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
  create(userData: IUser): Promise<IUser>;
  updateUser(
    id: number,
    updatedUserData: Partial<IUser>
  ): Promise<IUser | null>;
  findOrderedBooksByUser(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<IBook[]>;
}

export interface IServiceUser {
  getUserById(id: number): Promise<IUser | null>;
  getAllUser(): Promise<IUser[] | Array<[]>>;
  createUser(userData: IUser): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser | null>;
  updateUser(userId: number, userData: IUser): Promise<IUser | null>;
  getOrderedBooksByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<IBook[]>;
}
