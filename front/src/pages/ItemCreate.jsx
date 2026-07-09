import ItemForm from "../components/ItemForm";
import { useEffect, useState } from "react";

const ItemCreate = () => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        url: ""
    });
    const handleSubmit = async (form) => {

        console.log(form);

        // POST /createItem

    };

    return <ItemForm 
        title="Nuevo Item"
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit} 
    />;
};

export default ItemCreate;