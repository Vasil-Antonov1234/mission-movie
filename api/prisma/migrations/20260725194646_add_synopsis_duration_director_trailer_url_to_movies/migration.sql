/*
  Warnings:

  - Added the required column `director` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerUrl` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "trailerUrl" TEXT NOT NULL;
