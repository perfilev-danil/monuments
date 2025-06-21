/*
  Warnings:

  - You are about to drop the column `Information_object_documentId` on the `E31_Document` table. All the data in the column will be lost.
  - You are about to drop the column `monumentId` on the `E31_Document` table. All the data in the column will be lost.
  - You are about to drop the column `information_object_placeId` on the `E53_Place` table. All the data in the column will be lost.
  - You are about to drop the `E54_Dimension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E55_Dimension_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E73_Information_object_place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_E24_MonumentToE54_Dimension` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[documentId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[information_object_documentId]` on the table `E31_Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E31_Document" DROP CONSTRAINT "E31_Document_Information_object_documentId_fkey";

-- DropForeignKey
ALTER TABLE "E31_Document" DROP CONSTRAINT "E31_Document_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_information_object_placeId_fkey";

-- DropForeignKey
ALTER TABLE "E54_Dimension" DROP CONSTRAINT "E54_Dimension_dimension_typeId_fkey";

-- DropForeignKey
ALTER TABLE "_E24_MonumentToE54_Dimension" DROP CONSTRAINT "_E24_MonumentToE54_Dimension_A_fkey";

-- DropForeignKey
ALTER TABLE "_E24_MonumentToE54_Dimension" DROP CONSTRAINT "_E24_MonumentToE54_Dimension_B_fkey";

-- DropIndex
DROP INDEX "E31_Document_Information_object_documentId_key";

-- DropIndex
DROP INDEX "E53_Place_information_object_placeId_key";

-- AlterTable
ALTER TABLE "E24_Monument" ADD COLUMN     "documentId" INTEGER;

-- AlterTable
ALTER TABLE "E31_Document" DROP COLUMN "Information_object_documentId",
DROP COLUMN "monumentId",
ADD COLUMN     "information_object_documentId" INTEGER;

-- AlterTable
ALTER TABLE "E53_Place" DROP COLUMN "information_object_placeId";

-- DropTable
DROP TABLE "E54_Dimension";

-- DropTable
DROP TABLE "E55_Dimension_type";

-- DropTable
DROP TABLE "E73_Information_object_place";

-- DropTable
DROP TABLE "_E24_MonumentToE54_Dimension";

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_documentId_key" ON "E24_Monument"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E31_Document_information_object_documentId_key" ON "E31_Document"("information_object_documentId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "E31_Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_information_object_documentId_fkey" FOREIGN KEY ("information_object_documentId") REFERENCES "E73_Information_object_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
