import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces";
import { JWT_KEY } from "../config/jwt";
export interface IRequestWithAuth extends Request {
  user?: IUser;
}

class Auth {
  constructor() {}

  public authorize(req: IRequestWithAuth, res: Response, next: NextFunction) {
    const headers = req.headers;
    if (!headers.authorization) {
      return res.status(403).json({
        data: "User not authorized!"
      });
    }
    const token = req.headers.authorization;
    const userData = jwt.verify(`${token}`, JWT_KEY) as IUser | undefined;
    if (!userData) {
      return res.status(403).json({
        data: "User not authorized!"
      });
    }

    req.user = userData;
    next();
  }
}

export default Auth;
