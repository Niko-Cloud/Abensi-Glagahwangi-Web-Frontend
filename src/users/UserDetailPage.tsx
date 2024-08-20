import { Show, SimpleShowLayout, TextField, EmailField, ImageField } from 'react-admin';
import { Box, Card } from '@mui/material';

export const UserDetailPage = () => (
    <Show>
        <SimpleShowLayout>
            <Box display="flex" mb={2}>
                <ImageField source="photoURL" label="Foto" />
            </Box>
            <TextField source="name" sx={{ fontSize: '1.2rem', mb: 2 }} />
            <TextField source="role" label="Posisi" sx={{ fontSize: '1.2rem', mb: 2 }} />
            <EmailField source="email" sx={{ fontSize: '1.2rem', mb: 2 }} />
            <TextField source="phone" label="Nomor HP" sx={{ fontSize: '1.2rem', mb: 2 }} />
            <TextField source="alamat" label="Alamat" sx={{ fontSize: '1.2rem', mb: 2 }} />
        </SimpleShowLayout>
    </Show>
);
