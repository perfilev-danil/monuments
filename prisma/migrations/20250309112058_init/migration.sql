/*
  Warnings:

  - You are about to drop the column `name` on the `E21_Personality` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `E24_Monument` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bioId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timespanId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placeId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registryNameId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bioId` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timespanId` to the `E21_Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `E24_Monument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registryNameId` to the `E24_Monument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "E21_Personality" DROP COLUMN "name",
ADD COLUMN     "bioId" TEXT NOT NULL,
ADD COLUMN     "nameId" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "timespanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "E24_Monument" DROP COLUMN "photo",
ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "registryNameId" TEXT NOT NULL,
ALTER COLUMN "period" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "E52_Time_Span" (
    "id" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,

    CONSTRAINT "E52_Time_Span_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Personality_Name" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E41_Personality_Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Personality_Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E55_Personality_Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Personality_BIO" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "E33_Personality_BIO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E36_Personality_Img" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "E36_Personality_Img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E36_Monument_Img" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "E36_Monument_Img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E31_Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "E31_Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E54_Dimension" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E54_Dimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Dimension_Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E55_Dimension_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E53_Place" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "E53_Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Place_Name" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E41_Place_Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E94_Map" (
    "id" TEXT NOT NULL,
    "map" TEXT NOT NULL,

    CONSTRAINT "E94_Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E5_Event" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "timespanId" TEXT NOT NULL,

    CONSTRAINT "E5_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Event_Name" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E41_Event_Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Event_Description" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "E33_Event_Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Registry_Name" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E41_Registry_Name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_P70_Monument_Document" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P70_Monument_Document_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P43_Monument_Dimension" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P43_Monument_Dimension_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P12_Monument_Event" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P12_Monument_Event_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P138_Monument_Img" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P138_Monument_Img_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P138_Monument_Personality_Img" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P138_Monument_Personality_Img_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P2_Dimension_Dimension_Type" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P2_Dimension_Dimension_Type_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_nameId_key" ON "E53_Place"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_mapId_key" ON "E53_Place"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_nameId_key" ON "E5_Event"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_descriptionId_key" ON "E5_Event"("descriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_timespanId_key" ON "E5_Event"("timespanId");

-- CreateIndex
CREATE INDEX "_P70_Monument_Document_B_index" ON "_P70_Monument_Document"("B");

-- CreateIndex
CREATE INDEX "_P43_Monument_Dimension_B_index" ON "_P43_Monument_Dimension"("B");

-- CreateIndex
CREATE INDEX "_P12_Monument_Event_B_index" ON "_P12_Monument_Event"("B");

-- CreateIndex
CREATE INDEX "_P138_Monument_Img_B_index" ON "_P138_Monument_Img"("B");

-- CreateIndex
CREATE INDEX "_P138_Monument_Personality_Img_B_index" ON "_P138_Monument_Personality_Img"("B");

-- CreateIndex
CREATE INDEX "_P2_Dimension_Dimension_Type_B_index" ON "_P2_Dimension_Dimension_Type"("B");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_nameId_key" ON "E21_Personality"("nameId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_roleId_key" ON "E21_Personality"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_bioId_key" ON "E21_Personality"("bioId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_timespanId_key" ON "E21_Personality"("timespanId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_placeId_key" ON "E24_Monument"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_registryNameId_key" ON "E24_Monument"("registryNameId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E53_Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_registryNameId_fkey" FOREIGN KEY ("registryNameId") REFERENCES "E41_Registry_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "E41_Personality_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "E55_Personality_Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "E33_Personality_BIO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_timespanId_fkey" FOREIGN KEY ("timespanId") REFERENCES "E52_Time_Span"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "E41_Place_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "E94_Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "E41_Event_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "E33_Event_Description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_timespanId_fkey" FOREIGN KEY ("timespanId") REFERENCES "E52_Time_Span"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P70_Monument_Document" ADD CONSTRAINT "_P70_Monument_Document_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P70_Monument_Document" ADD CONSTRAINT "_P70_Monument_Document_B_fkey" FOREIGN KEY ("B") REFERENCES "E31_Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P43_Monument_Dimension" ADD CONSTRAINT "_P43_Monument_Dimension_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P43_Monument_Dimension" ADD CONSTRAINT "_P43_Monument_Dimension_B_fkey" FOREIGN KEY ("B") REFERENCES "E54_Dimension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P12_Monument_Event" ADD CONSTRAINT "_P12_Monument_Event_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P12_Monument_Event" ADD CONSTRAINT "_P12_Monument_Event_B_fkey" FOREIGN KEY ("B") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P138_Monument_Img" ADD CONSTRAINT "_P138_Monument_Img_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P138_Monument_Img" ADD CONSTRAINT "_P138_Monument_Img_B_fkey" FOREIGN KEY ("B") REFERENCES "E36_Monument_Img"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P138_Monument_Personality_Img" ADD CONSTRAINT "_P138_Monument_Personality_Img_A_fkey" FOREIGN KEY ("A") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P138_Monument_Personality_Img" ADD CONSTRAINT "_P138_Monument_Personality_Img_B_fkey" FOREIGN KEY ("B") REFERENCES "E36_Personality_Img"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P2_Dimension_Dimension_Type" ADD CONSTRAINT "_P2_Dimension_Dimension_Type_A_fkey" FOREIGN KEY ("A") REFERENCES "E54_Dimension"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P2_Dimension_Dimension_Type" ADD CONSTRAINT "_P2_Dimension_Dimension_Type_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Dimension_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
