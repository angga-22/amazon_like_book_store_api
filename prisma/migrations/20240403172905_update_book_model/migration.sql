-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverImage" TEXT DEFAULT 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
ADD COLUMN     "tags" TEXT[];
