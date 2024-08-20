import { AuthProvider } from "react-admin";
import { signInWithEmailAndPassword, signOut, getIdToken } from "firebase/auth";
import { auth } from "../FirebaseService";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await getIdToken(user);

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Kredensial Salah');
            }

            const data = await response.json();
            if (data.role === 'admin') {
                localStorage.setItem("email", email);
                localStorage.setItem("uid", data.uid);
                return Promise.resolve();
            } else {
                return Promise.reject(new Error("Unauthorized"));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },

    logout: async () => {
        await signOut(auth);
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        return Promise.resolve();
    },

    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("email");
            localStorage.removeItem("uid");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem("email")
            ? Promise.resolve()
            : Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
};
