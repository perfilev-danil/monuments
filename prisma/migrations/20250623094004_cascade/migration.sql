/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `E41_Appellation_address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellation_addressId]` on the table `E94_Coordinates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeId` to the `E41_Appellation_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appellation_addressId` to the `E94_Coordinates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E41_Appellation_address" DROP CONSTRAINT "E41_Appellation_address_coordinatesId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_appellation_addressId_fkey";

-- AlterTable
ALTER TABLE "E41_Appellation_address" ADD COLUMN     "placeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E94_Coordinates" ADD COLUMN     "appellation_addressId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_address_placeId_key" ON "E41_Appellation_address"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E94_Coordinates_appellation_addressId_key" ON "E94_Coordinates"("appellation_addressId");

-- AddForeignKey
ALTER TABLE "E41_Appellation_address" ADD CONSTRAINT "E41_Appellation_address_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E53_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E94_Coordinates" ADD CONSTRAINT "E94_Coordinates_appellation_addressId_fkey" FOREIGN KEY ("appellation_addressId") REFERENCES "E41_Appellation_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
