/*
  Warnings:

  - Added the required column `boxOffice` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studio` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writtenBy` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "boxOffice" TEXT NOT NULL,
ADD COLUMN     "budget" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "studio" TEXT NOT NULL,
ADD COLUMN     "tagline" TEXT NOT NULL,
ADD COLUMN     "writtenBy" TEXT NOT NULL;
