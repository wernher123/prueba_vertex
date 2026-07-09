import ItemForm from "../components/ItemForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ItemCreate = () => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        url: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (form) => {

        try {
            const response = await api.post("/addItem", form);
            alert(response.data.message);
            navigate("/items");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Error al conectar con el servidor.");
            }
            console.error(error);
        }

    };

    return <ItemForm 
        title="Nuevo Producto"
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit} 
    />;
};

export default ItemCreate;