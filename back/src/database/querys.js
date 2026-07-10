export default {    
    //items
    getItems: "SELECT * FROM Items",

    getItemById: "SELECT * FROM Items WHERE id_item = @id_item",

    addItem: `INSERT INTO Items (nombre, descripcion, precio, categoria, url, fecha_creacion) 
        VALUES (@nombre, @descripcion, @precio, @categoria, @url, GETDATE())`,

    updateItem: `UPDATE Items SET nombre = @nombre, descripcion = @descripcion, precio = @precio, categoria = @categoria 
        WHERE id_item = @id_item`,

    deleteItem: `DELETE FROM Items WHERE id_item = @id_item`,

    //usuarios
    getUserByUsername: "SELECT * FROM Usuarios WHERE usuario = @usuario",

    createUser: "INSERT INTO Usuarios (usuario, contraseña, estado, fecha_creacion) VALUES (@usuario, @contraseña, @estado, GETDATE())",
    
    getAllUsers: "SELECT id_usuario, usuario, estado FROM Usuarios"
}