/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `E41_Appellation_place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_place_value_key" ON "E41_Appellation_place"("value");
