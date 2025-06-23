/*
  Warnings:

  - A unique constraint covering the columns `[monumentId]` on the table `E33_Description_monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E41_Appellation_monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E52_Year` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monumentId` to the `E33_Description_monument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E41_Appellation_monument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E52_Year` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_appellation_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_description_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_yearId_fkey";

-- AlterTable
ALTER TABLE "E33_Description_monument" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E41_Appellation_monument" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E52_Year" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E33_Description_monument_monumentId_key" ON "E33_Description_monument"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_monument_monumentId_key" ON "E41_Appellation_monument"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Year_monumentId_key" ON "E52_Year"("monumentId");

-- AddForeignKey
ALTER TABLE "E41_Appellation_monument" ADD CONSTRAINT "E41_Appellation_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E33_Description_monument" ADD CONSTRAINT "E33_Description_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E52_Year" ADD CONSTRAINT "E52_Year_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
