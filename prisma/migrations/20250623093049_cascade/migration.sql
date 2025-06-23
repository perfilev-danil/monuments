/*
  Warnings:

  - A unique constraint covering the columns `[monumentId]` on the table `E31_Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E34_Inscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E41_Appellation_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E41_Appellation_registry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monumentId` to the `E31_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E34_Inscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E41_Appellation_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E41_Appellation_registry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_appellation_infoId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_appellation_registryId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_documentId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_inscriptionId_fkey";

-- AlterTable
ALTER TABLE "E31_Document" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E34_Inscription" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E41_Appellation_info" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E41_Appellation_registry" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E31_Document_monumentId_key" ON "E31_Document"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E34_Inscription_monumentId_key" ON "E34_Inscription"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_info_monumentId_key" ON "E41_Appellation_info"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_registry_monumentId_key" ON "E41_Appellation_registry"("monumentId");

-- AddForeignKey
ALTER TABLE "E41_Appellation_registry" ADD CONSTRAINT "E41_Appellation_registry_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E34_Inscription" ADD CONSTRAINT "E34_Inscription_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_info" ADD CONSTRAINT "E41_Appellation_info_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
