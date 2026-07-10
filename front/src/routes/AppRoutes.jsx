import { Routes, Route, Navigate } from "react-router-dom";

import ItemList from "../pages/ItemList";
import Login from "../pages/Login";
import ItemEdit from "../pages/ItemEdit";
import ItemCreate from "../pages/ItemCreate";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <Routes>
            <Route path="/" element={isAuthenticated() ? <Navigate to="/items" replace /> : <Navigate to="/login" replace />} />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route path="/items" element={<ProtectedRoute element={<ItemList />} />} />
            <Route path="/items/:id_item" element={<ProtectedRoute element={<ItemEdit />} />} />
            <Route path="/items/create" element={<ProtectedRoute element={<ItemCreate />} />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;