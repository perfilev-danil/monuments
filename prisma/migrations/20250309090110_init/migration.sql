/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "E24_Monument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT,
    "inscription" TEXT,
    "memorialMeaning" TEXT,

    CONSTRAINT "E24_Monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E21_Personality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E21_Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E57_Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E57_Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "E55_Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_P45_Monument_Material" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P45_Monument_Material_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P2_Monument_Color" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P2_Monument_Color_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_P1_Monument_Personality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_P1_Monument_Personality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_P45_Monument_Material_B_index" ON "_P45_Monument_Material"("B");

-- CreateIndex
CREATE INDEX "_P2_Monument_Color_B_index" ON "_P2_Monument_Color"("B");

-- CreateIndex
CREATE INDEX "_P1_Monument_Personality_B_index" ON "_P1_Monument_Personality"("B");

-- AddForeignKey
ALTER TABLE "_P45_Monument_Material" ADD CONSTRAINT "_P45_Monument_Material_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P45_Monument_Material" ADD CONSTRAINT "_P45_Monument_Material_B_fkey" FOREIGN KEY ("B") REFERENCES "E57_Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P2_Monument_Color" ADD CONSTRAINT "_P2_Monument_Color_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P2_Monument_Color" ADD CONSTRAINT "_P2_Monument_Color_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P1_Monument_Personality" ADD CONSTRAINT "_P1_Monument_Personality_A_fkey" FOREIGN KEY ("A") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_P1_Monument_Personality" ADD CONSTRAINT "_P1_Monument_Personality_B_fkey" FOREIGN KEY ("B") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
