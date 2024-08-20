import { useMediaQuery, Theme } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, EmailField, EditButton, DeleteButton, SearchInput } from "react-admin";

export const MapListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.radius}
                />
            ) : (
                <Datagrid rowClick="edit" bulkActionButtons={false}>
                    <TextField source="radius" />
                    <TextField source="lat" label="Latitude" />
                    <TextField source="long" label="Longitude" />
                    <EditButton />
                </Datagrid>
            )}
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
