
import { useMediaQuery, Theme, Button, Dialog, DialogContent } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, DeleteButton, CreateButton, ReferenceField, FileField, ReferenceInput, AutocompleteInput, useRecordContext, useNotify, useRefresh } from "react-admin";
import { updateForgotAttendanceStatus } from "../dataProvider/forgotAttendanceCustomProvider";
import { exporter } from "./forgotAttendanceExport";

const userFilters = [
    <ReferenceInput source="uid" alwaysOn reference="users"  >
        <AutocompleteInput label="Cari Nama" />
    </ReferenceInput>,
];

export const StatusButton = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleChangeStatus = async (newStatus) => {
        try {
            await updateForgotAttendanceStatus(record.id, newStatus);
            notify('Status updated successfully', { type: 'info' });
            refresh();
        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'warning' });
        }
    };

    return (
        <div>
            <Button
                onClick={() => handleChangeStatus('diterima')}
                disabled={record.status === 'diterima'}
            >
                Terima
            </Button>
            <Button
                onClick={() => handleChangeStatus('ditolak')}
                disabled={record.status === 'ditolak'}
            >
                Tolak
            </Button>
        </div>
    );
};

export const ForgotAttendanceListPage = () => {
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
                    <TextField source="description" />
                    <FileField source="file_url" title="File Pendukung" />
                    <TextField source="status" />
                    <StatusButton />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
