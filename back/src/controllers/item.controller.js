import {getConnection, sql} from '../database/connection.js'
import querys from '../database/querys.js'

export const getItems = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(querys.getItems)

        if (result.recordset[0] === undefined) {
            res.json({message:"no se encontró data"}) 
        } else {
            res.json(result.recordset);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los items",
            error: error.message
        })
    }
}

export const getItemById = async (req, res) => {
    try {
        const { id_item } = req.params

        const pool = await getConnection()
        const result = await pool
            .request()
            .input('id_item', id_item)
            .query(querys.getItemById)

        if (result.recordset[0] === undefined) {
            res.json({message:"no se encontró data"}) 
        } else {
            res.json(result.recordset[0])
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el item",
            error: error.message
        })
    }
}

export const addItem = async (req, res) => {
    try {
        const {nombre, descripcion, precio, categoria, url} = req.body
        const pool = await getConnection()
        await pool
            .request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('categoria', sql.VarChar, categoria)
            .input('url', sql.VarChar, url)
            .query(querys.addItem)

        res.json({message: "Item agregado correctamente"})
    } catch (error) {

        //error de duplicado
        if (error.number === 2627 || error.number === 2601) {
            return res.status(400).json({
                message: "El nombre del item ya existe. Por favor, usa un nombre diferente."
            });
        }
        
        //error de campos obligatorios
        if (error.number === 515) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios. Verifica los datos."
            });
        }

        //otros errores
        res.status(500).json({
            success: false,
            message: "Error al agregar el item",
            error: error.message
        });
    }
}

export const updateItem = async (req, res) => {
    try {
        const {nombre, descripcion, precio, categoria, id_item} = req.body

        const pool = await getConnection()
        await pool
            .request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('categoria', sql.VarChar, categoria)
            .input('id_item', sql.Int, id_item)
            .query(querys.updateItem)

        res.json({message: "Item Actualizado"})
    } catch (error) {

        //error de duplicado
        if (error.number === 2627 || error.number === 2601) {
            return res.status(400).json({
                message: "El nombre del item ya existe. Por favor, usa un nombre diferente."
            });
        }
        
        //error de campos obligatorios
        if (error.number === 515) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios. Verifica los datos."
            });
        }

        //otros errores
        res.status(500).json({
            success: false,
            message: "Error al actualizar el item",
            error: error.message
        })
    }
    
}

export const deleteItem = async (req, res) => {
    try {
        const { id_item } = req.params

        const pool = await getConnection()
        const result = await pool
            .request()
            .input('id_item', sql.Int, id_item)
            .query(querys.deleteItem)
            
        res.json({message: "Item eliminado"})

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el item",
            error: error.message
        })
    }
}