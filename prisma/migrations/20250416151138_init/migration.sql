/*
  Warnings:

  - A unique constraint covering the columns `[yearId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appellation_registryId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "E24_Monument" ADD COLUMN     "appellation_registryId" INTEGER,
ADD COLUMN     "yearId" INTEGER;

-- CreateTable
CREATE TABLE "E52_Year" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E52_Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Color" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_registry" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE55_Color" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE55_Color_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE55_Color_B_index" ON "_E24_MonumentToE55_Color"("B");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_yearId_key" ON "E24_Monument"("yearId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_registryId_key" ON "E24_Monument"("appellation_registryId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "E52_Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_appellation_registryId_fkey" FOREIGN KEY ("appellation_registryId") REFERENCES "E41_Appellation_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
