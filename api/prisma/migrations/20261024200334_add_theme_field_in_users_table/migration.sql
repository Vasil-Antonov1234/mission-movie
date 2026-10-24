-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DARK', 'WHITE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'DARK';
