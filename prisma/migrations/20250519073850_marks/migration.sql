-- CreateTable
CREATE TABLE "E37_Mark" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E37_Mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE37_Mark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE37_Mark_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_E24_MonumentToE37_Mark_B_index" ON "_E24_MonumentToE37_Mark"("B");

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE37_Mark" ADD CONSTRAINT "_E24_MonumentToE37_Mark_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE37_Mark" ADD CONSTRAINT "_E24_MonumentToE37_Mark_B_fkey" FOREIGN KEY ("B") REFERENCES "E37_Mark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
