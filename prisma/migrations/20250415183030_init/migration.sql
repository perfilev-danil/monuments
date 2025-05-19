/*
  Warnings:

  - The primary key for the `E21_Personality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bioId` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the column `timespanId` on the `E21_Personality` table. All the data in the column will be lost.
  - The `id` column on the `E21_Personality` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roleId` column on the `E21_Personality` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E24_Monument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `inscription` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `memorialMeaning` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the column `registryNameId` on the `E24_Monument` table. All the data in the column will be lost.
  - The `id` column on the `E24_Monument` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `placeId` column on the `E24_Monument` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E31_Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link` on the `E31_Document` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `E31_Document` table. All the data in the column will be lost.
  - The `id` column on the `E31_Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E36_Monument_Img` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `E36_Monument_Img` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E53_Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mapId` on the `E53_Place` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `E53_Place` table. All the data in the column will be lost.
  - The `id` column on the `E53_Place` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E54_Dimension` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `E54_Dimension` table. All the data in the column will be lost.
  - The `id` column on the `E54_Dimension` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E57_Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `E57_Material` table. All the data in the column will be lost.
  - The `id` column on the `E57_Material` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `E5_Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nameId` on the `E5_Event` table. All the data in the column will be lost.
  - You are about to drop the column `timespanId` on the `E5_Event` table. All the data in the column will be lost.
  - The `id` column on the `E5_Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `descriptionId` column on the `E5_Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `E33_Event_Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E33_Personality_BIO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E36_Personality_Img` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E41_Event_Name` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E41_Personality_Name` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E41_Place_Name` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E41_Registry_Name` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E52_Time_Span` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E55_Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E55_Dimension_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E55_Personality_Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `E94_Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P12_Monument_Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P138_Monument_Img` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P138_Monument_Personality_Img` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P1_Monument_Personality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P2_Dimension_Dimension_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P2_Monument_Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P43_Monument_Dimension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P45_Monument_Material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_P70_Monument_Document` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[time_spanId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellationId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descriptionId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellationId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descriptionId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inscriptionId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conceptual_objectId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coordinatesId]` on the table `E53_Place` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellationId]` on the table `E5_Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[time_spanId]` on the table `E5_Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E31_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `E31_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `E31_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E36_Monument_Img` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinatesId` to the `E53_Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `E53_Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E54_Dimension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `E54_Dimension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `E57_Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monumentId` to the `E5_Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_bioId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_nameId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_roleId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_timespanId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_placeId_fkey";

-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_registryNameId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_mapId_fkey";

-- DropForeignKey
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_nameId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_descriptionId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_nameId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_timespanId_fkey";

-- DropForeignKey
ALTER TABLE "_P12_Monument_Event" DROP CONSTRAINT "_P12_Monument_Event_A_fkey";

-- DropForeignKey
ALTER TABLE "_P12_Monument_Event" DROP CONSTRAINT "_P12_Monument_Event_B_fkey";

-- DropForeignKey
ALTER TABLE "_P138_Monument_Img" DROP CONSTRAINT "_P138_Monument_Img_A_fkey";

-- DropForeignKey
ALTER TABLE "_P138_Monument_Img" DROP CONSTRAINT "_P138_Monument_Img_B_fkey";

-- DropForeignKey
ALTER TABLE "_P138_Monument_Personality_Img" DROP CONSTRAINT "_P138_Monument_Personality_Img_A_fkey";

-- DropForeignKey
ALTER TABLE "_P138_Monument_Personality_Img" DROP CONSTRAINT "_P138_Monument_Personality_Img_B_fkey";

-- DropForeignKey
ALTER TABLE "_P1_Monument_Personality" DROP CONSTRAINT "_P1_Monument_Personality_A_fkey";

-- DropForeignKey
ALTER TABLE "_P1_Monument_Personality" DROP CONSTRAINT "_P1_Monument_Personality_B_fkey";

-- DropForeignKey
ALTER TABLE "_P2_Dimension_Dimension_Type" DROP CONSTRAINT "_P2_Dimension_Dimension_Type_A_fkey";

-- DropForeignKey
ALTER TABLE "_P2_Dimension_Dimension_Type" DROP CONSTRAINT "_P2_Dimension_Dimension_Type_B_fkey";

-- DropForeignKey
ALTER TABLE "_P2_Monument_Color" DROP CONSTRAINT "_P2_Monument_Color_A_fkey";

-- DropForeignKey
ALTER TABLE "_P2_Monument_Color" DROP CONSTRAINT "_P2_Monument_Color_B_fkey";

-- DropForeignKey
ALTER TABLE "_P43_Monument_Dimension" DROP CONSTRAINT "_P43_Monument_Dimension_A_fkey";

-- DropForeignKey
ALTER TABLE "_P43_Monument_Dimension" DROP CONSTRAINT "_P43_Monument_Dimension_B_fkey";

-- DropForeignKey
ALTER TABLE "_P45_Monument_Material" DROP CONSTRAINT "_P45_Monument_Material_A_fkey";

-- DropForeignKey
ALTER TABLE "_P45_Monument_Material" DROP CONSTRAINT "_P45_Monument_Material_B_fkey";

-- DropForeignKey
ALTER TABLE "_P70_Monument_Document" DROP CONSTRAINT "_P70_Monument_Document_A_fkey";

-- DropForeignKey
ALTER TABLE "_P70_Monument_Document" DROP CONSTRAINT "_P70_Monument_Document_B_fkey";

-- DropIndex
DROP INDEX "E21_Personality_bioId_key";

-- DropIndex
DROP INDEX "E21_Personality_nameId_key";

-- DropIndex
DROP INDEX "E21_Personality_timespanId_key";

-- DropIndex
DROP INDEX "E24_Monument_registryNameId_key";

-- DropIndex
DROP INDEX "E53_Place_mapId_key";

-- DropIndex
DROP INDEX "E53_Place_nameId_key";

-- DropIndex
DROP INDEX "E5_Event_nameId_key";

-- DropIndex
DROP INDEX "E5_Event_timespanId_key";

-- AlterTable
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_pkey",
DROP COLUMN "bioId",
DROP COLUMN "nameId",
DROP COLUMN "timespanId",
ADD COLUMN     "appellationId" INTEGER,
ADD COLUMN     "descriptionId" INTEGER,
ADD COLUMN     "time_spanId" INTEGER,
ADD COLUMN     "value" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER,
ADD CONSTRAINT "E21_Personality_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_pkey",
DROP COLUMN "description",
DROP COLUMN "inscription",
DROP COLUMN "memorialMeaning",
DROP COLUMN "name",
DROP COLUMN "period",
DROP COLUMN "registryNameId",
ADD COLUMN     "appellationId" INTEGER,
ADD COLUMN     "conceptual_objectId" INTEGER,
ADD COLUMN     "descriptionId" INTEGER,
ADD COLUMN     "inscriptionId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "placeId",
ADD COLUMN     "placeId" INTEGER,
ADD CONSTRAINT "E24_Monument_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E31_Document" DROP CONSTRAINT "E31_Document_pkey",
DROP COLUMN "link",
DROP COLUMN "name",
ADD COLUMN     "monumentId" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "E31_Document_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E36_Monument_Img" DROP CONSTRAINT "E36_Monument_Img_pkey",
ADD COLUMN     "monumentId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "E36_Monument_Img_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E53_Place" DROP CONSTRAINT "E53_Place_pkey",
DROP COLUMN "mapId",
DROP COLUMN "nameId",
ADD COLUMN     "coordinatesId" INTEGER NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "E53_Place_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E54_Dimension" DROP CONSTRAINT "E54_Dimension_pkey",
DROP COLUMN "name",
ADD COLUMN     "monumentId" INTEGER NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "E54_Dimension_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E57_Material" DROP CONSTRAINT "E57_Material_pkey",
DROP COLUMN "name",
ADD COLUMN     "value" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "E57_Material_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_pkey",
DROP COLUMN "nameId",
DROP COLUMN "timespanId",
ADD COLUMN     "appellationId" INTEGER,
ADD COLUMN     "monumentId" INTEGER NOT NULL,
ADD COLUMN     "time_spanId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "descriptionId",
ADD COLUMN     "descriptionId" INTEGER,
ADD CONSTRAINT "E5_Event_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "E33_Event_Description";

-- DropTable
DROP TABLE "E33_Personality_BIO";

-- DropTable
DROP TABLE "E36_Personality_Img";

-- DropTable
DROP TABLE "E41_Event_Name";

-- DropTable
DROP TABLE "E41_Personality_Name";

-- DropTable
DROP TABLE "E41_Place_Name";

-- DropTable
DROP TABLE "E41_Registry_Name";

-- DropTable
DROP TABLE "E52_Time_Span";

-- DropTable
DROP TABLE "E55_Color";

-- DropTable
DROP TABLE "E55_Dimension_Type";

-- DropTable
DROP TABLE "E55_Personality_Role";

-- DropTable
DROP TABLE "E94_Map";

-- DropTable
DROP TABLE "_P12_Monument_Event";

-- DropTable
DROP TABLE "_P138_Monument_Img";

-- DropTable
DROP TABLE "_P138_Monument_Personality_Img";

-- DropTable
DROP TABLE "_P1_Monument_Personality";

-- DropTable
DROP TABLE "_P2_Dimension_Dimension_Type";

-- DropTable
DROP TABLE "_P2_Monument_Color";

-- DropTable
DROP TABLE "_P43_Monument_Dimension";

-- DropTable
DROP TABLE "_P45_Monument_Material";

-- DropTable
DROP TABLE "_P70_Monument_Document";

-- CreateTable
CREATE TABLE "E41_Appellation_monument" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Description_monument" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E33_Description_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E4_Period" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E4_Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E34_Inscription" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E34_Inscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E28_Conceptual_object" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E28_Conceptual_object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Dimension_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Dimension_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E94_Coordinates" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E94_Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E52_Time_span_personality" (
    "id" SERIAL NOT NULL,
    "beginning" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "E52_Time_span_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Role_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Role_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Description_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E33_Description_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_event" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E52_Time_span_event" (
    "id" SERIAL NOT NULL,
    "beginning" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "E52_Time_span_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Description_event" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E33_Description_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE57_Material" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE57_Material_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE4_Period" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE4_Period_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E54_DimensionToE55_Dimension_type" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E54_DimensionToE55_Dimension_type_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E21_PersonalityToE24_Monument" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E21_PersonalityToE24_Monument_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE57_Material_B_index" ON "_E24_MonumentToE57_Material"("B");

-- CreateIndex
CREATE INDEX "_E24_MonumentToE4_Period_B_index" ON "_E24_MonumentToE4_Period"("B");

-- CreateIndex
CREATE INDEX "_E54_DimensionToE55_Dimension_type_B_index" ON "_E54_DimensionToE55_Dimension_type"("B");

-- CreateIndex
CREATE INDEX "_E21_PersonalityToE24_Monument_B_index" ON "_E21_PersonalityToE24_Monument"("B");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_time_spanId_key" ON "E21_Personality"("time_spanId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_roleId_key" ON "E21_Personality"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_appellationId_key" ON "E21_Personality"("appellationId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_descriptionId_key" ON "E21_Personality"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellationId_key" ON "E24_Monument"("appellationId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_descriptionId_key" ON "E24_Monument"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_inscriptionId_key" ON "E24_Monument"("inscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_conceptual_objectId_key" ON "E24_Monument"("conceptual_objectId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_placeId_key" ON "E24_Monument"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_coordinatesId_key" ON "E53_Place"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_appellationId_key" ON "E5_Event"("appellationId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_time_spanId_key" ON "E5_Event"("time_spanId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_descriptionId_key" ON "E5_Event"("descriptionId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_monument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_monument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "E34_Inscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_conceptual_objectId_fkey" FOREIGN KEY ("conceptual_objectId") REFERENCES "E28_Conceptual_object"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E53_Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E54_Dimension" ADD CONSTRAINT "E54_Dimension_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "E94_Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E36_Monument_Img" ADD CONSTRAINT "E36_Monument_Img_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_time_spanId_fkey" FOREIGN KEY ("time_spanId") REFERENCES "E52_Time_span_personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "E55_Role_personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_personality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_appellationId_fkey" FOREIGN KEY ("appellationId") REFERENCES "E41_Appellation_event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_time_spanId_fkey" FOREIGN KEY ("time_spanId") REFERENCES "E52_Time_span_event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Description_event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE57_Material" ADD CONSTRAINT "_E24_MonumentToE57_Material_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE57_Material" ADD CONSTRAINT "_E24_MonumentToE57_Material_B_fkey" FOREIGN KEY ("B") REFERENCES "E57_Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE4_Period" ADD CONSTRAINT "_E24_MonumentToE4_Period_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE4_Period" ADD CONSTRAINT "_E24_MonumentToE4_Period_B_fkey" FOREIGN KEY ("B") REFERENCES "E4_Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" ADD CONSTRAINT "_E54_DimensionToE55_Dimension_type_A_fkey" FOREIGN KEY ("A") REFERENCES "E54_Dimension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E54_DimensionToE55_Dimension_type" ADD CONSTRAINT "_E54_DimensionToE55_Dimension_type_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Dimension_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E21_PersonalityToE24_Monument" ADD CONSTRAINT "_E21_PersonalityToE24_Monument_A_fkey" FOREIGN KEY ("A") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E21_PersonalityToE24_Monument" ADD CONSTRAINT "_E21_PersonalityToE24_Monument_B_fkey" FOREIGN KEY ("B") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
