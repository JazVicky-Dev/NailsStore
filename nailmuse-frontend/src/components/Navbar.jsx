import { Link } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-glow navbar-glow-left"></div>
                <div className="navbar-glow navbar-glow-right"></div>
                <div className="navbar-shine"></div>
                <div className="navbar-tech-line"></div>

                <div className="navbar-logo">
                    <Link to="/">NailMuse</Link>
                </div>

                <nav className="navbar-links">
                    <Link to="/">Inicio</Link>
                    <a href="/#services">Servicios</a>
                    <Link to="/galeria">Inspiración</Link>
                    <Link to="/contacto">Contacto</Link>
                </nav>

                <Link to="/reserva" className="navbar-button">
                    Sacar turno
                </Link>
            </div>
        </header>
    )
}

export default Navbar