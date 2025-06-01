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
  ImageInput,
  FunctionField,
  useRecordContext,
} from "react-admin";
import Image from "next/image";
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
        options={{ label: "Названия памятников" }}
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
        name="e41_Appellation_info"
        list={AppellationInfoList}
        edit={AppellationInfoEdit}
        create={AppellationInfoCreate}
        options={{ label: "Названия источников" }}
      />
      <Resource
        name="e73_Information_object_info"
        list={InformationObjectInfoList}
        edit={InformationObjectInfoEdit}
        create={InformationObjectInfoCreate}
        options={{ label: "Ссылки на источники" }}
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
        name="e37_Mark"
        list={MarkList}
        edit={MarkEdit}
        create={MarkCreate}
        options={{ label: "Символы" }}
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
      <Resource
        name="e21_Personality"
        list={PersonalityList}
        edit={PersonalityEdit}
        create={PersonalityCreate}
        options={{ label: "Личности" }}
      />
      <Resource
        name="e41_Appellation_personality"
        list={AppellationPersonalityList}
        edit={AppellationPersonalityEdit}
        create={AppellationPersonalityCreate}
        options={{ label: "ФИО Личностей" }}
      />
      <Resource
        name="e55_Role_personality"
        list={RolePersonalityList}
        edit={RolePersonalityEdit}
        create={RolePersonalityCreate}
        options={{ label: "Роли" }}
      />
      <Resource
        name="e73_Information_object_personality"
        list={InformationObjectPersonalityList}
        edit={InformationObjectPersonalityEdit}
        create={InformationObjectPersonalityCreate}
        options={{ label: "Ссылки на личностей" }}
      />
      <Resource
        name="e5_Event"
        list={EventList}
        edit={EventEdit}
        create={EventCreate}
        options={{ label: "События" }}
      />
      <Resource
        name="e41_Appellation_event"
        list={AppellationEventList}
        edit={AppellationEventEdit}
        create={AppellationEventCreate}
        options={{ label: "Названия событий" }}
      />
      <Resource
        name="e52_Time_span_event"
        list={TimeSpanEventList}
        edit={TimeSpanEventEdit}
        create={TimeSpanEventCreate}
        options={{ label: "Продолжительности событий" }}
      />
      <Resource
        name="e73_Information_object_event"
        list={InformationObjectEventList}
        edit={InformationObjectEventEdit}
        create={InformationObjectEventCreate}
        options={{ label: "Ссылки на события" }}
      />
      <Resource
        name="e53_Place"
        list={PlaceList}
        edit={PlaceEdit}
        create={PlaceCreate}
        options={{ label: "Места" }}
      />
      <Resource
        name="e41_Appellation_place"
        list={AppellationPlaceList}
        edit={AppellationPlaceEdit}
        create={AppellationPlaceCreate}
        options={{ label: "Названия населённых пунктов" }}
      />
      <Resource
        name="e41_Appellation_address"
        list={AppellationAddressList}
        edit={AppellationAddressEdit}
        create={AppellationAddressCreate}
        options={{ label: "Адреса" }}
      />
      <Resource
        name="e73_Information_object_place"
        list={InformationObjectPlaceList}
        edit={InformationObjectPlaceEdit}
        create={InformationObjectPlaceCreate}
        options={{ label: "Ссылки на населённые пункты" }}
      />
      <Resource
        name="e94_Coordinates"
        list={CoordinatesList}
        edit={CoordinatesEdit}
        create={CoordinatesCreate}
        options={{ label: "Координаты" }}
      />
      <Resource
        name="e36_Img_monument"
        list={ImgList}
        edit={ImgEdit}
        create={ImgCreate}
        options={{ label: "Изображения" }}
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
        label="Источник"
        source="appellation_infoId"
        reference="e41_Appellation_info"
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
      <ReferenceField label="Место" source="placeId" reference="e53_Place">
        <TextField source="id" />
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
        label="Символы"
        reference="e37_Mark"
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
      <ReferenceManyField
        label="Личности"
        reference="e21_Personality"
        target="monuments"
      >
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ReferenceManyField>
      <ReferenceManyField
        label="События"
        reference="e5_Event"
        target="monumentId"
      >
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ReferenceManyField>
      <ReferenceManyField
        label="Изображения"
        reference="e36_Img_monument"
        target="monumentId"
      >
        <SingleFieldList>
          <ChipField source="id" />
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
        label="Источник"
        source="appellation_infoId"
        reference="e41_Appellation_info"
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
      <ReferenceInput label="Место" source="placeId" reference="e53_Place">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceArrayInput label="Цвета" source="colors" reference="e55_Color">
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Символы" source="marks" reference="e37_Mark">
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
      <ReferenceArrayInput
        label="Личности"
        source="personalities"
        reference="e21_Personality"
      >
        <SelectArrayInput optionText="id" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="События" source="events" reference="e5_Event">
        <SelectArrayInput optionText="id" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Изображения"
        source="images"
        reference="e36_Img_monument"
      >
        <SelectArrayInput optionText="id" />
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
        label="Источник"
        source="appellation_infoId"
        reference="e41_Appellation_info"
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
      <ReferenceInput label="Место" source="placeId" reference="e53_Place">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceArrayInput label="Цвета" source="colors" reference="e55_Color">
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Символы" source="marks" reference="e37_Mark">
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
      <ReferenceArrayInput
        label="Личности"
        source="personalities"
        reference="e21_Personality"
      >
        <SelectArrayInput optionText="id" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="События" source="events" reference="e5_Event">
        <SelectArrayInput optionText="id" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Изображения"
        source="images"
        reference="e36_Img_monument"
      >
        <SelectArrayInput optionText="id" />
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
  /* Appellation info */
}
const AppellationInfoList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Название" />
      <ReferenceField
        source="information_object_infoId"
        reference="e73_Information_object_info"
        label="Ссылка"
      >
        <TextField source="value" label="Ссылка" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const AppellationInfoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Название" multiline />
      <ReferenceInput
        source="information_object_infoId"
        reference="e73_Information_object_info"
        label="Ссылка"
      >
        <SelectInput optionText="value" label="Ссылка" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const AppellationInfoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Название" multiline />
      <ReferenceInput
        source="information_object_infoId"
        reference="e73_Information_object_info"
        label="Ссылка"
      >
        <SelectInput optionText="value" label="Ссылка" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Information object info */
}
const InformationObjectInfoList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Ссылка" />
    </Datagrid>
  </List>
);

const InformationObjectInfoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" multiline />
    </SimpleForm>
  </Edit>
);

const InformationObjectInfoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" multiline />
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
  /* Color */
}
const MarkList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Символ" />
    </Datagrid>
  </List>
);

const MarkEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Символ" />
    </SimpleForm>
  </Edit>
);

const MarkCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Символ" />
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
      <NumberField source="value" label="Размер" />
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
      <NumberInput source="value" label="Размер" />
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
      <NumberInput source="value" label="Размер" />
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
  /* Appellation personality */
}
const AppellationPersonalityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="ФИО" />
    </Datagrid>
  </List>
);

const AppellationPersonalityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="ФИО" />
    </SimpleForm>
  </Edit>
);

const AppellationPersonalityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="ФИО" />
    </SimpleForm>
  </Create>
);

{
  /* Information object personality */
}
const InformationObjectPersonalityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Ссылка" />
    </Datagrid>
  </List>
);

const InformationObjectPersonalityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Edit>
);

const InformationObjectPersonalityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Create>
);

{
  /* Role personality */
}
const RolePersonalityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Роль" />
    </Datagrid>
  </List>
);

const RolePersonalityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Роль" />
    </SimpleForm>
  </Edit>
);

const RolePersonalityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Роль" />
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
      <ReferenceField
        source="appellation_personalityId"
        reference="e41_Appellation_personality"
        label="ФИО"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="information_object_personalityId"
        reference="e73_Information_object_personality"
        label="Ссылка"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="roleId"
        reference="e55_Role_personality"
        label="Роль"
      >
        <TextField source="value" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const PersonalityEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="appellation_personalityId"
        reference="e41_Appellation_personality"
        label="ФИО"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_personalityId"
        reference="e73_Information_object_personality"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="roleId"
        reference="e55_Role_personality"
        label="Роль"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const PersonalityCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="appellation_personalityId"
        reference="e41_Appellation_personality"
        label="ФИО"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_personalityId"
        reference="e73_Information_object_personality"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="roleId"
        reference="e55_Role_personality"
        label="Роль"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Appellation event */
}
const AppellationEventList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Название" />
    </Datagrid>
  </List>
);

const AppellationEventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Название" />
    </SimpleForm>
  </Edit>
);

const AppellationEventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Название" />
    </SimpleForm>
  </Create>
);

{
  /* Time span event */
}
const TimeSpanEventList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="beginning" label="Начало" />
      <NumberField source="end" label="Конец" />
    </Datagrid>
  </List>
);

const TimeSpanEventEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="beginning" label="Начало" />
      <NumberInput source="end" label="Конец" />
    </SimpleForm>
  </Edit>
);

const TimeSpanEventCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="beginning" label="Начало" />
      <NumberInput source="end" label="Конец" />
    </SimpleForm>
  </Create>
);

{
  /* Information object event */
}
const InformationObjectEventList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Ссылка" />
    </Datagrid>
  </List>
);

const InformationObjectEventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Edit>
);

const InformationObjectEventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Create>
);

{
  /* Event */
}
const EventList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Начало"
      >
        <TextField source="beginning" />
      </ReferenceField>
      <ReferenceField
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Конец"
      >
        <TextField source="end" />
      </ReferenceField>
      <ReferenceField
        source="appellation_eventId"
        reference="e41_Appellation_event"
        label="Название"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="information_object_eventId"
        reference="e73_Information_object_event"
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

const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Начало"
      >
        <SelectInput optionText="beginning" />
      </ReferenceInput>
      <ReferenceInput
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Конец"
      >
        <SelectInput optionText="end" />
      </ReferenceInput>
      <ReferenceInput
        source="appellation_eventId"
        reference="e41_Appellation_event"
        label="Название"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_eventId"
        reference="e73_Information_object_event"
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

const EventCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Начало"
      >
        <SelectInput optionText="beginning" />
      </ReferenceInput>
      <ReferenceInput
        source="time_spanId"
        reference="e52_Time_span_event"
        label="Конец"
      >
        <SelectInput optionText="end" />
      </ReferenceInput>
      <ReferenceInput
        source="appellation_eventId"
        reference="e41_Appellation_event"
        label="Название"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_eventId"
        reference="e73_Information_object_event"
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
  /*  Appellation place */
}
const AppellationPlaceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Населённый пункт" />
    </Datagrid>
  </List>
);

const AppellationPlaceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Населённый пункт" />
    </SimpleForm>
  </Edit>
);

const AppellationPlaceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Населённый пункт" />
    </SimpleForm>
  </Create>
);

{
  /*  Information object place */
}
const InformationObjectPlaceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="value" label="Ссылка" />
    </Datagrid>
  </List>
);

const InformationObjectPlaceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Edit>
);

const InformationObjectPlaceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Ссылка" />
    </SimpleForm>
  </Create>
);

{
  /*  Coordinates */
}
const CoordinatesList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="lon" label="Долгота" />
      <TextField source="lat" label="Ширина" />
    </Datagrid>
  </List>
);

const CoordinatesEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="lon" label="Долгота" />
      <NumberInput source="lat" label="Ширина" />
    </SimpleForm>
  </Edit>
);

const CoordinatesCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="lon" label="Долгота" />
      <NumberInput source="lat" label="Ширина" />
    </SimpleForm>
  </Create>
);

{
  /*  Appellation address */
}
const AppellationAddressList = () => (
  <List>
    <Datagrid>
      <TextField source="value" label="Адрес" />
      <ReferenceField
        source="coordinatesId"
        reference="e94_Coordinates"
        label="Координаты"
      >
        <FunctionField render={(record) => `${record?.lon} ${record?.lat}`} />
      </ReferenceField>
    </Datagrid>
  </List>
);

const AppellationAddressEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" label="Адрес" />
      <ReferenceInput
        source="coordinatesId"
        reference="e94_Coordinates"
        label="Координаты"
      >
        <SelectInput optionText={(record) => `${record.lon} ${record.lat}`} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const AppellationAddressCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="value" label="Адрес" />
      <ReferenceInput
        source="coordinatesId"
        reference="e94_Coordinates"
        label="Координаты"
      >
        <SelectInput optionText={(record) => `${record.lon} ${record.lat}`} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Place */
}
const PlaceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        source="appellation_placeId"
        reference="e41_Appellation_place"
        label="Название"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="appellation_addressId"
        reference="e41_Appellation_address"
        label="Адрес"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="information_object_placeId"
        reference="e73_Information_object_place"
        label="Ссылка"
      >
        <TextField source="value" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const PlaceEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput
        source="appellation_placeId"
        reference="e41_Appellation_place"
        label="Название"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="appellation_addressId"
        reference="e41_Appellation_address"
        label="Адрес"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_placeId"
        reference="e73_Information_object_place"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const PlaceCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="appellation_placeId"
        reference="e41_Appellation_place"
        label="Название"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="appellation_addressId"
        reference="e41_Appellation_address"
        label="Адрес"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <ReferenceInput
        source="information_object_placeId"
        reference="e73_Information_object_place"
        label="Ссылка"
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

{
  /* Img  */
}

const convertFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const imageTransform = async (data: any) => {
  if (data.image?.rawFile) {
    const base64 = await convertFileToBase64(data.image.rawFile);
    return {
      imageData: base64,
      fileName: data.fileName || data.image.rawFile.name,
      mimeType: data.image.rawFile.type,
      monumentId: data.monumentId,
    };
  }
  return data;
};

const ImagePreview = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <div className="w-28 h-28 relative">
      <Image
        src={`/api/images/${record.id}`}
        alt=""
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
};

const ImgList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="fileName" label="Имя файла" />
      <ReferenceField
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
        link="show"
      />

      <ImagePreview />

      <TextField source="mimeType" label="Тип файла" />
    </Datagrid>
  </List>
);

const ImgEdit = () => (
  <Edit transform={imageTransform}>
    <SimpleForm>
      <TextInput source="fileName" label="Имя файла" fullWidth />

      <ReferenceInput
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
      >
        <SelectInput optionText="id" label="Памятник" />
      </ReferenceInput>

      <FileInput
        source="image"
        label="Новое изображение"
        placeholder="Перетащите файл или кликните для выбора"
      >
        <FileField source="src" title="title" />
      </FileInput>

      <TextInput source="mimeType" label="Тип файла" disabled fullWidth />
    </SimpleForm>
  </Edit>
);

const ImgCreate = () => (
  <Create transform={imageTransform}>
    <SimpleForm>
      <TextInput source="fileName" label="Имя файла" fullWidth />

      <ReferenceInput
        source="monumentId"
        reference="e24_Monument"
        label="Памятник"
      >
        <SelectInput optionText="id" label="Памятник" />
      </ReferenceInput>

      <FileInput
        source="image"
        label="Изображение"
        placeholder="Перетащите файл или кликните для выбора"
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);
