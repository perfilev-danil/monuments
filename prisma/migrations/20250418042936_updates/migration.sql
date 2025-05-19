/*
  Warnings:

  - You are about to drop the `E36_Monument_Img` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "E36_Monument_Img" DROP CONSTRAINT "E36_Monument_Img_monumentId_fkey";

-- AlterTable
ALTER TABLE "E55_Color" ADD COLUMN     "code" TEXT;

-- DropTable
DROP TABLE "E36_Monument_Img";

-- CreateTable
CREATE TABLE "E36_Img_monument" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT,
    "mimeType" TEXT,
    "imageData" BYTEA,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E36_Img_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E36_Img_personality" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT,
    "mimeType" TEXT,
    "imageData" BYTEA,
    "personalityId" INTEGER NOT NULL,

    CONSTRAINT "E36_Img_personality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "E36_Img_monument" ADD CONSTRAINT "E36_Img_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E36_Img_personality" ADD CONSTRAINT "E36_Img_personality_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
