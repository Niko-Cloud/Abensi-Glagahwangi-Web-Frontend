export const HolidayFormValidation = (
    values: Record<string, any>,
): Record<string, any> => {
    const errors = {} as any;
    if (!values.name) {
        errors.name = 'Nama tidak boleh kosong';
    }
    if (values.name && values.name.length < 5 && values.name.length > 30) {
        errors.name = 'Nama harus diantara 5 dan 30 karakter';
    }
    if (!values.date) {
        errors.date = 'Tanggal tidak boleh kosong';
    }

    return errors;
};
