import { Routes, Route, Navigate } from "react-router-dom";

import ItemList from "../pages/ItemList";
import Login from "../pages/Login";
import ItemEdit from "../pages/ItemEdit";
import ItemCreate from "../pages/ItemCreate";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/items" replace />} />

            <Route path="/items" element={<ItemList />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/items/:id_item" element={<ItemEdit />} />
            <Route path="/items/create" element={<ItemCreate />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;