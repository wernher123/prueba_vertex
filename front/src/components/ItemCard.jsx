import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={item.url}
                alt={item.nombre}
                className="w-full h-48 object-cover"
            />

            <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                    {item.nombre}
                </h2>

                <p className="text-gray-600 mt-2 line-clamp-2">
                    {item.descripcion}
                </p>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                        S/. {parseFloat(item.precio).toFixed(2)}
                    </span>

                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.categoria}
                    </span>
                </div>

                <div className="mt-5 flex gap-2">

                    <button 
                        onClick={() => navigate(`/items/${item.id_item}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        Editar
                    </button>

                    <button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                    >
                        Eliminar
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ItemCard;