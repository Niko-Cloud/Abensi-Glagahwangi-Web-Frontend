import { useMediaQuery, Theme, Button } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, DeleteButton, CreateButton, ReferenceField, FileField, ReferenceInput, AutocompleteInput, useNotify, useRecordContext, useRefresh } from "react-admin";
import { updateDinasPermission } from "../dataProvider/dinasCustomProvider";
import { exporter } from "./dinasExport";

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
            await updateDinasPermission(record.id, newStatus);
            notify('Status updated successfully', { type: 'info' });
            refresh();
        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'warning' });
        }
    };

    return (
        <div>
            <Button
                onClick={() => handleChangeStatus('approved')}
                disabled={record.status === 'approved'}
            >
                Approve
            </Button>
            <Button
                onClick={() => handleChangeStatus('rejected')}
                disabled={record.status === 'rejected'}
            >
                Reject
            </Button>
        </div>
    );
};


export const DinasListPage = () => {
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
                    <FileField source="file" title="Surat Tugas" />
                    <TextField source="status" />
                    <StatusButton />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
