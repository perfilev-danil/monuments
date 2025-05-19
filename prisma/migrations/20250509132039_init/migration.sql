/*
  Warnings:

  - You are about to drop the `_E24_MonumentToE4_Period` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_E24_MonumentToE4_Period" DROP CONSTRAINT "_E24_MonumentToE4_Period_A_fkey";

-- DropForeignKey
ALTER TABLE "_E24_MonumentToE4_Period" DROP CONSTRAINT "_E24_MonumentToE4_Period_B_fkey";

-- AlterTable
ALTER TABLE "E24_Monument" ADD COLUMN     "periodId" INTEGER;

-- DropTable
DROP TABLE "_E24_MonumentToE4_Period";

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "E4_Period"("id") ON DELETE SET NULL ON UPDATE CASCADE;
