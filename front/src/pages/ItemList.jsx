import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

const ItemList = () => {
    const [items, setItems] = useState([]);

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

        <h1 className="text-3xl font-bold mb-8">
            Catálogo de Productos
        </h1>

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