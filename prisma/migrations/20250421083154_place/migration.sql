/*
  Warnings:

  - You are about to drop the `E41_Appellation_Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E41_Appellation_Place` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appellation_addressId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E41_Appellation_Address" DROP CONSTRAINT "E41_Appellation_Address_appellation_placeId_fkey";

-- DropForeignKey
ALTER TABLE "E41_Appellation_Address" DROP CONSTRAINT "E41_Appellation_Address_coordinatesId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_appellation_placeId_fkey";

-- AlterTable
ALTER TABLE "E53_Place" ADD COLUMN     "appellation_addressId" INTEGER;

-- DropTable
DROP TABLE "E41_Appellation_Address";

-- DropTable
DROP TABLE "E41_Appellation_Place";

-- CreateTable
CREATE TABLE "E41_Appellation_place" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_address" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "coordinatesId" INTEGER,

    CONSTRAINT "E41_Appellation_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_address_coordinatesId_key" ON "E41_Appellation_address"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_appellation_addressId_key" ON "E53_Place"("appellation_addressId");

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_appellation_placeId_fkey" FOREIGN KEY ("appellation_placeId") REFERENCES "E41_Appellation_place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_appellation_addressId_fkey" FOREIGN KEY ("appellation_addressId") REFERENCES "E41_Appellation_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_address" ADD CONSTRAINT "E41_Appellation_address_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "E94_Coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
