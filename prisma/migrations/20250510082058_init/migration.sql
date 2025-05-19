/*
  Warnings:

  - You are about to drop the column `appellationId` on the `E21_Personality` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appellation_personalityId]` on the table `E21_Personality` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "E21_Personality" DROP CONSTRAINT "E21_Personality_appellationId_fkey";

-- DropIndex
DROP INDEX "E21_Personality_appellationId_key";

-- AlterTable
ALTER TABLE "E21_Personality" DROP COLUMN "appellationId",
ADD COLUMN     "appellation_personalityId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_appellation_personalityId_key" ON "E21_Personality"("appellation_personalityId");

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_appellation_personalityId_fkey" FOREIGN KEY ("appellation_personalityId") REFERENCES "E41_Appellation_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
