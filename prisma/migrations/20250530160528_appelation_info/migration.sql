/*
  Warnings:

  - You are about to drop the column `information_object_oknId` on the `E24_Monument` table. All the data in the column will be lost.
  - You are about to drop the `E73_Information_object_okn` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appellation_infoId]` on the table `E24_Monument` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_information_object_oknId_fkey";

-- DropIndex
DROP INDEX "E24_Monument_information_object_oknId_key";

-- AlterTable
ALTER TABLE "E24_Monument" DROP COLUMN "information_object_oknId",
ADD COLUMN     "appellation_infoId" INTEGER;

-- DropTable
DROP TABLE "E73_Information_object_okn";

-- CreateTable
CREATE TABLE "E41_Appellation_info" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "information_object_infoId" INTEGER,

    CONSTRAINT "E41_Appellation_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_info" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E73_Information_object_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_info_information_object_infoId_key" ON "E41_Appellation_info"("information_object_infoId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_infoId_key" ON "E24_Monument"("appellation_infoId");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_appellation_infoId_fkey" FOREIGN KEY ("appellation_infoId") REFERENCES "E41_Appellation_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_info" ADD CONSTRAINT "E41_Appellation_info_information_object_infoId_fkey" FOREIGN KEY ("information_object_infoId") REFERENCES "E73_Information_object_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
