import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/reserve.css"
import {
    getServices,
    getTimeSlotsByDate,
    createAppointmentRequest,
} from "../services/api"

function Reserve() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [services, setServices] = useState([])
    const [servicesLoading, setServicesLoading] = useState(true)
    const [servicesError, setServicesError] = useState("")
    const location = useLocation()
    const selectedInspiration = location.state?.selectedInspiration || ""
    const [timeSlots, setTimeSlots] = useState([])
    const [timeSlotsLoading, setTimeSlotsLoading] = useState(false)
    const [timeSlotsError, setTimeSlotsError] = useState("")
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        serviceId: null,
        serviceName: "",
        previousWorkRemoval: "",
        nailRepair: "",
        referenceImage: null,
        referencePreview: "",
        notes: selectedInspiration
            ? `Inspiración elegida: ${selectedInspiration}`
            : "",
        appointmentDate: "",
        appointmentTime: "",
        timeSlotId: null,
        selectedInspiration: selectedInspiration,
    })
    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices()
                setServices(data)
            } catch (error) {
                setServicesError("No se pudieron cargar los servicios")
                console.error(error)
            } finally {
                setServicesLoading(false)
            }
        }

        loadServices()
    }, [])
    useEffect(() => {
        async function loadTimeSlots() {
            if (!formData.appointmentDate) {
                setTimeSlots([])
                return
            }

            try {
                setTimeSlotsLoading(true)
                setTimeSlotsError("")

                const data = await getTimeSlotsByDate(formData.appointmentDate)
                setTimeSlots(data)
            } catch (error) {
                setTimeSlotsError("No se pudieron cargar los horarios")
                console.error(error)
            } finally {
                setTimeSlotsLoading(false)
            }
        }

        loadTimeSlots()
    }, [formData.appointmentDate])


    function handleChange(event) {
        const { id, value } = event.target

        setFormData((prevData) => {
            if (id === "appointmentDate") {
                return {
                    ...prevData,
                    appointmentDate: value,
                    appointmentTime: "",
                    timeSlotId: null,
                }
            }

            return {
                ...prevData,
                [id]: value,
            }
        })
    }

    function handleServiceSelect(service) {
        setFormData((prevData) => ({
            ...prevData,
            serviceId: service.id,
            serviceName: service.name,
            nailRepair: service.allowsNailRepair ? prevData.nailRepair : "",
        }))
    }

    function handleOptionSelect(field, value) {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    function handleImageChange(event) {
        const file = event.target.files[0]
        if (!file) return

        const previewUrl = URL.createObjectURL(file)

        setFormData((prevData) => ({
            ...prevData,
            referenceImage: file,
            referencePreview: previewUrl,
        }))
    }

    function handleTimeSelect(slot) {
        setFormData((prevData) => ({
            ...prevData,
            appointmentTime: slot.time,
            timeSlotId: slot.id,
        }))
    }

    function nextStep() {
        if (currentStep < 5) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    function previousStep() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    async function handleSubmit() {
        try {
            setSubmitLoading(true)
            setSubmitError("")

            const payload = {
                fullName: formData.fullName,
                phone: formData.phone,
                serviceId: formData.serviceId,
                previousWorkRemoval: formData.previousWorkRemoval === "Sí",
                nailRepair: formData.nailRepair === "Sí",
                referenceImageUrl: formData.referencePreview || "",
                notes: formData.notes,
                timeSlotId: formData.timeSlotId,
            }
            console.log("PAYLOAD QUE SE ENVÍA:", payload)

            await createAppointmentRequest(payload)

            setIsSubmitted(true)
        } catch (error) {
            setSubmitError(error.message || "No se pudo enviar la solicitud.")
            console.error(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    function renderStepContent() {
        if (isSubmitted) {
            return (
                <div className="reserve-step-content submitted-content">
                    <div className="success-header">
                        <div className="success-icon">
                            <span>✓</span>
                        </div>

                        <div>
                            <span className="reserve-step-label">Solicitud enviada</span>
                            <h2>¡Tu turno fue solicitado con éxito!</h2>
                            <p>
                                Recibimos tu información correctamente. Pronto vas a poder
                                continuar con la confirmación desde el estudio.
                            </p>
                        </div>
                    </div>

                    <div className="success-box premium-success">
                        <span className="success-mini-label">Solicitud registrada</span>
                        <p>
                            Guardamos tus datos, tu referencia y el horario elegido para que
                            el estudio pueda revisar tu solicitud.
                        </p>
                    </div>

                    <div className="success-actions">
                        <Link to="/" className="back-home-button">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            )
        }

        if (currentStep === 1) {
            return (
                <div className="reserve-step-content">
                    <span className="reserve-step-label">Paso 1</span>
                    <h2>Datos personales</h2>
                    <p>
                        Empecemos con tus datos para poder registrar correctamente tu
                        solicitud.
                    </p>

                    <div className="form-group">
                        <label htmlFor="fullName">Nombre completo</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Tu nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Tu teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )
        }

        if (currentStep === 2) {
            return (
                <div className="reserve-step-content">
                    <span className="reserve-step-label">Paso 2</span>
                    <h2>Elegí tu servicio</h2>
                    <p>
                        Seleccioná el servicio que mejor se adapte a lo que querés hacerte.
                    </p>

                    {servicesLoading ? (
                        <p>Cargando servicios...</p>
                    ) : servicesError ? (
                        <p>{servicesError}</p>
                    ) : (
                        <div className="service-options">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    className={`service-option ${
                                        formData.serviceId === service.id ? "selected" : ""
                                    }`}
                                    onClick={() => handleServiceSelect(service)}
                                >
                                    {service.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )
        }

        if (currentStep === 3) {
            const selectedService = services.find(
                (service) => service.id === formData.serviceId
            )

            const showNailRepair = selectedService?.allowsNailRepair === true

            return (
                <div className="reserve-step-content">
                    <span className="reserve-step-label">Paso 3</span>
                    <h2>Extras de tu turno</h2>
                    <p>
                        Indicá si necesitás retiro de trabajo anterior o algún extra antes
                        del servicio.
                    </p>

                    <div className="option-block">
                        <h4>¿Tenés trabajo anterior para retirar?</h4>
                        <div className="binary-options">
                            <button
                                type="button"
                                className={`binary-option ${
                                    formData.previousWorkRemoval === "Sí" ? "selected" : ""
                                }`}
                                onClick={() => handleOptionSelect("previousWorkRemoval", "Sí")}
                            >
                                Sí
                            </button>

                            <button
                                type="button"
                                className={`binary-option ${
                                    formData.previousWorkRemoval === "No" ? "selected" : ""
                                }`}
                                onClick={() => handleOptionSelect("previousWorkRemoval", "No")}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {showNailRepair && (
                        <div className="option-block">
                            <h4>¿Necesitás arreglo de una uña?</h4>
                            <div className="binary-options">
                                <button
                                    type="button"
                                    className={`binary-option ${
                                        formData.nailRepair === "Sí" ? "selected" : ""
                                    }`}
                                    onClick={() => handleOptionSelect("nailRepair", "Sí")}
                                >
                                    Sí
                                </button>

                                <button
                                    type="button"
                                    className={`binary-option ${
                                        formData.nailRepair === "No" ? "selected" : ""
                                    }`}
                                    onClick={() => handleOptionSelect("nailRepair", "No")}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        if (currentStep === 4) {
            return (
                <div className="reserve-step-content">
                    <span className="reserve-step-label">Paso 4</span>
                    <h2>Subí tu referencia</h2>
                    <p>
                        Compartí una imagen de inspiración y, si querés, agregá detalles
                        sobre cómo te gustaría adaptarla.
                    </p>

                    <div className="upload-block">
                        <label htmlFor="referenceImage" className="upload-box">
                            <span className="upload-title">Cargar imagen de referencia</span>
                            <span className="upload-subtitle">
                JPG, PNG o WEBP · una imagen es suficiente por ahora
              </span>
                            <input
                                type="file"
                                id="referenceImage"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>

                        {formData.referencePreview && (
                            <div className="image-preview-card">
                                <img
                                    src={formData.referencePreview}
                                    alt="Vista previa de referencia"
                                    className="image-preview"
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Observaciones</label>
                        <textarea
                            id="notes"
                            rows="5"
                            placeholder="Ejemplo: lo quiero parecido, pero más simple y en tonos nude."
                            value={formData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            )
        }

        if (currentStep === 5) {
            return (
                <div className="reserve-step-content">
                    <span className="reserve-step-label">Paso 5</span>
                    <h2>Fecha y horario</h2>
                    <p>
                        Elegí el día y el horario disponible que mejor se adapte a vos.
                        Podés revisar toda tu información en el resumen de la derecha antes
                        de confirmar.
                    </p>

                    <div className="form-group">
                        <label htmlFor="appointmentDate">Fecha</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                        />
                    </div>

                    {timeSlotsLoading ? (
                        <p>Cargando horarios...</p>
                    ) : timeSlotsError ? (
                        <p>{timeSlotsError}</p>
                    ) : formData.appointmentDate ? (
                        <div className="time-options">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    type="button"
                                    className={`time-option ${
                                        formData.timeSlotId === slot.id ? "selected" : ""
                                    } ${slot.status !== "AVAILABLE" ? "disabled" : ""}`}
                                    onClick={() => slot.status === "AVAILABLE" && handleTimeSelect(slot)}
                                    disabled={slot.status !== "AVAILABLE"}
                                >
                                    {slot.time.slice(0, 5)}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>Elegí una fecha para ver los horarios disponibles.</p>
                    )}
                </div>
            )
        }

        return null
    }

    return (
        <>
            <Navbar />

            <main className="reserve-page">
                <section className="reserve-header">
                    <span className="section-badge">Reserva</span>
                    <h1>Reservá tu turno</h1>
                    <p>
                        Completá tu solicitud, compartí tu referencia y elegí el horario
                        que mejor te quede.
                    </p>
                </section>

                <section className={`reserve-layout ${isSubmitted ? "submitted-layout" : ""}`}>
                    <div className={`reserve-form-panel ${isSubmitted ? "submitted-panel" : ""}`}>
                        <div className="reserve-panel-tech-line"></div>
                        <div className="reserve-panel-tech-dot"></div>
                        <div className="reserve-panel-grid"></div>
                        <div className="step-indicator">
                            <div className={`step-item ${currentStep === 1 ? "active" : ""}`}>
                                1
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep === 2 ? "active" : ""}`}>
                                2
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep === 3 ? "active" : ""}`}>
                                3
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep === 4 ? "active" : ""}`}>
                                4
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${currentStep === 5 ? "active" : ""}`}>
                                5
                            </div>
                        </div>

                        <div className="step-content-shell" key={currentStep}>
                            {renderStepContent()}
                        </div>

                        {submitError && <p className="submit-error">{submitError}</p>}

                        {!isSubmitted && (
                            <div className="reserve-actions">
                                <button
                                    className="secondary-button"
                                    onClick={previousStep}
                                    disabled={currentStep === 1}
                                >
                                    Atrás
                                </button>

                                {currentStep < 5 ? (
                                    <button className="primary-button" onClick={nextStep}>
                                        Siguiente
                                    </button>
                                ) : (
                                    <button
                                        className="primary-button"
                                        onClick={handleSubmit}
                                        disabled={submitLoading}
                                    >
                                        {submitLoading ? "Enviando..." : "Confirmar solicitud"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <aside className="reserve-summary-panel">
                        <div className="summary-panel-glow"></div>
                        <span className="summary-badge">Resumen</span>
                        <h3>Tu solicitud</h3>

                        <div className="summary-scroll">
                            <div className="summary-item">
                                <span>Nombre</span>
                                <p>
                                    {formData.fullName.trim()
                                        ? formData.fullName
                                        : "Aún no completado"}
                                </p>
                            </div>

                            <div className="summary-item">
                                <span>Teléfono</span>
                                <p>
                                    {formData.phone.trim() ? formData.phone : "Aún no completado"}
                                </p>
                            </div>

                            <div className="summary-item">
                                <span>Servicio</span>
                                <p>{formData.serviceName ? formData.serviceName : "Sin seleccionar"}</p>
                            </div>

                            <div className="summary-item">
                                <span>Retiro previo</span>
                                <p>
                                    {formData.previousWorkRemoval
                                        ? formData.previousWorkRemoval
                                        : "Sin definir"}
                                </p>
                            </div>

                            <div className="summary-item">
                                <span>Arreglo de una uña</span>
                                <p>{formData.nailRepair ? formData.nailRepair : "No aplica"}</p>
                            </div>
                            <div className="summary-item">
                                <span>Inspiración elegida</span>
                                <p>
                                    {formData.selectedInspiration
                                        ? formData.selectedInspiration
                                        : "Sin seleccionar"}
                                </p>
                            </div>
                            <div className="summary-item">
                                <span>Referencia</span>
                                <p>{formData.referencePreview ? "Imagen cargada" : "No cargada"}</p>
                            </div>

                            <div className="summary-item">
                                <span>Observaciones</span>
                                <p>{formData.notes.trim() ? formData.notes : "Sin agregar"}</p>
                            </div>

                            <div className="summary-item">
                                <span>Fecha</span>
                                <p>{formData.appointmentDate || "Sin definir"}</p>
                            </div>

                            <div className="summary-item">
                                <span>Horario</span>
                                <p>{formData.appointmentTime || "Sin definir"}</p>
                            </div>
                        </div>
                    </aside>
                </section>
                <br/>
                <br/>
                <br/>
            </main>

            <Footer />
        </>
    )
}

export default Reserve