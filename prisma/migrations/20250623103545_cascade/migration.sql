/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `E41_Appellation_event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `E52_Time_span_event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventId]` on the table `E73_Information_object_event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `E41_Appellation_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `E52_Time_span_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `E73_Information_object_event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_appellation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_information_object_eventId_fkey";

-- DropForeignKey
ALTER TABLE "E5_Event" DROP CONSTRAINT "E5_Event_time_spanId_fkey";

-- AlterTable
ALTER TABLE "E41_Appellation_event" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E52_Time_span_event" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "E73_Information_object_event" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_event_eventId_key" ON "E41_Appellation_event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_eventId_key" ON "E52_Time_span_event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_event_eventId_key" ON "E73_Information_object_event"("eventId");

-- AddForeignKey
ALTER TABLE "E41_Appellation_event" ADD CONSTRAINT "E41_Appellation_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E52_Time_span_event" ADD CONSTRAINT "E52_Time_span_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_event" ADD CONSTRAINT "E73_Information_object_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
