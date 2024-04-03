import { IBook, IServiceBook, IRepoBook } from "./book.types";

class ServiceBook implements IServiceBook {
  private _repoBook: IRepoBook;

  constructor(repoBook: IRepoBook) {
    this._repoBook = repoBook;
  }

  public async insertBook(bookData: IBook): Promise<IBook> {
    return await this._repoBook.insertBook(bookData);
  }

  public async getAllBook(): Promise<IBook[] | Array<[]>> {
    return await this._repoBook.list();
  }

  public async findBookByTitle(bookTitle: string): Promise<IBook | null> {
    return await this._repoBook.findByBookTitle(bookTitle);
  }

  public async updateBook(
    bookId: number,
    updatedBookData: Partial<IBook>
  ): Promise<IBook | null> {
    return await this._repoBook.updateBook(bookId, updatedBookData);
  }

  public async deleteBook(bookId: number) {
    return await this._repoBook.deleteBook(bookId);
  }
}

export default ServiceBook;
