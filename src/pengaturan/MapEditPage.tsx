import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  NumberInput,
  useRecordContext,
} from "react-admin";
import { Grid, Button } from "@mui/material";
import { validateForm } from "./MapFormValidation";

const openGoogleMaps = (lat, long) => {
  const url = `https://www.google.com/maps?q=${lat},${long}`;
  window.open(url, '_blank');
};

const CustomToolbar = () => {
  const record = useRecordContext();
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton />
      <Button
        variant="contained"
        color="primary"
        onClick={() => openGoogleMaps(record?.lat, record?.long)}
        sx={{ marginLeft: "auto" }}
      >
        Show on Google Maps
      </Button>
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  );
};

export const MapEditPage = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm validate={values => validateForm(values)} toolbar={<CustomToolbar />}>
      <div>
        <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
          <Grid item xs={12} md={8}>
            <NumberInput source="radius" isRequired fullWidth />
            <TextInput source="lat" label="Latitude" fullWidth />
            <TextInput source="long" label="Longitude" fullWidth />
          </Grid>
        </Grid>
      </div>
    </SimpleForm>
  </Edit>
);
