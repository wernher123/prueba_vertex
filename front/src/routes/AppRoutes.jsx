import { Routes, Route } from "react-router-dom";

import ItemList from "../pages/ItemList";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/items" element={<ItemList />} />
        </Routes>
    );
}

export default AppRoutes;