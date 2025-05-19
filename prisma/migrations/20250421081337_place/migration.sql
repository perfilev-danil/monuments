/*
  Warnings:

  - You are about to drop the column `placeId` on the `E41_Appellation_Address` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `E53_Place` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `E53_Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appellation_placeId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appellation_placeId` to the `E41_Appellation_Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E41_Appellation_Address" DROP CONSTRAINT "E41_Appellation_Address_placeId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_placeId_fkey";

-- DropIndex
DROP INDEX "E53_Place_placeId_key";

-- AlterTable
ALTER TABLE "E41_Appellation_Address" DROP COLUMN "placeId",
ADD COLUMN     "appellation_placeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E53_Place" DROP COLUMN "placeId",
DROP COLUMN "value",
ADD COLUMN     "appellation_placeId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_appellation_placeId_key" ON "E53_Place"("appellation_placeId");

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_appellation_placeId_fkey" FOREIGN KEY ("appellation_placeId") REFERENCES "E41_Appellation_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_Address" ADD CONSTRAINT "E41_Appellation_Address_appellation_placeId_fkey" FOREIGN KEY ("appellation_placeId") REFERENCES "E41_Appellation_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
