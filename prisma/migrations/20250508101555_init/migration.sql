/*
  Warnings:

  - You are about to drop the column `descriptionId` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the column `time_spanId` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `E31_Document` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionId` on the `E5_Event` table. All the data in the column will be lost.
  - You are about to drop the `E33_Description_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E33_Description_personality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E52_Time_span_personality` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[information_object_personalityId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[information_object_oknId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Information_object_documentId]` on the table `E31_Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[information_object_registryId]` on the table `E41_Appellation_registry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[information_object_placeId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[information_object_eventId]` on the table `E5_Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `E5_Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_time_spanId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_descriptionId_fkey";

-- DropIndex
DROP INDEX "E21_Personality_descriptionId_key";

-- DropIndex
DROP INDEX "E21_Personality_time_spanId_key";

-- DropIndex
DROP INDEX "E5_Event_descriptionId_key";

-- AlterTable
ALTER TABLE "E21_Personality" DROP COLUMN "descriptionId",
DROP COLUMN "time_spanId",
ADD COLUMN     "information_object_personalityId" INTEGER,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "E24_Monument" ADD COLUMN     "information_object_oknId" INTEGER;

-- AlterTable
ALTER TABLE "E31_Document" DROP COLUMN "url",
ADD COLUMN     "Information_object_documentId" INTEGER;

-- AlterTable
ALTER TABLE "E41_Appellation_registry" ADD COLUMN     "information_object_registryId" INTEGER;

-- AlterTable
ALTER TABLE "E53_Place" ADD COLUMN     "information_object_placeId" INTEGER;

-- AlterTable
ALTER TABLE "E5_Event" DROP COLUMN "descriptionId",
ADD COLUMN     "information_object_eventId" INTEGER,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "E33_Description_event";

-- DropTable
DROP TABLE "E33_Description_personality";

-- DropTable
DROP TABLE "E52_Time_span_personality";

-- CreateTable
CREATE TABLE "E55_Technique" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Technique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_registry" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_okn" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_okn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_document" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_place" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_event" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE55_Technique" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE55_Technique_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE55_Technique_B_index" ON "_E24_MonumentToE55_Technique"("B");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_information_object_personalityId_key" ON "E21_Personality"("information_object_personalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_information_object_oknId_key" ON "E24_Monument"("information_object_oknId");

-- CreateIndex
CREATE UNIQUE INDEX "E31_Document_Information_object_documentId_key" ON "E31_Document"("Information_object_documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_registry_information_object_registryId_key" ON "E41_Appellation_registry"("information_object_registryId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_information_object_placeId_key" ON "E53_Place"("information_object_placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_information_object_eventId_key" ON "E5_Event"("information_object_eventId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_information_object_oknId_fkey" FOREIGN KEY ("information_object_oknId") REFERENCES "E73_Information_object_okn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_registry" ADD CONSTRAINT "E41_Appellation_registry_information_object_registryId_fkey" FOREIGN KEY ("information_object_registryId") REFERENCES "E73_Information_object_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_Information_object_documentId_fkey" FOREIGN KEY ("Information_object_documentId") REFERENCES "E73_Information_object_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_information_object_placeId_fkey" FOREIGN KEY ("information_object_placeId") REFERENCES "E73_Information_object_place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_information_object_personalityId_fkey" FOREIGN KEY ("information_object_personalityId") REFERENCES "E73_Information_object_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_information_object_eventId_fkey" FOREIGN KEY ("information_object_eventId") REFERENCES "E73_Information_object_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Technique" ADD CONSTRAINT "_E24_MonumentToE55_Technique_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Technique" ADD CONSTRAINT "_E24_MonumentToE55_Technique_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Technique"("id") ON DELETE CASCADE ON UPDATE CASCADE;
