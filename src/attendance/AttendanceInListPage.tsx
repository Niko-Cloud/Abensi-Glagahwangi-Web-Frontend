import React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, ReferenceField, SearchInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import { exporterIn } from './attendanceExport';

const userFilters = [
  <ReferenceInput source="uid" alwaysOn reference="users" filter={{ status: 'in' }} >
    <AutocompleteInput label="Cari Nama" />
  </ReferenceInput>,
];


export const AttendanceInListPage = props => (
  <List {...props} filters={userFilters} filter={{ status: 'in' }} exporter={exporterIn}>
    <Datagrid bulkActionButtons={false}>
      <ReferenceField source="uid" reference="users" label="Name" />
      <DateField source="date" label="Date" />
      <TextField source="in.time" label="In Time" />
      <TextField source="in.location" label="In Location" />
      <TextField source="in.status" label="In Status" />
      <ImageField source="in.image" label="In Image" />
    </Datagrid>
  </List>
);