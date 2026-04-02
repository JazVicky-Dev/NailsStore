import { Link } from "react-router-dom"
import "../styles/inspiration-section.css"

const inspirations = [
    { title: "Nude delicado", category: "Minimalista" },
    { title: "Brillo sutil", category: "Elegante" },
    { title: "Soft pink", category: "Romántico" },
    { title: "Glazed finish", category: "Tendencia" },
    { title: "Micro french", category: "Clásico" },
    { title: "Pearl details", category: "Evento" },
]

function InspirationSection() {
    return (
        <section className="inspiration-section">
            <div className="inspiration-header">
                <div className="inspiration-header-left">
                    <span className="section-badge">Inspiración</span>
                    <h2>Ideas para tu próximo turno</h2>
                    <p>
                        Explorá estilos, guardá referencias y encontrá el diseño perfecto
                        para compartir en tu reserva.
                    </p>
                </div>

                <div className="inspiration-header-right">
                    <Link to="/galeria" className="inspiration-button">
                        Ver galería completa
                    </Link>
                </div>
            </div>

            <div className="inspiration-carousel-wrapper">
                <div className="carousel-fade carousel-fade-left"></div>
                <div className="carousel-fade carousel-fade-right"></div>

                <div className="inspiration-carousel">
                    {inspirations.map((item) => (
                        <article className="inspiration-slide" key={item.title}>
                            <div className="slide-visual">
                                <div className="visual-shape visual-shape-one"></div>
                                <div className="visual-shape visual-shape-two"></div>
                                <div className="visual-shape visual-shape-three"></div>
                            </div>

                            <div className="inspiration-slide-overlay">
                                <span className="inspiration-category">{item.category}</span>
                                <h3>{item.title}</h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="carousel-hint">Deslizá para explorar más estilos</div>
        </section>
    )
}

export default InspirationSection