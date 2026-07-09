import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ItemForm from "../components/ItemForm";

const ItemEdit = () => {
    const { id_item } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        url: ""
    });

    useEffect(() => {
        const getItem = async () => {
            try {
                const response = await api.get(`/getItemById/${id_item}`);
                setForm(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getItem();
    }, [id_item]);

    const handleSubmit = async (form) => {

        try {
            const body = {
                ...form,
                id_item: Number(id_item)
            };

            const response = await api.put("/updateItem", body);

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

    if (!form.nombre) {
        return <p>Cargando...</p>;
    }

    return (
        <ItemForm 
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit} 
            title="Editar Item"
        />
    );
};

export default ItemEdit;