import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await api.get("/getItems");
                setItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getItems();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold">
                Catálogo de Productos
            </h1>

            <div className="flex justify-between items-center mb-8 mt-5 ">
                <button
                    onClick={() => navigate("/items/create")}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Nuevo Producto
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {items.map(item => (
                    <ItemCard
                        key={item.id_item}
                        item={item}
                    />
                ))}

            </div>

        </div>
    );
}

export default ItemList;