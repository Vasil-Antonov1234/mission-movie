-- DropForeignKey
ALTER TABLE "movies_casts" DROP CONSTRAINT "movies_casts_castId_fkey";

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_castId_fkey" FOREIGN KEY ("castId") REFERENCES "casts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
