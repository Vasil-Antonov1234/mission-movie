/*
  Warnings:

  - You are about to drop the column `social` on the `casts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "casts" DROP COLUMN "social",
ADD COLUMN     "imdbProfile" TEXT,
ADD COLUMN     "wikipedia" TEXT;
