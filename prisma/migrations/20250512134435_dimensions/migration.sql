/*
  Warnings:

  - You are about to drop the column `dimension_typeId` on the `E54_Dimension` table. All the data in the column will be lost.
  - You are about to drop the column `monumentId` on the `E54_Dimension` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "E54_Dimension" DROP CONSTRAINT "E54_Dimension_dimension_typeId_fkey";

-- DropForeignKey
ALTER TABLE "E54_Dimension" DROP CONSTRAINT "E54_Dimension_monumentId_fkey";

-- DropIndex
DROP INDEX "E54_Dimension_dimension_typeId_key";

-- AlterTable
ALTER TABLE "E54_Dimension" DROP COLUMN "dimension_typeId",
DROP COLUMN "monumentId";

-- CreateTable
CREATE TABLE "_E24_MonumentToE54_Dimension" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE54_Dimension_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E54_DimensionToE55_Dimension_type" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E54_DimensionToE55_Dimension_type_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE54_Dimension_B_index" ON "_E24_MonumentToE54_Dimension"("B");

-- CreateIndex
CREATE INDEX "_E54_DimensionToE55_Dimension_type_B_index" ON "_E54_DimensionToE55_Dimension_type"("B");

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE54_Dimension" ADD CONSTRAINT "_E24_MonumentToE54_Dimension_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE54_Dimension" ADD CONSTRAINT "_E24_MonumentToE54_Dimension_B_fkey" FOREIGN KEY ("B") REFERENCES "E54_Dimension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" ADD CONSTRAINT "_E54_DimensionToE55_Dimension_type_A_fkey" FOREIGN KEY ("A") REFERENCES "E54_Dimension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" ADD CONSTRAINT "_E54_DimensionToE55_Dimension_type_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Dimension_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
