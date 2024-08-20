const apiUrl = 'http://localhost:3000';

export const updatePermissionStatus = async (id, newStatus) => {
    const response = await fetch(`${apiUrl}/permissions/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
        throw new Error('Failed to update status');
    }

    return response.json();
};
