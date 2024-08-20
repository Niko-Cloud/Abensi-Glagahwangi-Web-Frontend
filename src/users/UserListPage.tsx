import { useMediaQuery, Theme } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, EmailField, EditButton, DeleteButton, SearchInput, CreateButton, DeleteWithConfirmButton } from "react-admin";
import { useRecordContext } from 'react-admin';
import { Avatar } from '@mui/material';
import { exporter } from './userExporter';

const userFilters = [
    <SearchInput source="q" alwaysOn placeholder="Search by name" />,
];

const AvatarField = ({ source }) => {
    const record = useRecordContext();
    return record ? (
        <Avatar
            src={record[source]}
            style={{
                width: 50,
                height: 50,
                objectFit: 'cover',
            }}
        />
    ) : null;
}

export const UserListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List filters={userFilters} exporter={exporter} >
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
                    <AvatarField source="photoURL" label="Foto" />
                    <TextField source="name" />
                    <TextField source="role" label="Posisi" />
                    <TextField source="alamat" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <EditButton />
                    <DeleteWithConfirmButton confirmTitle="Hapus Pengguna?" />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
