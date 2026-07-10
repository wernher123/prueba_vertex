import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";

const ItemList = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("todos");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const categories = ["todos", "hogar", "cocina", "jardineria", "medicina"];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await api.get("/getItems");
                setItems(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getItems();
    }, []);

    useEffect(() => {
        let filtered = items;

        if (selectedCategory !== "todos") {
            filtered = filtered.filter(
                item => item.categoria.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (searchText.trim()) {
            filtered = filtered.filter(item =>
                item.nombre.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredItems(filtered);
        setCurrentPage(1); 
    }, [searchText, selectedCategory, items]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

    const handleDelete = async (id_item) => {
        const confirmar = window.confirm("¿Eliminar este producto?");

        if (!confirmar) return;

        try {
            const response = await api.delete(`/deleteItem/${id_item}`);
            alert(response.data.message);
            setItems(prev =>
                prev.filter(item => item.id_item !== id_item)
            );
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Catálogo de Productos
                    </h1>

                    <button
                        onClick={() => navigate("/items/create")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Nuevo Producto
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    Cerrar Sesión
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buscar por nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe el nombre del producto..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrar por categoría
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        Mostrando <span className="font-semibold">{itemsToDisplay.length}</span> de <span className="font-semibold">{filteredItems.length}</span> productos
                    </p>
                </div>
            </div>

            {itemsToDisplay.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {itemsToDisplay.map(item => (
                            <ItemCard
                                key={item.id_item}
                                item={item}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No se encontraron productos que coincidan con tu búsqueda
                    </p>
                </div>
            )}
        </div>
    );
}

export default ItemList;