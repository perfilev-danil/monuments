/*
  Warnings:

  - A unique constraint covering the columns `[appellation_placeId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_appellation_placeId_key" ON "E53_Place"("appellation_placeId");
