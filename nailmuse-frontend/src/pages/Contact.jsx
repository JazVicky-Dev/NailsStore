import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/contact.css"

function Contact() {
    return (
        <>
            <Navbar />

            <main className="contact-page">
                <section className="contact-section">
                    <div className="contact-header contact-fade-up delay-1">
                        <span className="section-badge">Contacto</span>
                        <h1>Encontranos y escribinos cuando quieras</h1>
                        <p>
                            Toda la info del estudio en un solo lugar para que puedas
                            comunicarte fácil, rápido y con una experiencia más visual.
                        </p>
                    </div>

                    <div className="contact-layout">
                        <div className="contact-info-block contact-fade-up delay-2">
                            <div className="contact-tech-line"></div>
                            <div className="contact-tech-glow"></div>

                            <div className="contact-item">
                                <span className="contact-label">WhatsApp</span>
                                <p>+54 9 351 000 0000</p>
                            </div>

                            <div className="contact-item">
                                <span className="contact-label">Instagram</span>
                                <p>@nailmuse.studio</p>
                            </div>

                            <div className="contact-item">
                                <span className="contact-label">Horarios</span>
                                <p>Lunes a viernes · 9:00 a 19:00</p>
                            </div>

                            <div className="contact-item">
                                <span className="contact-label">Zona</span>
                                <p>Córdoba, Argentina</p>
                            </div>
                        </div>

                        <div className="contact-map-block contact-fade-up delay-3">
                            <div className="map-card">
                                <div className="map-orbit map-orbit-one"></div>
                                <div className="map-orbit map-orbit-two"></div>

                                <div className="map-top">
                                    <span className="map-badge">Ubicación</span>
                                    <h2>Estamos en Córdoba</h2>
                                    <p>
                                        Podés encontrarnos en una zona céntrica, visualmente clara y
                                        de fácil acceso para tus turnos.
                                    </p>
                                </div>

                                <div className="map-visual">
                                    <div className="map-grid"></div>
                                    <div className="map-grid-glow"></div>

                                    <div className="map-route route-one"></div>
                                    <div className="map-route route-two"></div>

                                    <div className="map-pin">
                                        <span className="pin-dot"></span>
                                    </div>
                                </div>

                                <div className="map-footer">
                                    <span className="map-address">Córdoba, Argentina</span>
                                    <button className="map-button">Abrir ubicación</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Contact