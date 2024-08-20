import React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, ReferenceField, SearchInput, ReferenceInput, AutocompleteInput } from 'react-admin';
import { exporterOut } from './attendanceExport';

const userFilters = [
  <ReferenceInput source="uid" alwaysOn reference="users" filter={{ status: 'out' }} >
    <AutocompleteInput label="Cari Nama" />
  </ReferenceInput>,
];

export const AttendanceOutListPage = props => (
  <List {...props} filters={userFilters} filter={{ status: 'out' }} exporter={exporterOut}>
    <Datagrid bulkActionButtons={false}>
      <ReferenceField source="uid" reference="users" label="Name" />
      <DateField source="date" label="Date" />
      <TextField source="out.time" label="Out Time" />
      <TextField source="out.location" label="Out Location" />
      <TextField source="out.status" label="Out Status" />
      <ImageField source="out.image" label="Out Image" />
    </Datagrid>
  </List>
);

export default AttendanceOutListPage;
