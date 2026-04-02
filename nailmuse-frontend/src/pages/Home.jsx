import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import ServicesSection from "../components/ServicesSection"
import InspirationSection from "../components/InspirationSection"
import Footer from "../components/Footer"
import "../styles/home.css"

function Home() {
    return (
        <>
            <Navbar />

            <main className="home">
                <section className="hero">
                    <div className="hero-left">
            <span className="hero-badge hero-fade-up delay-1">
              Nail Studio Experience
            </span>

                        <h1 className="hero-fade-up delay-2">
                            Reservá tu turno para uñas con una experiencia premium
                        </h1>

                        <p className="hero-fade-up delay-3">
                            Elegí tu servicio, compartí tu referencia y solicitá tu turno de
                            forma simple, visual y profesional.
                        </p>

                        <div className="hero-buttons hero-fade-up delay-4">
                            <Link to="/reserva" className="btn-primary">
                                Sacar turno
                            </Link>
                            <Link to="/galeria" className="btn-secondary">
                                Ver inspiración
                            </Link>
                        </div>
                    </div>

                    <div className="hero-right hero-fade-up delay-3">
                        <div className="hero-orbit hero-orbit-one"></div>
                        <div className="hero-orbit hero-orbit-two"></div>

                        <div className="hero-glow hero-glow-one"></div>
                        <div className="hero-glow hero-glow-two"></div>
                        <div className="hero-glow hero-glow-three"></div>

                        <div className="hero-phone">
                            <div className="phone-shine"></div>

                            <div className="phone-top">
                                <span className="phone-dot"></span>
                            </div>

                            <div className="phone-content">
                                <span className="mini-badge">Tu próximo turno</span>
                                <h3>Esmaltado semipermanente</h3>

                                <div className="phone-info">
                                    <p>Viernes 18</p>
                                    <p>16:30 hs</p>
                                </div>

                                <div className="phone-preview">
                                    <div className="phone-preview-nail nail-one"></div>
                                    <div className="phone-preview-nail nail-two"></div>
                                    <div className="phone-preview-nail nail-three"></div>
                                </div>

                                <div className="reference-box">
                                    <span>Referencia cargada</span>
                                    <p>Diseño nude con brillo sutil</p>
                                </div>

                                <Link to="/reserva" className="phone-button">
                                    Confirmar solicitud
                                </Link>
                            </div>
                        </div>

                        <div className="floating-card floating-top">
                            <span className="card-label">Retiro previo</span>
                            <p>La clienta indicó que necesita retiro de esmaltado anterior.</p>
                        </div>

                        <div className="floating-card floating-bottom">
                            <span className="card-label">Reserva visual</span>
                            <p>Pedí tu turno en pocos pasos y compartí tu idea.</p>
                        </div>
                    </div>
                </section>

                <ServicesSection />
                <InspirationSection />
            </main>

            <Footer />
        </>
    )
}

export default Home