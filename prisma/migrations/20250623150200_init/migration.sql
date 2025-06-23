-- CreateTable
CREATE TABLE "E24_Monument" (
    "id" SERIAL NOT NULL,
    "appellation_monumentId" INTEGER,
    "description_monumentId" INTEGER,
    "yearId" INTEGER,
    "periodId" INTEGER,
    "conceptual_objectId" INTEGER,
    "inscriptionId" INTEGER,
    "appellation_registryId" INTEGER,
    "appellation_infoId" INTEGER,
    "documentId" INTEGER,
    "placeId" INTEGER,

    CONSTRAINT "E24_Monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_monument" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E41_Appellation_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E33_Description_monument" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E33_Description_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E52_Year" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E52_Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Color" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "code" TEXT,

    CONSTRAINT "E55_Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Technique" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Technique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E37_Mark" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E37_Mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E57_Material" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E57_Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E4_Period" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E4_Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_registry" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "information_object_registryId" INTEGER,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E41_Appellation_registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_registry" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "appellation_registryId" INTEGER NOT NULL,

    CONSTRAINT "E73_Information_object_registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E34_Inscription" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E34_Inscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E28_Conceptual_object" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E28_Conceptual_object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_info" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "information_object_infoId" INTEGER,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E41_Appellation_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_info" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "appellation_infoId" INTEGER NOT NULL,

    CONSTRAINT "E73_Information_object_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E31_Document" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "information_object_documentId" INTEGER,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E31_Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_document" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "E73_Information_object_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E53_Place" (
    "id" SERIAL NOT NULL,
    "monumentId" INTEGER NOT NULL,
    "appellation_placeId" INTEGER,
    "appellation_addressId" INTEGER,

    CONSTRAINT "E53_Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_place" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E41_Appellation_place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_address" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "coordinatesId" INTEGER,

    CONSTRAINT "E41_Appellation_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E94_Coordinates" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "appellation_addressId" INTEGER NOT NULL,

    CONSTRAINT "E94_Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E36_Img_monument" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT,
    "mimeType" TEXT,
    "imageData" BYTEA,
    "monumentId" INTEGER NOT NULL,

    CONSTRAINT "E36_Img_monument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E21_Personality" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,
    "appellation_personalityId" INTEGER,
    "information_object_personalityId" INTEGER,

    CONSTRAINT "E21_Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "e21_PersonalityId" INTEGER,

    CONSTRAINT "E41_Appellation_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E55_Role_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "E55_Role_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_personality" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "e21_PersonalityId" INTEGER,

    CONSTRAINT "E73_Information_object_personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E5_Event" (
    "id" SERIAL NOT NULL,
    "appellation_eventId" INTEGER,
    "time_spanId" INTEGER,
    "information_object_eventId" INTEGER,
    "monumentId" INTEGER,

    CONSTRAINT "E5_Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E41_Appellation_event" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "E41_Appellation_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E52_Time_span_event" (
    "id" SERIAL NOT NULL,
    "beginning" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "E52_Time_span_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "E73_Information_object_event" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "E73_Information_object_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE55_Color" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE55_Color_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE57_Material" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE57_Material_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE55_Technique" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE55_Technique_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E24_MonumentToE37_Mark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E24_MonumentToE37_Mark_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_E21_PersonalityToE24_Monument" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_E21_PersonalityToE24_Monument_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_monumentId_key" ON "E24_Monument"("appellation_monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_description_monumentId_key" ON "E24_Monument"("description_monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_yearId_key" ON "E24_Monument"("yearId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_conceptual_objectId_key" ON "E24_Monument"("conceptual_objectId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_inscriptionId_key" ON "E24_Monument"("inscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_registryId_key" ON "E24_Monument"("appellation_registryId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_appellation_infoId_key" ON "E24_Monument"("appellation_infoId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_documentId_key" ON "E24_Monument"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E24_Monument_placeId_key" ON "E24_Monument"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_monument_monumentId_key" ON "E41_Appellation_monument"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E33_Description_monument_monumentId_key" ON "E33_Description_monument"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Year_monumentId_key" ON "E52_Year"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E55_Color_value_key" ON "E55_Color"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E55_Color_code_key" ON "E55_Color"("code");

-- CreateIndex
CREATE UNIQUE INDEX "E55_Technique_value_key" ON "E55_Technique"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E37_Mark_value_key" ON "E37_Mark"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E57_Material_value_key" ON "E57_Material"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E4_Period_value_key" ON "E4_Period"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_registry_information_object_registryId_key" ON "E41_Appellation_registry"("information_object_registryId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_registry_monumentId_key" ON "E41_Appellation_registry"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_registry_appellation_registryId_key" ON "E73_Information_object_registry"("appellation_registryId");

-- CreateIndex
CREATE UNIQUE INDEX "E34_Inscription_monumentId_key" ON "E34_Inscription"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E28_Conceptual_object_monumentId_key" ON "E28_Conceptual_object"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_info_information_object_infoId_key" ON "E41_Appellation_info"("information_object_infoId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_info_monumentId_key" ON "E41_Appellation_info"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_info_appellation_infoId_key" ON "E73_Information_object_info"("appellation_infoId");

-- CreateIndex
CREATE UNIQUE INDEX "E31_Document_information_object_documentId_key" ON "E31_Document"("information_object_documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E31_Document_monumentId_key" ON "E31_Document"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_document_documentId_key" ON "E73_Information_object_document"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_monumentId_key" ON "E53_Place"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E53_Place_appellation_addressId_key" ON "E53_Place"("appellation_addressId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_place_value_key" ON "E41_Appellation_place"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_address_placeId_key" ON "E41_Appellation_address"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_address_coordinatesId_key" ON "E41_Appellation_address"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "E94_Coordinates_appellation_addressId_key" ON "E94_Coordinates"("appellation_addressId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_appellation_personalityId_key" ON "E21_Personality"("appellation_personalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E21_Personality_information_object_personalityId_key" ON "E21_Personality"("information_object_personalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_personality_e21_PersonalityId_key" ON "E41_Appellation_personality"("e21_PersonalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E55_Role_personality_value_key" ON "E55_Role_personality"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_personality_value_key" ON "E73_Information_object_personality"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_personality_e21_PersonalityId_key" ON "E73_Information_object_personality"("e21_PersonalityId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_appellation_eventId_key" ON "E5_Event"("appellation_eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_time_spanId_key" ON "E5_Event"("time_spanId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_information_object_eventId_key" ON "E5_Event"("information_object_eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E5_Event_monumentId_key" ON "E5_Event"("monumentId");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_event_value_key" ON "E41_Appellation_event"("value");

-- CreateIndex
CREATE UNIQUE INDEX "E41_Appellation_event_eventId_key" ON "E41_Appellation_event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_eventId_key" ON "E52_Time_span_event"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "E52_Time_span_event_beginning_end_key" ON "E52_Time_span_event"("beginning", "end");

-- CreateIndex
CREATE UNIQUE INDEX "E73_Information_object_event_eventId_key" ON "E73_Information_object_event"("eventId");

-- CreateIndex
CREATE INDEX "_E24_MonumentToE55_Color_B_index" ON "_E24_MonumentToE55_Color"("B");

-- CreateIndex
CREATE INDEX "_E24_MonumentToE57_Material_B_index" ON "_E24_MonumentToE57_Material"("B");

-- CreateIndex
CREATE INDEX "_E24_MonumentToE55_Technique_B_index" ON "_E24_MonumentToE55_Technique"("B");

-- CreateIndex
CREATE INDEX "_E24_MonumentToE37_Mark_B_index" ON "_E24_MonumentToE37_Mark"("B");

-- CreateIndex
CREATE INDEX "_E21_PersonalityToE24_Monument_B_index" ON "_E21_PersonalityToE24_Monument"("B");

-- AddForeignKey
ALTER TABLE "E24_Monument" ADD CONSTRAINT "E24_Monument_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "E4_Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_monument" ADD CONSTRAINT "E41_Appellation_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E33_Description_monument" ADD CONSTRAINT "E33_Description_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E52_Year" ADD CONSTRAINT "E52_Year_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_registry" ADD CONSTRAINT "E41_Appellation_registry_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_registry" ADD CONSTRAINT "E73_Information_object_registry_appellation_registryId_fkey" FOREIGN KEY ("appellation_registryId") REFERENCES "E41_Appellation_registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E34_Inscription" ADD CONSTRAINT "E34_Inscription_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E28_Conceptual_object" ADD CONSTRAINT "E28_Conceptual_object_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_info" ADD CONSTRAINT "E41_Appellation_info_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_info" ADD CONSTRAINT "E73_Information_object_info_appellation_infoId_fkey" FOREIGN KEY ("appellation_infoId") REFERENCES "E41_Appellation_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E31_Document" ADD CONSTRAINT "E31_Document_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_document" ADD CONSTRAINT "E73_Information_object_document_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "E31_Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E53_Place" ADD CONSTRAINT "E53_Place_appellation_placeId_fkey" FOREIGN KEY ("appellation_placeId") REFERENCES "E41_Appellation_place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_address" ADD CONSTRAINT "E41_Appellation_address_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "E53_Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E94_Coordinates" ADD CONSTRAINT "E94_Coordinates_appellation_addressId_fkey" FOREIGN KEY ("appellation_addressId") REFERENCES "E41_Appellation_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E36_Img_monument" ADD CONSTRAINT "E36_Img_monument_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E21_Personality" ADD CONSTRAINT "E21_Personality_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "E55_Role_personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_personality" ADD CONSTRAINT "E41_Appellation_personality_e21_PersonalityId_fkey" FOREIGN KEY ("e21_PersonalityId") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_personality" ADD CONSTRAINT "E73_Information_object_personality_e21_PersonalityId_fkey" FOREIGN KEY ("e21_PersonalityId") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E5_Event" ADD CONSTRAINT "E5_Event_monumentId_fkey" FOREIGN KEY ("monumentId") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E41_Appellation_event" ADD CONSTRAINT "E41_Appellation_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E52_Time_span_event" ADD CONSTRAINT "E52_Time_span_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "E73_Information_object_event" ADD CONSTRAINT "E73_Information_object_event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "E5_Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Color" ADD CONSTRAINT "_E24_MonumentToE55_Color_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE57_Material" ADD CONSTRAINT "_E24_MonumentToE57_Material_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE57_Material" ADD CONSTRAINT "_E24_MonumentToE57_Material_B_fkey" FOREIGN KEY ("B") REFERENCES "E57_Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Technique" ADD CONSTRAINT "_E24_MonumentToE55_Technique_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE55_Technique" ADD CONSTRAINT "_E24_MonumentToE55_Technique_B_fkey" FOREIGN KEY ("B") REFERENCES "E55_Technique"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE37_Mark" ADD CONSTRAINT "_E24_MonumentToE37_Mark_A_fkey" FOREIGN KEY ("A") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E24_MonumentToE37_Mark" ADD CONSTRAINT "_E24_MonumentToE37_Mark_B_fkey" FOREIGN KEY ("B") REFERENCES "E37_Mark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E21_PersonalityToE24_Monument" ADD CONSTRAINT "_E21_PersonalityToE24_Monument_A_fkey" FOREIGN KEY ("A") REFERENCES "E21_Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_E21_PersonalityToE24_Monument" ADD CONSTRAINT "_E21_PersonalityToE24_Monument_B_fkey" FOREIGN KEY ("B") REFERENCES "E24_Monument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
