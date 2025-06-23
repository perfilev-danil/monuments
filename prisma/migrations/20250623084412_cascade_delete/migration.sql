/*
  Warnings:

  - A unique constraint covering the columns `[roleId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `E55_Role_personality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_roleId_key" ON "E21_Personality"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "E55_Role_personality_value_key" ON "E55_Role_personality"("value");
