/*
  Warnings:

  - A unique constraint covering the columns `[monumentId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monumentId` to the `E53_Place` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_placeId_fkey";

-- AlterTable
ALTER TABLE "E53_Place" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_monumentId_key" ON "E53_Place"("monumentId");

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
