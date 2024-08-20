import { Create, DateInput, PasswordInput, SimpleForm, TextInput, useNotify } from "react-admin"
import { Grid } from '@mui/material';
import { HolidayFormValidation } from "./HolidayFormValidation";

export const HolidayCreatePage = () => {
    const notify = useNotify();

    const onError = (error: { message: any; }) => {
        const errorMessage = error?.message;
        if (errorMessage.includes("The user with the provided phone number already exists.")) {
            notify(`User dengan nomor telepon tersebut sudah ada.`);
        } else if (errorMessage.includes("The email address is already in use by another account")) {
            notify(`User dengan email tersebut sudah ada.`);
        }
    };

    return (
        <Create redirect="list" title={"Buat Event"} mutationOptions={{ onError }}>
            <SimpleForm validate={HolidayFormValidation}>
                <div>
                    <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                        <Grid item xs={12} md={8}>
                            <TextInput
                                source="name"
                                isRequired
                                fullWidth
                            />
                            <DateInput
                                source="date"
                                isRequired
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </div>
            </SimpleForm>
        </Create>
    )
};