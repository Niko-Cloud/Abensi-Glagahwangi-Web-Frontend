import React, { useState } from 'react';
import { useMediaQuery, Theme, Button, Dialog, DialogContent } from "@mui/material";
import { ReactQueryDevtools } from 'react-query/devtools';
import { List, SimpleList, Datagrid, TextField, DeleteButton, SearchInput, CreateButton, ReferenceField, useNotify, useRefresh, useRecordContext, ImageField, ReferenceInput, AutocompleteInput, useListContext, FileField } from "react-admin";
import { updatePermissionStatus } from '../dataProvider/permissionCustomProvider';
import { exporter } from './permissionExport';

const userFilters = [
    <ReferenceInput source="uid" alwaysOn reference="users"  >
        <AutocompleteInput label="Cari Nama" />
    </ReferenceInput>,
];

const ImageModal = ({ imageUrl, open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogContent>
                <img src={imageUrl} alt="Full Size" style={{ width: '100%' }} />
            </DialogContent>
        </Dialog>
    );
};

export const StatusButton = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleChangeStatus = async (newStatus) => {
        try {
            await updatePermissionStatus(record.id, newStatus);
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

export const PermissionListPage = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };


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
                    <FileField source="file" title="File Bukti" />
                    <TextField source="type" label="Tipe" />
                    <TextField source="date" label="Tanggal" />
                    <TextField source="description" />
                    <TextField source="status" />
                    <StatusButton />
                </Datagrid>
            )}
            <ImageModal imageUrl={selectedImage} open={isImageModalOpen} handleClose={handleImageModalClose} />
            <ReactQueryDevtools initialIsOpen={true} />
        </List>
    );
};
