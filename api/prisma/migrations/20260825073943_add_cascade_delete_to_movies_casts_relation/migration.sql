-- DropForeignKey
ALTER TABLE "movies_casts" DROP CONSTRAINT "movies_casts_movieId_fkey";

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
