const API_BASE_URL = "http://localhost:8080/api";

function getAuthHeaders() {
    const token = localStorage.getItem("adminToken");

    if (!token) return {};

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function getServices() {
    const response = await fetch(`${API_BASE_URL}/services`);

    if (!response.ok) {
        let errorMessage = "No se pudieron obtener los servicios";

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // dejamos mensaje genérico
        }

        throw new Error(errorMessage);
    }

    return response.json();
}

export async function getTimeSlotsByDate(date) {
    const response = await fetch(`${API_BASE_URL}/time-slots?date=${date}`);

    if (!response.ok) {
        let errorMessage = "No se pudieron obtener los horarios";

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // dejamos mensaje genérico
        }

        throw new Error(errorMessage);
    }

    return response.json();
}

export async function createAppointmentRequest(payload) {
    const response = await fetch(`${API_BASE_URL}/appointment-requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let errorMessage = "No se pudo crear la solicitud";

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            // si no viene json, dejamos el mensaje genérico
        }

        throw new Error(errorMessage);
    }

    return response.json();
}

export async function getAdminAppointmentRequests() {
    const response = await fetch(`${API_BASE_URL}/admin/appointment-requests`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("No se pudieron obtener las solicitudes");
    }

    return response.json();
}

export async function getPendingAdminAppointmentRequests() {
    const response = await fetch(
        `${API_BASE_URL}/admin/appointment-requests/pending`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("No se pudieron obtener las solicitudes pendientes");
    }

    return response.json();
}

export async function acceptAppointmentRequest(id) {
    const response = await fetch(
        `${API_BASE_URL}/admin/appointment-requests/${id}/accept`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("No se pudo aceptar la solicitud");
    }

    return response.json();
}

export async function rejectAppointmentRequest(id) {
    const response = await fetch(
        `${API_BASE_URL}/admin/appointment-requests/${id}/reject`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("No se pudo rechazar la solicitud");
    }

    return response.json();
}

export async function getAdminTimeSlotsByDate(date) {
    const response = await fetch(`${API_BASE_URL}/admin/time-slots?date=${date}`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("No se pudieron obtener los horarios admin");
    }

    return response.json();
}

export async function blockTimeSlot(id) {
    const response = await fetch(`${API_BASE_URL}/admin/time-slots/${id}/block`, {
        method: "PUT",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("No se pudo bloquear el horario");
    }
}

export async function unblockTimeSlot(id) {
    const response = await fetch(`${API_BASE_URL}/admin/time-slots/${id}/unblock`, {
        method: "PUT",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("No se pudo desbloquear el horario");
    }
}