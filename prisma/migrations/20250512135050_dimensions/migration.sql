/*
  Warnings:

  - You are about to drop the `_E54_DimensionToE55_Dimension_type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dimension_typeId]` on the table `E54_Dimension` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" DROP CONSTRAINT "_E54_DimensionToE55_Dimension_type_A_fkey";

-- DropForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" DROP CONSTRAINT "_E54_DimensionToE55_Dimension_type_B_fkey";

-- AlterTable
ALTER TABLE "E54_Dimension" ADD COLUMN     "dimension_typeId" INTEGER;

-- DropTable
DROP TABLE "_E54_DimensionToE55_Dimension_type";

-- CreateIndex
CREATE UNIQUE INDEX "E54_Dimension_dimension_typeId_key" ON "E54_Dimension"("dimension_typeId");

-- AddForeignKey
ALTER TABLE "E54_Dimension" ADD CONSTRAINT "E54_Dimension_dimension_typeId_fkey" FOREIGN KEY ("dimension_typeId") REFERENCES "E55_Dimension_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
