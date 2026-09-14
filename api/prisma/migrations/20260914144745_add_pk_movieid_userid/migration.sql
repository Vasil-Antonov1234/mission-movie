/*
  Warnings:

  - The primary key for the `watchlists` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "watchlists" DROP CONSTRAINT "watchlists_pkey",
ADD CONSTRAINT "watchlists_pkey" PRIMARY KEY ("movieId", "userId");
