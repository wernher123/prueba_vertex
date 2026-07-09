import { Routes, Route } from "react-router-dom";

import ItemList from "../pages/ItemList";
import Login from "../pages/Login";
import ItemEdit from "../pages/ItemEdit";
import ItemCreate from "../pages/ItemCreate";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/items" element={<ItemList />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/items/:id_item" element={<ItemEdit />} />
            <Route path="/items/create" element={<ItemCreate />} />
        </Routes>
    );
}

export default AppRoutes;