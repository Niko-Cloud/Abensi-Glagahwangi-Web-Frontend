import { useMediaQuery, Theme } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, EmailField, EditButton, DeleteButton, SearchInput, DeleteWithConfirmButton } from "react-admin";
import { exporter } from './holidayExport';

const eventFilters = [
    <SearchInput source="q" alwaysOn placeholder="Search by name" />,
];

export const HolidaysListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={eventFilters} exporter={exporter}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.date}
                />
            ) : (
                <Datagrid rowClick="edit" bulkActionButtons={false}>
                    <TextField source="name" />
                    <TextField source="date" />
                    <EditButton />
                    <DeleteWithConfirmButton confirmTitle="Hapus Hari Ini?" />
                </Datagrid>
            )}
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </List>
    );
};
