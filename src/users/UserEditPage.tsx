import { Edit, SimpleForm, ImageInput, TextInput, Toolbar, SaveButton, DeleteButton, ImageField, FormDataConsumer } from "react-admin";
import { Grid, Box } from '@mui/material';
import { validateForm } from "./UserFormValidation";


const CustomToolbar = () => (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SaveButton />
        <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
);

export const userEditPage = () => (
    <Edit redirect="show" mutationMode="pessimistic">
        <SimpleForm validate={values => validateForm(values, false)} toolbar={<CustomToolbar />}>
            <div>
                <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                    <Grid item xs={12} md={8}>
                        <ImageInput source="image" accept="image/*" maxSize={3000000}>
                            <ImageField source="src" title="title" />
                        </ImageInput>
                        <TextInput
                            source="name"
                            isRequired
                            fullWidth
                        />
                        <TextInput
                            type="email"
                            source="email"
                            isRequired
                            fullWidth
                        />
                        <TextInput
                            type="role"
                            source="role"
                            isRequired
                            fullWidth
                        />
                        <TextInput
                            type="alamat"
                            source="alamat"
                            isRequired
                            fullWidth
                        />
                        <TextInput
                            type="phone"
                            source="phone"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </div>
        </SimpleForm>
    </Edit>
);