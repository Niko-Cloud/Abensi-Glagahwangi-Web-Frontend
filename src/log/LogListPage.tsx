import { useMediaQuery, Theme } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, DeleteButton, CreateButton, ReferenceField, FileField, ReferenceInput, AutocompleteInput, DateInput } from "react-admin";
import { exporter } from "./logExport";

const userFilters = [
    <DateInput source="date" label="Tanggal" alwaysOn />
];

export const LogListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={userFilters} exporter={exporter}>
            {isSmall ? (
                <div>
                    <CreateButton />
                    <SimpleList
                        primaryText={(record) => record.uid}
                        secondaryText={(record) => record.date}
                        tertiaryText={(record) => record.description}
                    />
                </div>

            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField source="date" label="Tanggal" />
                    <TextField source="time" label="Waktu" />
                    <TextField source="description" />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
