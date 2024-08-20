const apiUrl = 'http://localhost:3000';

export const updateForgotAttendanceStatus = async (id, newStatus) => {
    const response = await fetch(`${apiUrl}/forgot_attendance/${id}/status`, {
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