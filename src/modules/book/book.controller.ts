import { NextFunction, Response } from "express";
import { IRequestWithAuth } from "../../middlewares/Auth";
import ServiceBook from "./book.services";
import { IBook } from "./book.types";
import ResponseBuilder from "../../utils/ResponseBuilder";

class ControllerBook {
  private _serviceBook: ServiceBook;

  constructor(serviceBook: ServiceBook) {
    this._serviceBook = serviceBook;
  }

  public getAllBook() {
    const serviceBook = this._serviceBook;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const response = await serviceBook.getAllBook();
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get Book List!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public getBookByTitle() {
    const serviceBook = this._serviceBook;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const title = req.query.title;
      try {
        const response = await serviceBook.findBookByTitle(title as string);
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Get Book by Title!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public insertBook() {
    const serviceBook = this._serviceBook;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const reqBody = {
          ...req.body
        };
        const response = await serviceBook.insertBook(reqBody as IBook);
        return ResponseBuilder.response(
          res,
          201,
          response,
          "Success Inserting a new Book!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public deleteBook() {
    const serviceBook = this._serviceBook;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const bookId = Number(req.params.id);
      try {
        const response = await serviceBook.deleteBook(bookId);
        if (!response) {
          return ResponseBuilder.response(
            res,
            404,
            response,
            "Book Not Found!"
          );
        }
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Deleting a Book!"
        );
      } catch (error) {
        next(error);
      }
    };
  }

  public updateBook() {
    const serviceBook = this._serviceBook;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      const bookId = Number(req.params.id);
      if (!bookId) {
        return ResponseBuilder.response(
          res,
          400,
          null,
          "Book ID is not valid!"
        );
      }
      try {
        const reqBody = { ...req.body };
        const response = await serviceBook.updateBook(bookId, reqBody as IBook);
        if (!response) {
          return ResponseBuilder.response(
            res,
            404,
            response,
            "Book Not Found!"
          );
        }
        return ResponseBuilder.response(
          res,
          200,
          response,
          "Success Updating a Book!"
        );
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerBook;
