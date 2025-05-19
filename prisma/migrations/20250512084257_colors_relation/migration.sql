/*
  Warnings:

  - You are about to drop the `_MonumentColors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MonumentColors" DROP CONSTRAINT "_MonumentColors_A_fkey";

-- DropForeignKey
ALTER TABLE "_MonumentColors" DROP CONSTRAINT "_MonumentColors_B_fkey";

-- DropTable
DROP TABLE "_MonumentColors";

-- CreateTable
CREATE TABLE "_E24_MonumentToE55_Color" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE55_Color_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE55_Color_B_index" ON "_E24_MonumentToE55_Color"("B");

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
