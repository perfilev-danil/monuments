/*
  Warnings:

  - A unique constraint covering the columns `[beginning]` on the table `E52_Time_span_event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end]` on the table `E52_Time_span_event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_beginning_key" ON "E52_Time_span_event"("beginning");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_end_key" ON "E52_Time_span_event"("end");
