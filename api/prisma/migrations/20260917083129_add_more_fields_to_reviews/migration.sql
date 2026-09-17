/*
  Warnings:

  - Added the required column `cinematographyScore` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directorScore` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performanceScore` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenplayScore` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "cinematographyScore" INTEGER NOT NULL,
ADD COLUMN     "directorScore" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "performanceScore" INTEGER NOT NULL,
ADD COLUMN     "screenplayScore" INTEGER NOT NULL;
