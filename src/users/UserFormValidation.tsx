import { email } from "react-admin";

export const validateForm = (
    values: Record<string, any>,
    isCreateForm: boolean
): Record<string, any> => {
    const errors = {} as any;
    if (!values.name) {
        errors.name = 'Nama tidak boleh kosong';
    }
    if (!values.role) {
        errors.role = 'Role tidak boleh kosong';
    }

    if (!values.phone) {
        errors.phone = 'Nomor HP tidak boleh kosong';
    }

    if (!values.alamat) {
        errors.alamat = 'Alamat tidak boleh kosong';
    }

    if (values.phone && !values.phone.match(/^\+62[0-9]{9,}$/)) {
        errors.phone = 'Mulai Dari +62 dan minimal 9 digit angka';
    }

    if (!values.email) {
        errors.email = 'Email tidak boleh kosong';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    if (isCreateForm) {
        if (!values.password) {
            errors.password = 'Password tidak boleh kosong';
        } else if (values.password.length < 8) {
            errors.password = 'Password minimal 8 karakter';
        }
        if (values.password && values.password !== values.confirm_password) {
            errors.confirm_password = 'Password Tidak Sama';
        }
    }
    return errors;
};
