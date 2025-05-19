/*
  Warnings:

  - You are about to drop the column `appellationId` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionId` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `appellationId` on the `E5_Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appellation_monumentId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description_monumentId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellation_eventId]` on the table `E5_Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_appellationId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_appellationId_fkey";

-- DropIndex
DROP INDEX "E24_Monument_appellationId_key";

-- DropIndex
DROP INDEX "E24_Monument_descriptionId_key";

-- DropIndex
DROP INDEX "E5_Event_appellationId_key";

-- AlterTable
ALTER TABLE "E24_Monument" DROP COLUMN "appellationId",
DROP COLUMN "descriptionId",
ADD COLUMN     "appellation_monumentId" INTEGER,
ADD COLUMN     "description_monumentId" INTEGER;

-- AlterTable
ALTER TABLE "E5_Event" DROP COLUMN "appellationId",
ADD COLUMN     "appellation_eventId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_monumentId_key" ON "E24_Monument"("appellation_monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_description_monumentId_key" ON "E24_Monument"("description_monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_appellation_eventId_key" ON "E5_Event"("appellation_eventId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_appellation_monumentId_fkey" FOREIGN KEY ("appellation_monumentId") REFERENCES "E41_Appellation_monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_description_monumentId_fkey" FOREIGN KEY ("description_monumentId") REFERENCES "E33_Description_monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_appellation_eventId_fkey" FOREIGN KEY ("appellation_eventId") REFERENCES "E41_Appellation_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
