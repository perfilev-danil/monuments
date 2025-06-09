/*
  Warnings:

  - A unique constraint covering the columns `[beginning,end]` on the table `E52_Time_span_event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "E52_Time_span_event_beginning_key";

-- DropIndex
DROP INDEX "E52_Time_span_event_end_key";

-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_beginning_end_key" ON "E52_Time_span_event"("beginning", "end");
