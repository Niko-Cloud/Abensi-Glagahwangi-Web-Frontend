import { Edit, SimpleForm, TextInput, Toolbar, SaveButton, DeleteButton, DateInput } from "react-admin";
import { Grid } from '@mui/material';
import { HolidayFormValidation } from "./HolidayFormValidation";


const CustomToolbar = () => (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SaveButton />
        <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
);

export const HolidayEditPage = () => (
    <Edit redirect="list">
        <SimpleForm validate={HolidayFormValidation} toolbar={<CustomToolbar />}>
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
    </Edit>
);