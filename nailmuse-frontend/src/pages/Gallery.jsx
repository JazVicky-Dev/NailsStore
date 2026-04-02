import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/gallery.css"

const galleryItems = [
    { id: 1, title: "Nude delicado", category: "Minimalista", height: "sm" },
    { id: 2, title: "Brillo sutil", category: "Elegante", height: "md" },
    { id: 3, title: "Soft pink", category: "Romántico", height: "sm" },
    { id: 4, title: "Glazed finish", category: "Tendencia", height: "lg" },
    { id: 5, title: "Micro french", category: "Clásico", height: "sm" },
    { id: 6, title: "Pearl details", category: "Evento", height: "md" },
    { id: 7, title: "Clean girl nails", category: "Minimalista", height: "lg" },
    { id: 8, title: "Glossy nude", category: "Elegante", height: "sm" },
    { id: 9, title: "Baby boomer", category: "Romántico", height: "md" },
    { id: 10, title: "Milky white", category: "Clásico", height: "sm" },
    { id: 11, title: "Rose glow", category: "Elegante", height: "md" },
    { id: 12, title: "Soft pearl", category: "Evento", height: "sm" },
]

const categories = [
    "Todas",
    "Minimalista",
    "Elegante",
    "Romántico",
    "Tendencia",
    "Clásico",
    "Evento",
]

function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("Todas")

    const filteredItems =
        selectedCategory === "Todas"
            ? galleryItems
            : galleryItems.filter((item) => item.category === selectedCategory)

    return (
        <>
            <Navbar />

            <main className="gallery-page">
                <section className="gallery-header">
                    <div className="gallery-header-left gallery-fade-up delay-1">
                        <span className="section-badge">Galería</span>
                        <h1>Inspiración para tu próximo turno</h1>
                        <p>
                            Explorá estilos, descubrí acabados y encontrá referencias para
                            compartir al momento de reservar.
                        </p>
                    </div>

                    <div className="gallery-header-right gallery-fade-up delay-2">
                        <Link to="/reserva" className="gallery-cta-button">
                            Reservar turno
                        </Link>
                    </div>
                </section>

                <section className="gallery-filters gallery-fade-up delay-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`gallery-filter ${
                                selectedCategory === category ? "active" : ""
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </section>

                <section className="gallery-masonry">
                    {filteredItems.map((item, index) => (
                        <article
                            className="pin-card pin-fade-up"
                            style={{ animationDelay: `${0.08 + index * 0.05}s` }}
                            key={item.id}
                        >
                            <div className={`pin-visual pin-${item.height}`}>
                                <div className="pin-tech-line"></div>
                                <div className="pin-tech-dot"></div>
                                <div className="pin-grid-overlay"></div>

                                <div className="pin-shape pin-shape-one"></div>
                                <div className="pin-shape pin-shape-two"></div>
                                <div className="pin-shape pin-shape-three"></div>
                            </div>

                            <div className="pin-content">
                                <span className="pin-category">{item.category}</span>
                                <h3>{item.title}</h3>
                                <Link to="/reserva" className="pin-link">
                                    Usar inspiración
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="gallery-bottom-cta gallery-fade-up delay-4">
                    <div className="gallery-bottom-glow"></div>
                    <h2>¿Ya encontraste tu estilo?</h2>
                    <p>
                        Guardá tu inspiración favorita y avanzá con la solicitud de tu
                        turno.
                    </p>
                    <Link to="/reserva" className="gallery-cta-button secondary">
                        Ir a reserva
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Gallery