import { useMediaQuery, Theme } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, DeleteButton, CreateButton, ReferenceField, FileField, ReferenceInput, AutocompleteInput } from "react-admin";
import { exporter } from "./overtimeExport";

const userFilters = [
    <ReferenceInput source="uid" alwaysOn reference="users"  >
        <AutocompleteInput label="Cari Nama" />
    </ReferenceInput>,
];

export const OvertimeListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={userFilters} exporter={exporter}>
            {isSmall ? (
                <div>
                    <CreateButton />
                    <SimpleList
                        primaryText={(record) => record.name}
                        secondaryText={(record) => record.role}
                        tertiaryText={(record) => record.email}
                    />
                </div>

            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <ReferenceField source="uid" reference="users" label="Name" />
                    <TextField source="date" label="Tanggal" />
                    <TextField source="status" />
                    <TextField source="finish" />
                    <TextField source="duration" />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
