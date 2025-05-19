/*
  Warnings:

  - You are about to drop the column `coordinatesId` on the `E53_Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_coordinatesId_fkey";

-- DropIndex
DROP INDEX "E53_Place_coordinatesId_key";

-- AlterTable
ALTER TABLE "E53_Place" DROP COLUMN "coordinatesId",
ADD COLUMN     "placeId" INTEGER;

-- CreateTable
CREATE TABLE "E41_Appellation_Place" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_Address" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "coordinatesId" INTEGER,

    CONSTRAINT "E41_Appellation_Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_Address_coordinatesId_key" ON "E41_Appellation_Address"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_placeId_key" ON "E53_Place"("placeId");

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E41_Appellation_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_Address" ADD CONSTRAINT "E41_Appellation_Address_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E41_Appellation_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_Address" ADD CONSTRAINT "E41_Appellation_Address_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "E94_Coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
