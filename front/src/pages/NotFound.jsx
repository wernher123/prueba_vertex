import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 min-h-[70vh] flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
                    404
                </h1>
                
                <div className="mt-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Lo sentimos, la página que buscas no existe.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/items")}
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
                >                
                    Volver al Catálogo
                </button>
            </div>
        </div>
    );
};

export default NotFound;
