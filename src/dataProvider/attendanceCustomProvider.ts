const apiUrl = 'http://localhost:3000';

export const updateAttendanceStatus = async (id, newStatus) => {
    const response = await fetch(`${apiUrl}/attendance/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to update status: ${errorResponse.error}`);
    }

    return response.json();
};
