export const validateForm = (
    values: Record<string, any>,
): Record<string, any> => {
    const errors = {} as any;

    if (!values.radius) {
        errors.radius = 'Radius tidak boleh kosong';
    } else if (isNaN(values.radius) || values.radius <= 1) {
        errors.radius = 'Radius harus berupa angka dan lebih dari 1';
    }

    if (!values.lat) {
        errors.lat = 'Latitude tidak boleh kosong';
    } else if (isNaN(values.lat)) {
        errors.lat = 'Latitude harus berupa angka';
    }

    if (!values.long) {
        errors.long = 'Longitude tidak boleh kosong';
    } else if (isNaN(values.long)) {
        errors.long = 'Longitude harus berupa angka';
    }

    return errors;
};
