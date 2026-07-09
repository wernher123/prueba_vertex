import { useNavigate } from "react-router-dom";

const ItemForm = ({ title, form, setForm, onSubmit }) => {
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
        >

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <div>
                <label className="block mb-1 font-medium">
                    Nombre
                </label>

                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Descripción
                </label>

                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Precio
                </label>

                <input
                    type="number"
                    step="1"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Categoría
                </label>

                <input
                    type="text"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    URL Imagen
                </label>

                <input
                    type="text"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
            >
                Guardar
            </button>

            <button
                type="button"
                onClick={() => navigate("/items")}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
            >
                Cancelar
            </button>
        </form>
    );
};

export default ItemForm;