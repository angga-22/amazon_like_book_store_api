/* eslint-disable no-unused-vars */
export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  tags: string[];
  stocks: number;
  coverImage?: string | null;
}

export interface IServiceBook {
  insertBook(bookData: IBook): Promise<IBook>;
  getAllBook(): Promise<IBook[] | Array<[]>>;
  findBookByTitle(bookTitle: string): Promise<IBook | null>;
  updateBook(bookId: number, updatedBookData: IBook): Promise<IBook | null>;
  deleteBook(bookId: number): Promise<IBook | null>;
}

export interface IRepoBook {
  list(): Promise<IBook[] | Array<[]>>;
  findByBookTitle(bookTitle: string): Promise<IBook | null>;
  findBookById(bookId: number): Promise<IBook | null>;
  insertBook(bookData: IBook): Promise<IBook>;
  updateBook(
    bookId: number,
    updatedBookData: Partial<IBook>
  ): Promise<IBook | null>;
  deleteBook(bookId: number): Promise<IBook | null>;
}
