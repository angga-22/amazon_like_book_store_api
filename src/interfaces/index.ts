/* eslint-disable no-unused-vars */
import { Request, Response } from "express";

export enum OrderBookStatus {
  // Order is created but not yet confirmed
  CREATED,
  // Order has been paid for, but not yet shipped
  PAID,
  // Order has been shipped
  SHIPPED,
  // Order has been delivered
  DELIVERED,
  // Order cancel
  CANCELLED
}

export type TParams = {
  search?: string;
  page?: number;
  size?: number;
};

export interface IRestModel<T> {
  show: (id: string) => void;
  list: (params?: TParams) => void;
  create: (payload: T) => void;
  update: (id: string, payload: T) => void;
  remove: (id: string) => void;
}

export interface IRestController {
  show: (req: Request, res: Response) => void;
  list: (req: Request, res: Response) => void;
  create: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  remove: (req: Request, res: Response) => void;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  points: number;
  username: string;
}

export type TLoginPayload = {
  username: string;
  password: string;
};

export interface IServiceAuth {
  login(payload: TLoginPayload): Promise<IUser | string>;
  register(payload: IUser): Promise<IUser>;
}
