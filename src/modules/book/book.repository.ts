import BookModel from "./book.model";
import { IBook, IRepoBook } from "./book.types";

class RepoBook implements IRepoBook {
  public async list(): Promise<IBook[] | Array<[]>> {
    return BookModel.findMany();
  }

  public async findByBookTitle(bookTitle: string): Promise<IBook | null> {
    return BookModel.findOneByBookTitle(bookTitle);
  }

  public async findBookById(bookId: number): Promise<IBook | null> {
    return BookModel.findBookById(bookId);
  }

  public async insertBook(bookData: IBook): Promise<IBook> {
    return BookModel.insertBook(bookData);
  }

  public async updateBook(
    bookId: number,
    updatedBookData: Partial<IBook>
  ): Promise<IBook | null> {
    return BookModel.updateBook(bookId, updatedBookData);
  }

  public async deleteBook(bookId: number): Promise<IBook | null> {
    return BookModel.deleteBook(bookId);
  }
}

export default RepoBook;
