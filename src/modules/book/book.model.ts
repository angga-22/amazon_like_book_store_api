import { prisma } from "../../config";
import { IBook } from "./book.types";

class BookModel {
  async findMany(): Promise<IBook[]> {
    return prisma.book.findMany();
  }

  async findOneByBookTitle(title: string): Promise<IBook | null> {
    return prisma.book.findFirst({
      where: { title }
    });
  }

  async findBookById(id: number): Promise<IBook | null> {
    return prisma.book.findUnique({
      where: { id }
    });
  }

  async insertBook(bookData: IBook): Promise<IBook> {
    return prisma.book.create({
      data: bookData
    });
  }

  async updateBook(
    id: number,
    updatedBookData: Partial<IBook>
  ): Promise<IBook | null> {
    const existingBook = await prisma.book.findUnique({
      where: { id }
    });
    if (!existingBook) {
      return null;
    }
    const updatedBook = await prisma.book.update({
      where: { id },
      data: { ...updatedBookData }
    });

    return updatedBook;
  }

  async deleteBook(id: number): Promise<IBook | null> {
    const existingBook = await prisma.book.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return null;
    }

    const deletedBook = await prisma.book.delete({
      where: { id }
    });

    return deletedBook;
  }
}

export default new BookModel();
