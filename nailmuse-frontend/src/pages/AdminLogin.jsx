import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/admin-login.css"

function AdminLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("adminToken")

        if (token) {
            navigate("/admin")
        }
    }, [navigate])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setLoading(true)
            setError("")

            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "No se pudo iniciar sesión")
            }

            localStorage.setItem("adminToken", data.token)
            navigate("/admin")
        } catch (err) {
            setError(err.message || "No se pudo iniciar sesión")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <main className="admin-login-page">
                <section className="admin-login-card">
                    <span className="section-badge">Admin</span>
                    <h1>Iniciar sesión</h1>
                    <p>Ingresá con tus credenciales para acceder al panel.</p>

                    <form onSubmit={handleSubmit} className="admin-login-form">
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Tu usuario admin"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tu contraseña"
                            />
                        </div>

                        {error && <p className="submit-error">{error}</p>}

                        <button type="submit" className="primary-button" disabled={loading}>
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default AdminLogin