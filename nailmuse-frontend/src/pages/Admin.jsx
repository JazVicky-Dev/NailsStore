import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {
    getAdminAppointmentRequests,
    getPendingAdminAppointmentRequests,
    acceptAppointmentRequest,
    rejectAppointmentRequest,
    getAdminTimeSlotsByDate,
    blockTimeSlot,
    unblockTimeSlot,
} from "../services/api"
import "../styles/admin.css"

function Admin() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filter, setFilter] = useState("pending")
    const [actionLoadingId, setActionLoadingId] = useState(null)
    const [slotActionLoadingId, setSlotActionLoadingId] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [slots, setSlots] = useState([])
    const [slotsLoading, setSlotsLoading] = useState(false)
    const [slotsError, setSlotsError] = useState("")
    const navigate = useNavigate()

    async function loadRequests(currentFilter = filter) {
        try {
            setLoading(true)
            setError("")

            const data =
                currentFilter === "pending"
                    ? await getPendingAdminAppointmentRequests()
                    : await getAdminAppointmentRequests()

            setRequests(data)
        } catch (err) {
            setError("No se pudieron cargar las solicitudes")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    function handleLogout() {
        localStorage.removeItem("adminToken")
        navigate("/admin-login")
    }
    async function handleBlockSlot(id) {
        try {
            setSlotActionLoadingId(id)
            await blockTimeSlot(id)
            if (selectedDate) {
                await loadSlots(selectedDate)
            }
        } catch (err) {
            console.error(err)
            setSlotsError("No se pudo bloquear el horario")
        } finally {
            setSlotActionLoadingId(null)
        }
    }

    async function handleUnblockSlot(id) {
        try {
            setSlotActionLoadingId(id)
            await unblockTimeSlot(id)
            if (selectedDate) {
                await loadSlots(selectedDate)
            }
        } catch (err) {
            console.error(err)
            setSlotsError("No se pudo desbloquear el horario")
        } finally {
            setSlotActionLoadingId(null)
        }
    }

    async function loadSlots(date) {
        if (!date) {
            setSlots([])
            return
        }

        try {
            setSlotsLoading(true)
            setSlotsError("")

            const data = await getAdminTimeSlotsByDate(date)
            setSlots(data)
        } catch (err) {
            setSlotsError("No se pudieron cargar los horarios del día")
            console.error(err)
        } finally {
            setSlotsLoading(false)
        }
    }

    useEffect(() => {
        loadRequests(filter)
    }, [filter])

    useEffect(() => {
        if (selectedDate) {
            loadSlots(selectedDate)
        }
    }, [selectedDate])

    async function handleAccept(id) {
        try {
            setActionLoadingId(id)
            await acceptAppointmentRequest(id)
            await loadRequests(filter)
            if (selectedDate) {
                await loadSlots(selectedDate)
            }
        } catch (err) {
            console.error(err)
            setError("No se pudo aceptar la solicitud")
        } finally {
            setActionLoadingId(null)
        }
    }

    async function handleReject(id) {
        try {
            setActionLoadingId(id)
            await rejectAppointmentRequest(id)
            await loadRequests(filter)
            if (selectedDate) {
                await loadSlots(selectedDate)
            }
        } catch (err) {
            console.error(err)
            setError("No se pudo rechazar la solicitud")
        } finally {
            setActionLoadingId(null)
        }
    }

    function getSlotStatusLabel(status) {
        if (status === "AVAILABLE") return "Disponible"
        if (status === "RESERVED_PENDING") return "Pendiente"
        if (status === "OCCUPIED") return "Ocupado"
        if (status === "BLOCKED") return "Bloqueado"
        return status
    }

    return (
        <>
            <Navbar />

            <main className="admin-page">
                <section className="admin-header">
                    <div>
                        <span className="section-badge">Admin</span>
                        <h1>Panel de solicitudes</h1>
                        <p>
                            Revisá las solicitudes de turnos y administrá su estado desde un
                            solo lugar.
                        </p>
                    </div>

                    <div className="admin-header-actions">
                        <div className="admin-session-badge">Sesión admin activa</div>

                        <button
                            className={`admin-filter-button ${
                                filter === "pending" ? "active" : ""
                            }`}
                            onClick={() => setFilter("pending")}
                        >
                            Pendientes
                        </button>

                        <button
                            className={`admin-filter-button ${
                                filter === "all" ? "active" : ""
                            }`}
                            onClick={() => setFilter("all")}
                        >
                            Todas
                        </button>

                        <button className="admin-logout-button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </section>

                <section className="admin-content">
                    {loading ? (
                        <p className="admin-message">Cargando solicitudes...</p>
                    ) : error ? (
                        <p className="admin-message error">{error}</p>
                    ) : requests.length === 0 ? (
                        <p className="admin-message">
                            No hay solicitudes para mostrar en este momento.
                        </p>
                    ) : (
                        <div className="admin-grid">
                            {requests.map((request) => (
                                <article className="admin-card" key={request.id}>
                                    <div className="admin-card-top">
                    <span
                        className={`admin-status status-${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                                        <span className="admin-id">#{request.id}</span>
                                    </div>

                                    <h3>{request.clientName}</h3>

                                    <div className="admin-card-info">
                                        <div className="admin-info-item">
                                            <span>Teléfono</span>
                                            <p>{request.phone}</p>
                                        </div>

                                        <div className="admin-info-item">
                                            <span>Servicio</span>
                                            <p>{request.serviceName}</p>
                                        </div>

                                        <div className="admin-info-item">
                                            <span>Fecha</span>
                                            <p>{request.date}</p>
                                        </div>

                                        <div className="admin-info-item">
                                            <span>Horario</span>
                                            <p>{request.time.slice(0, 5)}</p>
                                        </div>

                                        <div className="admin-info-item">
                                            <span>Retiro previo</span>
                                            <p>{request.previousWorkRemoval ? "Sí" : "No"}</p>
                                        </div>

                                        <div className="admin-info-item">
                                            <span>Arreglo de uña</span>
                                            <p>{request.nailRepair ? "Sí" : "No"}</p>
                                        </div>

                                        <div className="admin-info-item full">
                                            <span>Observaciones</span>
                                            <p>{request.notes ? request.notes : "Sin observaciones"}</p>
                                        </div>
                                    </div>

                                    {request.status === "PENDING" && (
                                        <div className="admin-card-actions">
                                            <button
                                                className="accept-button"
                                                onClick={() => handleAccept(request.id)}
                                                disabled={actionLoadingId === request.id}
                                            >
                                                {actionLoadingId === request.id
                                                    ? "Procesando..."
                                                    : "Aceptar"}
                                            </button>

                                            <button
                                                className="reject-button"
                                                onClick={() => handleReject(request.id)}
                                                disabled={actionLoadingId === request.id}
                                            >
                                                {actionLoadingId === request.id
                                                    ? "Procesando..."
                                                    : "Rechazar"}
                                            </button>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="admin-agenda-section">
                    <div className="admin-agenda-header">
                        <div>
                            <span className="section-badge">Agenda</span>
                            <h2>Ocupación por día</h2>
                            <p>
                                Elegí una fecha para ver qué horarios están disponibles,
                                pendientes u ocupados.
                            </p>
                        </div>

                        <div className="admin-date-box">
                            <label htmlFor="agendaDate">Fecha</label>
                            <input
                                id="agendaDate"
                                type="date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                            />
                        </div>
                    </div>

                    {slotsLoading ? (
                        <p className="admin-message">Cargando agenda...</p>
                    ) : slotsError ? (
                        <p className="admin-message error">{slotsError}</p>
                    ) : !selectedDate ? (
                        <p className="admin-message">
                            Seleccioná una fecha para ver los horarios.
                        </p>
                    ) : (
                        <div className="admin-slots-grid">
                            {slots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className={`admin-slot slot-${slot.status.toLowerCase()}`}
                                >
                                    <span className="slot-time">{slot.time.slice(0, 5)}</span>
                                    <span className="slot-status">
    {getSlotStatusLabel(slot.status)}
  </span>

                                    {(slot.clientName || slot.serviceName) && (
                                        <div className="slot-meta">
                                            {slot.clientName && <p>{slot.clientName}</p>}
                                            {slot.serviceName && <p>{slot.serviceName}</p>}
                                        </div>
                                    )}

                                    {slot.status === "AVAILABLE" && (
                                        <button
                                            className="slot-action-button"
                                            onClick={() => handleBlockSlot(slot.id)}
                                            disabled={slotActionLoadingId === slot.id}
                                        >
                                            {slotActionLoadingId === slot.id ? "Procesando..." : "Bloquear"}
                                        </button>
                                    )}

                                    {slot.status === "BLOCKED" && (
                                        <button
                                            className="slot-action-button secondary"
                                            onClick={() => handleUnblockSlot(slot.id)}
                                            disabled={slotActionLoadingId === slot.id}
                                        >
                                            {slotActionLoadingId === slot.id ? "Procesando..." : "Desbloquear"}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Admin