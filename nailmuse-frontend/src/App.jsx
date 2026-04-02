import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Reserve from "./pages/Reserve"
import Gallery from "./pages/Gallery"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import AdminRoute from "./components/AdminRoute"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/reserva" element={<Reserve />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                }
            />
        </Routes>
    )
}

export default App