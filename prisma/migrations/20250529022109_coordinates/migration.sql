/*
  Warnings:

  - You are about to drop the column `value` on the `E94_Coordinates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "E94_Coordinates" DROP COLUMN "value",
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lon" DOUBLE PRECISION;
