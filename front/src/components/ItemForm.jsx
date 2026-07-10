import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const ItemForm = ({ title, form, setForm, onSubmit, isEditing = false }) => {
    const navigate = useNavigate();
    const [uploadingImage, setUploadingImage] = useState(false);
    const categories = ["hogar", "cocina", "jardineria", "medicina"];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.url) {
            alert('Por favor sube una imagen');
            return;
        }
        onSubmit(form);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo MIME
        const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validMimes.includes(file.type)) {
            alert('Solo se permiten imágenes (JPEG, PNG, WebP)');
            return;
        }

        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen no debe superar 5MB');
            return;
        }

        setUploadingImage(true);

        try {
            // Crear FormData para enviar al back
            const formData = new FormData();
            formData.append('file', file);

            // Enviar al back (que se encargará de subirlo a Cloudinary)
            const response = await api.post("/uploadImage", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Guardar la URL devuelta por Cloudinary
            setForm(prev => ({
                ...prev,
                url: response.data.url
            }));

            alert('Imagen subida correctamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploadingImage(false);
        }
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

                <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Imagen
                </label>

                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleFileChange}  
                    disabled={isEditing || uploadingImage}
                    className="w-full border rounded-lg px-3 py-2"
                />

                {uploadingImage && <p className="text-sm text-blue-600">Subiendo imagen...</p>}
                {form.url && <p className="text-sm text-green-600">✓ Imagen subida</p>}
                {form.url && <img src={form.url} alt="preview" className="w-32 h-32 object-cover rounded mt-2" />}

            </div>

            <button
                type="submit"
                disabled={uploadingImage}
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