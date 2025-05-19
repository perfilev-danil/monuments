-- DropForeignKey
ALTER TABLE "E24_Monument" DROP CONSTRAINT "E24_Monument_periodId_fkey";

-- DropIndex
DROP INDEX "E24_Monument_conceptual_objectId_key";

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "E4_Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;
