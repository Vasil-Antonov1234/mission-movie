/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_id_key" ON "reviews"("id");
