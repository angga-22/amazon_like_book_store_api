import { NextFunction, Response } from "express";
import { IRequestWithAuth } from "../../middlewares/Auth";
import ServiceOrder from "./order.services";
import { IOrder } from "./order.types";
import ResponseBuilder from "../../utils/ResponseBuilder";

class ControllerOrder {
  private _serviceOrder: ServiceOrder;

  constructor(serviceOrder: ServiceOrder) {
    this._serviceOrder = serviceOrder;
  }

  public getAllOrder() {
    const serviceOrder = this._serviceOrder;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const response = await serviceOrder.getAllOrder();
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get Order List!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getOrderById() {
    const serviceOrder = this._serviceOrder;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const id = req.params.id;
      try {
        const response = await serviceOrder.getOrderById(Number(id));
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get Order by Id!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public insertOrder() {
    const serviceOrder = this._serviceOrder;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const reqBody = {
          ...req.body,
          createdAt: new Date(req.body.createdAt),
          updatedAt: new Date(req.body.updatedAt)
        };
        const response = await serviceOrder.createNewOrder(reqBody as IOrder);
        if (!response) {
          return ResponseBuilder.response(
            res,
            400,
            response,
            "Failed Insert Order!"
          );
        }
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Insert Order!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public updateOrder() {
    const serviceOrder = this._serviceOrder;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const id = req.params.id;
      try {
        const response = await serviceOrder.updateOrder(
          Number(id),
          req.body as IOrder
        );
        if (!response) {
          return ResponseBuilder.response(
            res,
            404,
            response,
            "Order Not Found!"
          );
        }
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Update Order!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public deleteOrder() {
    const serviceOrder = this._serviceOrder;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const id = req.params.id;
      try {
        const response = await serviceOrder.deleteOrder(Number(id));
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Delete Order!"
        );
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerOrder;
