-- AlterTable
ALTER TABLE "casts" ADD COLUMN     "authorId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "casts" ADD CONSTRAINT "casts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
