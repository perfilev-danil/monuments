/*
  Warnings:

  - You are about to drop the column `value` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the `_E54_DimensionToE55_Dimension_type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dimension_typeId]` on the table `E54_Dimension` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_appellationId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_roleId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_time_spanId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_appellationId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_conceptual_objectId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_inscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_placeId_fkey";

-- DropForeignKey
ALTER TABLE "E31_Document" DROP CONSTRAINT "E31_Document_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E36_Monument_Img" DROP CONSTRAINT "E36_Monument_Img_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_coordinatesId_fkey";

-- DropForeignKey
ALTER TABLE "E54_Dimension" DROP CONSTRAINT "E54_Dimension_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_appellationId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_monumentId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_time_spanId_fkey";

-- DropForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" DROP CONSTRAINT "_E54_DimensionToE55_Dimension_type_A_fkey";

-- DropForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" DROP CONSTRAINT "_E54_DimensionToE55_Dimension_type_B_fkey";

-- AlterTable
ALTER TABLE "E21_Personality" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "E54_Dimension" ADD COLUMN     "dimension_typeId" INTEGER;

-- DropTable
DROP TABLE "_E54_DimensionToE55_Dimension_type";

-- CreateIndex
CREATE UNIQUE INDEX "E54_Dimension_dimension_typeId_key" ON "E54_Dimension"("dimension_typeId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "E34_Inscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_conceptual_objectId_fkey" FOREIGN KEY ("conceptual_objectId") REFERENCES "E28_Conceptual_object"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E53_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E54_Dimension" ADD CONSTRAINT "E54_Dimension_dimension_typeId_fkey" FOREIGN KEY ("dimension_typeId") REFERENCES "E55_Dimension_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E54_Dimension" ADD CONSTRAINT "E54_Dimension_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "E94_Coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E36_Monument_Img" ADD CONSTRAINT "E36_Monument_Img_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_time_spanId_fkey" FOREIGN KEY ("time_spanId") REFERENCES "E52_Time_span_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "E55_Role_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_time_spanId_fkey" FOREIGN KEY ("time_spanId") REFERENCES "E52_Time_span_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
