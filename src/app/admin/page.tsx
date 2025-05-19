"use client";

import { useState, useEffect } from "react";
import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  ReferenceInput,
  SelectInput,
  ReferenceManyField,
  ReferenceField,
  ReferenceArrayInput,
  SingleFieldList,
  SelectArrayInput,
  ChipField,
  NumberInput,
  ImageField,
  FileInput,
  FileField,
  NumberField,
} from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Admin dataProvider={dataProvider("/api")}>
      <Resource
        name="e24_Monument"
        list={MonumentList}
        edit={MonumentEdit}
        create={MonumentCreate}
        options={{ label: "Памятники" }}
      />
      <Resource
        name="e41_Appellation_monument"
        list={AppellationMonumentList}
        edit={AppellationMonumentEdit}
        create={AppellationMonumentCreate}
        options={{ label: "Названия" }}
      />
      <Resource
        name="e33_Description_monument"
        list={DescriptionMonumentList}
        edit={DescriptionMonumentEdit}
        create={DescriptionMonumentCreate}
        options={{ label: "Описания" }}
      />
      <Resource
        name="e52_Year"
        list={YearList}
        edit={YearEdit}
        create={YearCreate}
        options={{ label: "Годы" }}
      />
      <Resource
        name="e41_Appellation_registry"
        list={AppellationRegistryList}
        edit={AppellationRegistryEdit}
        create={AppellationRegistryCreate}
        options={{ label: "Номера в гос. реестре" }}
      />
      <Resource
        name="e34_Inscription"
        list={InscriptionList}
        edit={InscriptionEdit}
        create={InscriptionCreate}
        options={{ label: "Надписи" }}
      />
      <Resource
        name="e55_Color"
        list={ColorList}
        edit={ColorEdit}
        create={ColorCreate}
        options={{ label: "Цвета" }}
      />
      <Resource
        name="e57_Material"
        list={MaterialList}
        edit={MaterialEdit}
        create={MaterialCreate}
        options={{ label: "Материалы" }}
      />
      <Resource
        name="e55_Technique"
        list={TechniqueList}
        edit={TechniqueEdit}
        create={TechniqueCreate}
        options={{ label: "Техники" }}
      />
      <Resource
        name="e4_Period"
        list={PeriodList}
        edit={PeriodEdit}
        create={PeriodCreate}
        options={{ label: "Периоды" }}
      />
      <Resource
        name="e28_Conceptual_object"
        list={СonceptualObjectList}
        edit={СonceptualObjectEdit}
        create={СonceptualObjectCreate}
        options={{ label: "Мемориальные значения" }}
      />

      <Resource
        name="e31_Document"
        list={DocumentList}
        edit={DocumentEdit}
        create={DocumentCreate}
        options={{ label: "Документы" }}
      />
      <Resource
        name="e73_Information_object_document"
        list={InformationObjectDocumentList}
        edit={InformationObjectDocumentEdit}
        create={InformationObjectDocumentCreate}
        options={{ label: "Ссылки на документы" }}
      />
      <Resource
        name="e54_Dimension"
        list={DimensionList}
        edit={DimensionEdit}
        create={DimensionCreate}
        options={{ label: "Размеры" }}
      />
      <Resource
        name="e55_Dimension_type"
        list={DimensionTypeList}
        edit={DimensionTypeEdit}
        create={DimensionTypeCreate}
        options={{ label: "Типы размеров" }}
      />
    </Admin>
  );
}

{
  /* Monument */
}
const MonumentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        label="Название"
        source="appellation_monumentId"
        reference="e41_Appellation_monument"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        label="Описание"
        source="description_monumentId"
        reference="e33_Description_monument"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField label="Год" source="yearId" reference="e52_Year">
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField label="Период" source="periodId" reference="e4_Period">
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        label="Номер в гос. реестре ОКН"
        source="appellation_registryId"
        reference="e41_Appellation_registry"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        label="Мемориальное значение"
        source="conceptual_objectId"
        reference="e28_Conceptual_object"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        label="Надпись"
        source="inscriptionId"
        reference="e34_Inscription"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceManyField
        label="Цвета"
        reference="e55_Color"
        target="monuments"
      >
        <SingleFieldList>
          <ChipField source="value" />
        </SingleFieldList>
      </ReferenceManyField>
      <ReferenceManyField
        label="Материалы"
        reference="e57_Material"
        target="monuments"
      >
        <SingleFieldList>
          <ChipField source="value" />
        </SingleFieldList>
      </ReferenceManyField>
      <ReferenceManyField
        label="Техники"
        reference="e55_Technique"
        target="monuments"
      >
        <SingleFieldList>
          <ChipField source="value" />
        </SingleFieldList>
      </ReferenceManyField>

      <ReferenceManyField
        label="Документы"
        reference="e31_Document"
        target="monumentId"
      >
        <SingleFieldList>
          <ChipField source="value" />
        </SingleFieldList>
      </ReferenceManyField>
      <ReferenceManyField
        label="Размеры"
        reference="e54_Dimension"
        target="monuments"
      >
        <SingleFieldList>
          <ChipField source="value" />
        </SingleFieldList>
      </ReferenceManyField>
    </Datagrid>
  </List>
);

const MonumentEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        label="Название"
        source="appellation_monumentId"
        reference="e41_Appellation_monument"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Описание"
        source="description_monumentId"
        reference="e33_Description_monument"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>

      <ReferenceInput label="Год" source="yearId" reference="e52_Year">
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput label="Период" source="periodId" reference="e4_Period">
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Номер в гос. реестре ОКН"
        source="appellation_registryId"
        reference="e41_Appellation_registry"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Надпись"
        source="inscriptionId"
        reference="e34_Inscription"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Мемориальное значение"
        source="conceptual_objectId"
        reference="e28_Conceptual_object"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceArrayInput label="Цвета" source="colors" reference="e55_Color">
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Материалы"
        source="materials"
        reference="e57_Material"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Техники"
        source="techniques"
        reference="e55_Technique"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="Документы"
        source="documents"
        reference="e31_Document"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Размеры"
        source="dimensions"
        reference="e54_Dimension"
      >
        <SelectArrayInput
          optionText={(record) =>
            `${record.value} (${record.dimension_type?.value || "нет типа"})`
          }
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

const MonumentCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        label="Название"
        source="appellation_monumentId"
        reference="e41_Appellation_monument"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Описание"
        source="description_monumentId"
        reference="e33_Description_monument"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput label="Год" source="yearId" reference="e52_Year">
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput label="Период" source="periodId" reference="e4_Period">
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Номер в гос. реестре ОКН"
        source="appellation_registryId"
        reference="e41_Appellation_registry"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Надпись"
        source="inscriptionId"
        reference="e34_Inscription"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        label="Мемориальное значение"
        source="conceptual_objectId"
        reference="e28_Conceptual_object"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>

      <ReferenceArrayInput label="Цвета" source="colors" reference="e55_Color">
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Материалы"
        source="materials"
        reference="e57_Material"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Техники"
        source="techniques"
        reference="e55_Technique"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="Документы"
        source="documents"
        reference="e31_Document"
      >
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Размеры"
        source="dimensions"
        reference="e54_Dimension"
      >
        <SelectArrayInput
          optionText={(record) =>
            `${record.value} (${record.dimension_type?.value || "нет типа"})`
          }
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

{
  /* Appellation monument */
}
const AppellationMonumentList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Название" />
    </Datagrid>
  </List>
);

const AppellationMonumentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Название" fullWidth />
    </SimpleForm>
  </Edit>
);

const AppellationMonumentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Название" fullWidth />
    </SimpleForm>
  </Create>
);

{
  /* Description monument */
}
const DescriptionMonumentList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Описание" />
    </Datagrid>
  </List>
);

const DescriptionMonumentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Описание" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

const DescriptionMonumentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Описание" multiline fullWidth />
    </SimpleForm>
  </Create>
);

{
  /* Year */
}
const YearList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Год" />
    </Datagrid>
  </List>
);

const YearEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Год" />
    </SimpleForm>
  </Edit>
);

const YearCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Год" />
    </SimpleForm>
  </Create>
);

{
  /* Appellation registry */
}
const AppellationRegistryList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Номер в гос. реестре ОКН" />
    </Datagrid>
  </List>
);

const AppellationRegistryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="value"
        label="Номер в гос. реестре ОКН"
        multiline
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

const AppellationRegistryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="value"
        label="Номер в гос. реестре ОКН"
        multiline
        fullWidth
      />
    </SimpleForm>
  </Create>
);

{
  /* Inscription */
}
const InscriptionList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Надпись" />
    </Datagrid>
  </List>
);

const InscriptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Надпись" />
    </SimpleForm>
  </Edit>
);

const InscriptionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Надпись" />
    </SimpleForm>
  </Create>
);

{
  /* Color */
}
const ColorList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Цвет" />
      <TextField source="code" label="Код цвета" />
    </Datagrid>
  </List>
);

const ColorEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Цвет" />
      <TextInput source="code" label="Код цвета" />
    </SimpleForm>
  </Edit>
);

const ColorCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Цвет" />
      <TextInput source="code" label="Код цвета" />
    </SimpleForm>
  </Create>
);

{
  /* Material */
}
const MaterialList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Материал" />
    </Datagrid>
  </List>
);

const MaterialEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Материал" />
    </SimpleForm>
  </Edit>
);

const MaterialCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Материал" />
    </SimpleForm>
  </Create>
);

{
  /* Technique */
}
const TechniqueList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Техника" />
    </Datagrid>
  </List>
);

const TechniqueEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Техника" />
    </SimpleForm>
  </Edit>
);

const TechniqueCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Техника" />
    </SimpleForm>
  </Create>
);

{
  /* Period */
}
const PeriodList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Период" />
    </Datagrid>
  </List>
);

const PeriodEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Период" />
    </SimpleForm>
  </Edit>
);

const PeriodCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Период" />
    </SimpleForm>
  </Create>
);

{
  /* Сonceptual object */
}
const СonceptualObjectList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Мемориальное значение" />
    </Datagrid>
  </List>
);

const СonceptualObjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Мемориальное значение" />
    </SimpleForm>
  </Edit>
);

const СonceptualObjectCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Мемориальное значение" />
    </SimpleForm>
  </Create>
);

{
  /* Document */
}
const DocumentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="value" label="Документ" />
      <ReferenceField
        source="Information_object_documentId"
        reference="e73_Information_object_document"
        label="Ссылка"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
      >
        <TextField source="id" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const DocumentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Документ" />
      <ReferenceInput
        source="Information_object_documentId"
        reference="e73_Information_object_document"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const DocumentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Документ" />
      <ReferenceInput
        source="Information_object_documentId"
        reference="e73_Information_object_document"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Information object document (Link) */
}
const InformationObjectDocumentList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Ссылка на документ" />
    </Datagrid>
  </List>
);

const InformationObjectDocumentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Ссылка на документ" />
    </SimpleForm>
  </Edit>
);

const InformationObjectDocumentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Ссылка на документ" />
    </SimpleForm>
  </Create>
);

{
  /* Dimension */
}
const DimensionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="value" label="Размер" />
      <ReferenceField
        source="dimension_typeId"
        reference="e55_Dimension_type"
        label="Тип размера"
      >
        <TextField source="value" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const DimensionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Размер" />
      <ReferenceInput
        source="dimension_typeId"
        reference="e55_Dimension_type"
        label="Тип размера"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const DimensionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Размер" />
      <ReferenceInput
        source="dimension_typeId"
        reference="e55_Dimension_type"
        label="Тип размера"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Dimension type */
}
const DimensionTypeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Тип размера" />
    </Datagrid>
  </List>
);

const DimensionTypeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Тип размера" />
    </SimpleForm>
  </Edit>
);

const DimensionTypeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Тип размера" />
    </SimpleForm>
  </Create>
);

{
  /* Personality */
}
const PersonalityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Личность" />
    </Datagrid>
  </List>
);

const PersonalityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Личность" />
    </SimpleForm>
  </Edit>
);

const PersonalityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Личность" />
    </SimpleForm>
  </Create>
);

/*
"use client";

import { useState } from "react";

import MonumentsTable from "../components/MonumentsTable";
import ColorsTable from "../components/ColorsTable";
import MaterialsTable from "../components/MaterialsTable";
import PeriodsTable from "../components/PeriodsTable";
import DocumentsTable from "../components/DocumentsTable";
import EventsTable from "../components/EventsTable";
import DimensionTypesTable from "../components/DimensionTypesTable";
import PersonalitiesTable from "../components/PersonalitiesTable";

const tableComponents = {
  monuments: {
    component: MonumentsTable,
    label: "Памятники",
  },
  colors: {
    component: ColorsTable,
    label: "Цвета",
  },
  materials: {
    component: MaterialsTable,
    label: "Материалы",
  },
  periods: {
    component: PeriodsTable,
    label: "Периоды",
  },
  documents: {
    component: DocumentsTable,
    label: "Документы",
  },
  events: {
    component: EventsTable,
    label: "События",
  },
  dimensionTypes: {
    component: DimensionTypesTable,
    label: "Типы размеров",
  },
  personalities: {
    component: PersonalitiesTable,
    label: "Личности",
  },
};

export default function AdminPage() {
  const [activeTable, setActiveTable] =
    useState<keyof typeof tableComponents>("monuments");

  const CurrentTable = tableComponents[activeTable].component;
  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.entries(tableComponents).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveTable(key as keyof typeof tableComponents)}
            className={`p-2 ${
              activeTable === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <CurrentTable />
    </div>
  );
}

*/
