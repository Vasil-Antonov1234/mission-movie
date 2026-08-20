-- CreateTable
CREATE TABLE "casts" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bornDate" TEXT NOT NULL,
    "placeOfBorn" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "casts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies_casts" (
    "movieId" INTEGER NOT NULL,
    "castId" INTEGER NOT NULL,
    "nameInMovie" TEXT NOT NULL,

    CONSTRAINT "movies_casts_pkey" PRIMARY KEY ("movieId","castId")
);

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_casts" ADD CONSTRAINT "movies_casts_castId_fkey" FOREIGN KEY ("castId") REFERENCES "casts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
