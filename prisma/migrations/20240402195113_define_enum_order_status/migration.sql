-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'PAID', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "stocks" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'CREATED';
