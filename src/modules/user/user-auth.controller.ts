import { NextFunction, Request, Response } from "express";
import ServiceAuth from "./auth.services";
import ServiceUser from "./user.services";
import ResponseBuilder from "../../utils/ResponseBuilder";

class ControllerAuthUser {
  private _serviceAuth: ServiceAuth;
  private _serviceUser: ServiceUser;

  constructor(serviceAuth: ServiceAuth, serviceUser: ServiceUser) {
    this._serviceAuth = serviceAuth;
    this._serviceUser = serviceUser;
  }

  public login() {
    const auth = this._serviceAuth;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await auth.login({
          username: req.body.username,
          password: req.body.password
        });
        return ResponseBuilder.response(res, 200, response, "Login Success!");
      } catch (error) {
        next(error);
      }
    };
  }

  public register() {
    const auth = this._serviceAuth;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await auth.register({
          username: req.body.username,
          password: req.body.password,
          id: req.body.id,
          email: req.body.email,
          points: req.body.points
        });
        return ResponseBuilder.response(
          res,
          201,
          response,
          "Register Success!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getUserById() {
    const user = this._serviceUser;
    return async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      try {
        const response = await user.getUserById(id);
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get UserBy Id!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getAllUser() {
    const user = this._serviceUser;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await user.getAllUser();
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get All User!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getUserByUsername() {
    const user = this._serviceUser;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await user.getUserByUsername(req.body.username);
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get User By Username!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getOrderedBooksByUserId() {
    const user = this._serviceUser;
    return async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      try {
        const response = await user.getOrderedBooksByUserId(id, page, pageSize);
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get Ordered Books By User Id!"
        );
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerAuthUser;
