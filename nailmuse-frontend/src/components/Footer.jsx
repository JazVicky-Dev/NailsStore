import { Link } from "react-router-dom"
import "../styles/footer.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-glow footer-glow-one"></div>
            <div className="footer-glow footer-glow-two"></div>

            <div className="footer-container">
                <div className="footer-brand">
                    <div className="footer-tech-line"></div>
                    <h3>NailMuse</h3>
                    <p>
                        Inspiración, estilo y una experiencia de reserva más delicada,
                        visual y premium.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Navegación</h4>
                    <Link to="/">Inicio</Link>
                    <a href="/#services">Servicios</a>
                    <Link to="/galeria">Inspiración</Link>
                    <Link to="/contacto">Contacto</Link>
                </div>

                <div className="footer-contact">
                    <h4>Contacto</h4>
                    <p>+54 9 351 000 0000</p>
                    <p>@nailmuse.studio</p>
                    <p>Córdoba, Argentina</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 NailMuse. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer