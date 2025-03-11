import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirige a la página de inicio de sesión si no está autenticado
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirige a la página de inicio
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.name}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};