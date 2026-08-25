-- AlterTable
ALTER TABLE "casts" ADD COLUMN     "awards" TEXT NOT NULL DEFAULT 'Award name: for role; 2024; won',
ADD COLUMN     "biography" TEXT NOT NULL DEFAULT 'The biography here',
ADD COLUMN     "social" TEXT NOT NULL DEFAULT 'IMDB Profile; https://1234test';
