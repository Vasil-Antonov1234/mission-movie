-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_authorId_fkey";

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
