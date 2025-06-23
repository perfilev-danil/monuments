/*
  Warnings:

  - A unique constraint covering the columns `[documentId]` on the table `E73_Information_object_document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellation_infoId]` on the table `E73_Information_object_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellation_registryId]` on the table `E73_Information_object_registry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentId` to the `E73_Information_object_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appellation_infoId` to the `E73_Information_object_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appellation_registryId` to the `E73_Information_object_registry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E31_Document" DROP CONSTRAINT "E31_Document_information_object_documentId_fkey";

-- DropForeignKey
ALTER TABLE "E41_Appellation_info" DROP CONSTRAINT "E41_Appellation_info_information_object_infoId_fkey";

-- DropForeignKey
ALTER TABLE "E41_Appellation_registry" DROP CONSTRAINT "E41_Appellation_registry_information_object_registryId_fkey";

-- AlterTable
ALTER TABLE "E73_Information_object_document" ADD COLUMN     "documentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E73_Information_object_info" ADD COLUMN     "appellation_infoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E73_Information_object_registry" ADD COLUMN     "appellation_registryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_document_documentId_key" ON "E73_Information_object_document"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_info_appellation_infoId_key" ON "E73_Information_object_info"("appellation_infoId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_registry_appellation_registryId_key" ON "E73_Information_object_registry"("appellation_registryId");

-- AddForeignKey
ALTER TABLE "E73_Information_object_registry" ADD CONSTRAINT "E73_Information_object_registry_appellation_registryId_fkey" FOREIGN KEY ("appellation_registryId") REFERENCES "E41_Appellation_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_info" ADD CONSTRAINT "E73_Information_object_info_appellation_infoId_fkey" FOREIGN KEY ("appellation_infoId") REFERENCES "E41_Appellation_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_document" ADD CONSTRAINT "E73_Information_object_document_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "E31_Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
