/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `E55_Role_personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `E73_Information_object_personality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "E55_Role_personality_value_key" ON "E55_Role_personality"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_personality_value_key" ON "E73_Information_object_personality"("value");
