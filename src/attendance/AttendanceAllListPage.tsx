import { Button, Theme, useMediaQuery } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import {
    AutocompleteInput,
    CreateButton,
    Datagrid,
    DateField,
    ImageField,
    List,
    ReferenceField,
    ReferenceInput,
    SimpleList,
    TextField,
    useNotify,
    useRecordContext,
    useRefresh,
} from "react-admin";
import { updateAttendanceStatus } from "../dataProvider/attendanceCustomProvider";
import { exporterAll } from "./attendanceExport";

const userFilters = [
    <ReferenceInput source="uid" alwaysOn reference="users">
        <AutocompleteInput label="Cari Nama" />
    </ReferenceInput>,
];

export const StatusButton = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleChangeStatus = async (newStatus) => {
        try {
            await updateAttendanceStatus(record.id, newStatus);
            notify("Status updated successfully", { type: "info" });
            refresh();
        } catch (error) {
            notify(`Error: ${error.message}`, { type: "warning" });
        }
    };

    return (
        <div>
            <Button
                onClick={() => handleChangeStatus("diterima")}
                disabled={record.status === "diterima"}
            >
                Terima
            </Button>
            <Button
                onClick={() => handleChangeStatus("ditolak")}
                disabled={record.status === "ditolak"}
            >
                Tolak
            </Button>
        </div>
    );
};

export const AttendanceAllListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={userFilters} resource="attendance" exporter={exporterAll}>
            {isSmall ? (
                <div>
                    <CreateButton />
                    <SimpleList
                        primaryText={(record) => record.uid}
                        secondaryText={(record) => record.date}
                        tertiaryText={(record) => (
                            <>
                                <div>{record.description}</div>
                                <div>{`In Time: ${record.in.time}`}</div>
                                <div>{`In Location: ${record.in.location}`}</div>
                                <div>{`In Description: ${record.in.description}`}</div>
                                <div>{`Out Time: ${record.out.time}`}</div>
                                <div>{`Out Location: ${record.out.location}`}</div>
                                <div>{`Out Description: ${record.out.description}`}</div>
                            </>
                        )}
                    />
                </div>
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <ReferenceField source="uid" reference="users" label="Name" />
                    <DateField source="date" label="Tanggal" />
                    <TextField source="description" />
                    <TextField source="attendanceStatus" />
                    <TextField source="status" />
                    <TextField source="in.time" label="In Time" />
                    <TextField source="in.location" label="In Location" />
                    <TextField source="in.status" label="In Status" />
                    <ImageField source="in.image" label="In Image" />
                    <TextField source="out.time" label="Out Time" />
                    <TextField source="out.location" label="Out Location" />
                    <TextField source="out.status" label="Out Description" />
                    <ImageField source="out.image" label="Out Image" />
                    <StatusButton />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
