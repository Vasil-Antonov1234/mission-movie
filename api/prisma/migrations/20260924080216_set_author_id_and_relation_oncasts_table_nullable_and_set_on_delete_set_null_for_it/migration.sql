-- DropForeignKey
ALTER TABLE "casts" DROP CONSTRAINT "casts_authorId_fkey";

-- AlterTable
ALTER TABLE "casts" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "casts" ADD CONSTRAINT "casts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
