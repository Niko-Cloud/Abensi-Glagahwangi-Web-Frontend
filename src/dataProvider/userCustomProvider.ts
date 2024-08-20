import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:3000';

export const fetchUserData = async (userIds) => {
    const users = await Promise.all(userIds.map(async (id) => {
        const { json } = await fetchUtils.fetchJson(`${apiUrl}/users/${id}`);
        return json;
    }));
    return users;
};
