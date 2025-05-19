/*
  Warnings:

  - You are about to drop the `E36_Img_personality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "E36_Img_personality" DROP CONSTRAINT "E36_Img_personality_personalityId_fkey";

-- DropTable
DROP TABLE "E36_Img_personality";
