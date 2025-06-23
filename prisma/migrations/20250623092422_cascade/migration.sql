/*
  Warnings:

  - A unique constraint covering the columns `[conceptual_objectId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monumentId]` on the table `E28_Conceptual_object` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monumentId` to the `E28_Conceptual_object` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_conceptual_objectId_fkey";

-- AlterTable
ALTER TABLE "E28_Conceptual_object" ADD COLUMN     "monumentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_conceptual_objectId_key" ON "E24_Monument"("conceptual_objectId");

-- CreateIndex
CREATE UNIQUE INDEX "E28_Conceptual_object_monumentId_key" ON "E28_Conceptual_object"("monumentId");

-- AddForeignKey
ALTER TABLE "E28_Conceptual_object" ADD CONSTRAINT "E28_Conceptual_object_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
