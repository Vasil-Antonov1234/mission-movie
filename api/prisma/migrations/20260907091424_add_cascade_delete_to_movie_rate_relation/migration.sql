-- DropForeignKey
ALTER TABLE "rates" DROP CONSTRAINT "rates_movieId_fkey";

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
