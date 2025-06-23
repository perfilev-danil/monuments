/*
  Warnings:

  - A unique constraint covering the columns `[e21_PersonalityId]` on the table `E41_Appellation_personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[e21_PersonalityId]` on the table `E73_Information_object_personality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `e21_PersonalityId` to the `E41_Appellation_personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `e21_PersonalityId` to the `E73_Information_object_personality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_appellation_personalityId_fkey";

-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_information_object_personalityId_fkey";

-- AlterTable
ALTER TABLE "E41_Appellation_personality" ADD COLUMN     "e21_PersonalityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E73_Information_object_personality" ADD COLUMN     "e21_PersonalityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_personality_e21_PersonalityId_key" ON "E41_Appellation_personality"("e21_PersonalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_personality_e21_PersonalityId_key" ON "E73_Information_object_personality"("e21_PersonalityId");

-- AddForeignKey
ALTER TABLE "E41_Appellation_personality" ADD CONSTRAINT "E41_Appellation_personality_e21_PersonalityId_fkey" FOREIGN KEY ("e21_PersonalityId") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_personality" ADD CONSTRAINT "E73_Information_object_personality_e21_PersonalityId_fkey" FOREIGN KEY ("e21_PersonalityId") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
