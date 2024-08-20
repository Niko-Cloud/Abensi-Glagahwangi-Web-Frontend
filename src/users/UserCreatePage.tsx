import { Create, ImageField, ImageInput, PasswordInput, SimpleForm, TextInput, useNotify } from "react-admin"
import { validateForm } from "./UserFormValidation";
import { Grid, Box } from '@mui/material';

export const userCreatePage = () => {
    const notify = useNotify();

    const displayError = (error: { message: any; }) => {
        const errorMessage = error?.message;
        if (errorMessage.includes("The user with the provided phone number already exists.")) {
            notify(`User dengan nomor telepon tersebut sudah ada.`);
        } else if (errorMessage.includes("The email address is already in use by another account")) {
            notify(`User dengan email tersebut sudah ada.`);
        }
    };

    return (
        <Create redirect="list" title={"Buat User"} mutationOptions={{ displayError }}>
            <SimpleForm validate={values => validateForm(values, true)}>
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
                                type="phone"
                                source="phone"
                                fullWidth
                            />
                            <TextInput
                                type="alamat"
                                source="alamat"
                                fullWidth
                            />
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput source="password" fullWidth isRequired />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput label="Confirm Password" fullWidth isRequired source="confirm_password" />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </SimpleForm>
        </Create>
    )
};