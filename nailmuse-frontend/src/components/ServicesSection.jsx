import { Link } from "react-router-dom"
import "../styles/services-section.css"

const services = [
    {
        title: "Manicura",
        description:
            "Preparación y cuidado de uñas naturales para un acabado prolijo y delicado.",
        price: "Desde $8.000",
    },
    {
        title: "Esmaltado semipermanente",
        description:
            "Color, brillo y duración para un look impecable con posibilidad de agregar nail art.",
        price: "Desde $12.000",
    },
    {
        title: "Capping",
        description:
            "Capa de refuerzo sobre la uña natural para aportar resistencia sin perder naturalidad.",
        price: "Desde $14.000",
    },
    {
        title: "Esculpidas",
        description:
            "Extensión y diseño completo en acrílico, gel, acrylgel o softgel según el estilo deseado.",
        price: "Desde $18.000",
    },
]

function ServicesSection() {
    return (
        <section className="services-section" id="services">
            <div className="services-header services-fade-up delay-1">
                <span className="section-badge">Servicios</span>
                <h2>Servicios pensados para cada estilo</h2>
                <p>
                    Elegí el servicio que mejor se adapte a vos. Los precios son
                    iniciales y pueden variar según el diseño, el retiro de trabajos
                    anteriores o detalles adicionales.
                </p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <article
                        className="service-card services-fade-up"
                        style={{ animationDelay: `${0.12 + index * 0.08}s` }}
                        key={service.title}
                    >
                        <div className="service-tech-line"></div>
                        <div className="service-tech-dot"></div>
                        <div className="service-grid-overlay"></div>

                        <div className="service-card-top">
                            <span className="service-price">{service.price}</span>
                        </div>

                        <div className="service-card-body">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>

                        <Link to="/reserva" className="service-link">
                            Solicitar este servicio
                        </Link>
                    </article>
                ))}
            </div>

            <div className="services-journey services-fade-up delay-5">
                <div className="journey-curve"></div>
                <div className="journey-glow"></div>

                <div className="journey-mini-step mini-step-left">
                    <div className="journey-mini-dot">01</div>
                    <div className="journey-mini-content">
                        <h4>Elegí</h4>
                        <p>Seleccioná tu servicio.</p>
                    </div>
                </div>

                <div className="journey-mini-step mini-step-center">
                    <div className="journey-mini-dot">02</div>
                    <div className="journey-mini-content">
                        <h4>Subí</h4>
                        <p>Compartí tu referencia.</p>
                    </div>
                </div>

                <div className="journey-mini-step mini-step-right">
                    <div className="journey-mini-dot">03</div>
                    <div className="journey-mini-content">
                        <h4>Confirmá</h4>
                        <p>Enviá tu solicitud.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection