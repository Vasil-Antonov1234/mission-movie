/*
  Warnings:

  - You are about to drop the column `reviwesCont` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "reviwesCont",
ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0;
